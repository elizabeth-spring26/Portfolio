# Elizabeth's Second Brain — Product Requirements Document

**Generated:** 2026-06-05
**Requirements source:** `c:\create-second-brain-prd\my-second-brain-requirements.md`

**Summary:** A personal AI operating system for Elizabeth Tran — Founder/Student in EST — that manages her daily routine and habits, intelligently filters and drafts replies to Gmail and LinkedIn messages, summarizes meetings, and tracks finances via Plaid. Runs locally on Windows with an **Assistant**-level proactivity posture: auto-organizes and logs, drafts everything for review, asks before anything irreversible.

---

## Phase 1: Foundation (Memory Layer)

**What to build:** A structured local folder of Markdown files that every Claude session loads automatically. Since Elizabeth uses Notion for active project work, this vault lives alongside Notion as the AI-readable source of truth — zero latency, no rate limits, no API auth required.

**Key files to create:**
```
Elizabeth-Brain/Memory/
├── SOUL.md                    # Agent personality, tone, Elizabeth's values and voice
├── USER.md                    # Profile, accounts, integration config, preferences, team info
├── MEMORY.md                  # Active projects, key facts, important people (≤100 lines — always loaded)
├── HABITS.md                  # Daily pillars: Fitness, Deep Work, Connections, Evening Ritual, Finances
├── HEARTBEAT.md               # What the heartbeat monitors each run
└── daily/
    └── YYYY-MM-DD.md          # Append-only timestamped log — everything lands here first
```

**Personalization for Elizabeth:**

*SOUL.md* — Elizabeth values professional growth, morning discipline (gym → focused work), and evening reflection (journaling, prayer). Agent tone: direct, encouraging, structured. Never preachy.

*USER.md* — Pre-populate with:
- Email: tranelizabeth0201@gmail.com (Gmail)
- Calendar: Google Calendar (primary)
- Messaging: Slack
- Notes: Notion
- Storage: Google Drive
- Code: GitHub
- Timezone: America/New_York (EST)
- Wake target: 8:00 AM | Work end target: 9:00–10:00 PM

*MEMORY.md* — Sections: Active Projects, Key Connections (follow-up pending), Current Goals, Personal Rules.

*HABITS.md* — Five pillars (Atomic Habits-inspired, one intentional improvement per day each):
1. **Fitness** — Gym / workout completed
2. **Deep Work** — Professional growth tasks / meaningful output
3. **Connections** — Follow-up or outreach to a connection
4. **Evening Ritual** — Journaling + reflection (self-report)
5. **Finances** — Plaid review or one financial task

**Dependencies:** None
**Estimated complexity:** Low (1–2 hours)

---

## Phase 2: Hooks (Context Persistence)

**What to build:** Three Python lifecycle hooks that automatically inject Elizabeth's memory into every Claude Code session and save context on close — so the agent always knows who she is, what she's working on, and what happened recently.

**Key files to create:**
```
.claude/hooks/
├── session-start-context.py    # Reads SOUL + USER + MEMORY + last 3 daily logs → stdout → Claude context
├── pre-compact-flush.py        # Before auto-compaction: extracts decisions/facts from transcript → daily log
└── session-end-flush.py        # On session end: saves summary to daily/YYYY-MM-DD.md

.claude/settings.json           # Hook registrations (see below)
```

**Hook registration in `.claude/settings.json`:**
```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{ "type": "command", "command": "python .claude/hooks/session-start-context.py" }]
    }],
    "PreCompact": [{
      "hooks": [{ "type": "command", "command": "python .claude/hooks/pre-compact-flush.py" }]
    }],
    "SessionEnd": [{
      "hooks": [{ "type": "command", "command": "python .claude/hooks/session-end-flush.py" }]
    }]
  }
}
```

**Technical notes:**
- `session-start-context.py` prints to stdout — Claude Code injects that text into the session as context
- Exit code 2 = blocking error (Claude sees stderr as an error message — use for malformed vault state)
- SessionStart fires on `startup` and `resume` matchers — covers both new and restored sessions
- `session-start-context.py` also loads today's HABITS.md status so the agent always knows what's been done

**Dependencies:** Phase 1
**Estimated complexity:** Medium (2–3 hours)

---

## Phase 3: Memory Search (Hybrid RAG)

**What to build:** A local search index over the memory vault enabling the agent to retrieve relevant notes, past decisions, meeting summaries, and sent drafts by semantic meaning + keyword.

**Key files to create:**
```
.claude/scripts/
├── db.py              # SQLite connection + schema (sqlite-vec for vectors, FTS5 for keywords)
├── embeddings.py      # FastEmbed wrapper: TextEmbedding("sentence-transformers/all-MiniLM-L6-v2")
├── memory_index.py    # Chunker (400 tokens, 50-token overlap) → embed → upsert; incremental by mtime
└── memory_search.py   # hybrid_search(query, k=5): 0.7 * vector_score + 0.3 * fts_score
                       # --path-prefix flag for scoped search (e.g., drafts/sent/ for voice-matching)
```

**Technical specifics:**
```bash
pip install fastembed sqlite-vec
```
- Model: `sentence-transformers/all-MiniLM-L6-v2` — 384-dim, ~80MB ONNX cache, no GPU required
- `embeddings.py`: `TextEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")` → `list(model.embed(texts))`
- `sqlite-vec`: load via `conn.enable_load_extension(True)` + `sqlite_vec.load(conn)` before queries
- Incremental: store `(filepath, mtime, chunk_id)` in SQLite — only re-embed files that changed
- Run `python memory_index.py` from session-end hook to keep index current automatically

**Dependencies:** Phase 1
**Estimated complexity:** Medium (3–4 hours)

---

## Phase 4: Integrations

**Elizabeth's integration priority:**
1. Google Calendar + Notion (Daily Planner backbone)
2. Gmail + LinkedIn inbox (Drafts and filtering)
3. Plaid (Finance tracking)

---

### 4a. Google Calendar

**Auth:** OAuth2 via `google-auth-oauthlib`. One `credentials.json` (from Google Cloud Console) shared across Calendar, Gmail, and Drive → saves to `token.json` on first run.

```bash
pip install google-api-python-client google-auth-oauthlib google-auth-httplib2
```

**Scopes:** `https://www.googleapis.com/auth/calendar.readonly`

```python
# .claude/scripts/integrations/google_calendar.py
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def get_todays_events() -> list[CalendarEvent]: ...
    # service.events().list(calendarId='primary', timeMin=today_iso,
    #   timeMax=tomorrow_iso, singleEvents=True, orderBy='startTime')

def get_upcoming_week() -> list[CalendarEvent]: ...
def get_next_event() -> CalendarEvent | None: ...
```

**Key fields from response:** `summary`, `start.dateTime`, `end.dateTime`, `attendees`, `description`, `hangoutLink`

**Rate limits:** 1M queries/day — no practical limit for personal use.

**Habit auto-detection hook:** If a Calendar event with "gym", "workout", or "training" in the title is marked complete (past end time), heartbeat auto-checks the Fitness habit pillar.

---

### 4b. Gmail

**Auth:** Same OAuth2 token as Calendar. Add scope: `https://www.googleapis.com/auth/gmail.modify` (read + create drafts; intentionally NOT `gmail.send` per Elizabeth's security boundaries).

```python
# .claude/scripts/integrations/gmail.py
def list_important_threads(max_results=20) -> list[EmailThread]:
    # q='is:unread -category:promotions -category:social -category:updates'
    # service.users().messages().list(userId='me', q=q, maxResults=max_results)

def get_thread_summary(thread_id: str) -> EmailThread: ...

def create_draft(to: str, subject: str, body: str) -> str:
    # MIMEText → base64url encode → service.users().drafts().create(userId='me', body={...})
    # Returns draft_id

def mark_read(message_id: str): ...
```

**Setup note:** For a personal `@gmail.com` account (not Google Workspace), keep the OAuth consent screen in **Testing** mode and add `tranelizabeth0201@gmail.com` as a test user. Publishing to Production triggers a Google review — unnecessary for personal use.

**Rate limits:** 250 quota units/second — well within personal use patterns.

---

### 4c. Notion

**Auth:** Bearer token from the Notion Integration page (Settings → Connections → Develop integrations). No OAuth flow needed for personal use.

```bash
pip install notion-database  # or requests directly
```

**Headers:** `Authorization: Bearer {NOTION_TOKEN}`, `Notion-Version: 2022-06-28`

```python
# .claude/scripts/integrations/notion.py
BASE = "https://api.notion.com/v1"

def query_tasks_database(database_id: str, filter_today=True) -> list[NotionPage]: ...
    # POST /databases/{id}/query with filter: { "property": "Due", "date": { "equals": today } }

def create_task(database_id: str, title: str, due: str, notes: str) -> str: ...
    # POST /pages

def append_meeting_notes(page_id: str, content: str): ...
    # PATCH /blocks/{id}/children
```

**Setup note:** Every Notion database must be explicitly **shared** with the integration in the Notion UI (three-dot menu → Add connections). The token alone is insufficient.

**Use for Elizabeth:** Query her task database for today's priorities; create follow-up tasks after connections; append meeting summaries to existing Notion pages.

---

### 4d. LinkedIn Inbox — Limitation & Workaround

**Important:** LinkedIn's official API does not expose personal messaging/inbox to most developers (requires partner-level API approval — gated, highly restricted in 2026).

**Two options:**

**Option A — Unipile API (upgrade path):** Third-party service with full LinkedIn messaging read/draft access. Install: `pip install unipile-python-sdk`. Cost: ~$29/mo. Recommended once the system is stable and the inbox filtering workflow is validated.

**Option B — Manual workflow (start here):** The heartbeat notifies Elizabeth to check LinkedIn. She pastes key messages into Claude, which drafts replies using her voice (RAG on `drafts/sent/`). Zero friction, zero cost, zero API approval.

```python
# .claude/scripts/integrations/linkedin_manual.py
DRAFT_PROMPT_TEMPLATE = """
Here is a LinkedIn message I received. Draft a reply in my voice.

Message context:
{message_content}

My recent sent messages for tone reference:
{rag_examples}

Draft a reply that is warm, direct, and professional. No more than 3 sentences.
"""
```

**Phase 4d implementation:** Build Option B first. Document Option A upgrade path in USER.md.

---

### 4e. Plaid (Finance Tracking)

**Auth:** Requires a one-time browser-based Link flow to connect bank accounts. Subsequent calls use a saved `access_token` — no browser needed.

```bash
pip install plaid-python flask python-dotenv
```

**One-time setup flow:**
```
1. python .claude/scripts/integrations/plaid_setup.py
   → Starts Flask on localhost:5000
2. Open browser → http://localhost:5000 → complete Plaid Link UI
3. Flask captures public_token → exchanges for access_token
4. access_token saved to .env as PLAID_ACCESS_TOKEN
5. Flask server shuts down — never needed again
```

```python
# .claude/scripts/integrations/plaid_integration.py
from plaid.api import plaid_api
from plaid.model.transactions_get_request import TransactionsGetRequest

def get_recent_transactions(days=7) -> list[Transaction]: ...
    # TransactionsGetRequest(access_token, start_date, end_date)
    # client.transactions_get(request).transactions

def get_account_balances() -> list[AccountBalance]: ...
    # AccountsGetRequest(access_token)
```

**Security (per Elizabeth's boundaries):** READ-ONLY. No write calls, no payment APIs. `PLAID_ACCESS_TOKEN` stored in `.env`, loaded via `python-dotenv`, never passed to Claude — Python fetches data, Claude only sees formatted summaries.

**Plaid sandbox:** Use `sandbox` environment during development; switch to `production` when ready to connect real accounts. Free tier covers personal use (up to 5 accounts, 500 API calls/month).

**Habit auto-detection:** If `get_account_balances()` ran successfully today, heartbeat auto-checks the Finances habit pillar.

---

**Shared integration files:**
```
.claude/scripts/integrations/
├── google_calendar.py
├── gmail.py
├── notion.py
├── linkedin_manual.py
├── plaid_integration.py
├── plaid_setup.py          # One-time Flask setup server
└── registry.py             # { "gmail": True, "calendar": True, "notion": True, ... }

.claude/scripts/
└── query.py                # Unified CLI: query.py gmail list | query.py calendar today | query.py plaid balances

.env                        # NOTION_TOKEN, PLAID_ACCESS_TOKEN, SLACK_BOT_TOKEN, etc. (never commit)
```

**Dependencies:** Phases 1, 2
**Estimated complexity:** Medium per integration

---

## Phase 5: Skills (Starter Pack)

**What to build:** Two custom skills tailored to Elizabeth's highest-value workflows.

### Skill 1: Vault Structure
Teaches the agent Elizabeth's file organization, naming conventions, and daily log format so it always writes to the right place.

```
.claude/skills/vault-structure/
├── SKILL.md                # Layout rules, naming conventions, log entry format
└── references/
    └── vault-map.md        # Full tree of Elizabeth-Brain/Memory/
```

### Skill 2: Morning Briefing
Triggered at 8:00 AM by heartbeat or on-demand ("What's my day look like?") — generates a structured digest of Elizabeth's day.

```
.claude/skills/morning-briefing/
├── SKILL.md                         # Trigger phrases, output format
└── scripts/
    └── build_briefing.py            # Calls: query.py calendar today + query.py gmail list
                                     #        + query.py notion tasks + HABITS.md status
```

**Output format:**
```markdown
## Good morning, Elizabeth 👋

**Today's Schedule** (from Google Calendar)
- 9:00 AM — ...

**Priority Inbox** (Gmail — unread, not promotions)
- From: ... | Subject: ... | Needs reply: Yes/No

**Top 3 Tasks** (Notion)
1. ...

**Habits Today**
- [ ] Fitness   [ ] Deep Work   [ ] Connections   [ ] Evening Ritual   [ ] Finances
```

**Dependencies:** Phase 4
**Estimated complexity:** Low–Medium (2–3 hours)

---

## Phase 6: Proactive Systems (Heartbeat + Reflection)

**Proactivity: Assistant** — Auto-organize and log; draft everything for review; auto-detect objective habit completions; ask before anything irreversible. Never send, post, delete, or access finances for purchases.

### Heartbeat (`heartbeat.py`)

**Schedule aligned to Elizabeth's 8am–10pm window:**

| Time | Run | What it does |
|------|-----|--------------|
| 7:45 AM | Wake nudge | Windows Toast: "Good morning Elizabeth! Time to start your day." |
| 8:00 AM | Morning run | Full briefing + HABITS.md daily reset + draft scan + Plaid balance summary |
| 12:00 PM | Midday check | New Gmail threads needing reply, Slack mentions, overdue Notion tasks |
| 6:00 PM | Evening nudge | Habit pillar status + "What's unchecked?" + reflection prompt |
| 9:00 PM | Wrap-up nudge | "Wrap-up time. What did you accomplish today?" |
| 10:00 PM | Late nudge | If evening reflection not done: "Don't forget to reflect before you wind down." |

```python
# .claude/scripts/heartbeat.py
import argparse

def morning_run():
    """8am: reset habits, build briefing, scan for drafts, Plaid balance."""
    reset_habits_checklist()
    briefing = build_morning_briefing()
    drafts = scan_for_draft_opportunities()   # Gmail threads with no reply in 24h
    balances = get_account_balances()
    notify_windows("Morning Briefing", briefing_summary)
    save_to_daily_log(briefing + drafts + balances)

def midday_check():
    """12pm: new messages, follow-ups."""
    ...

def evening_nudge():
    """6pm: habit status check."""
    ...

def notify_windows(title: str, body: str):
    # pip install windows-toasts
    from windows_toasts import Toast, WindowsToaster
    toaster = WindowsToaster("Elizabeth's Second Brain")
    toaster.show_toast(Toast(f"{title}\n\n{body}"))
```

### Draft Management

Per Elizabeth's security boundaries: **drafts only, never send**.

- Heartbeat scans Gmail for threads with no reply in >24h that are marked important
- Generates draft in Elizabeth's voice via RAG on `Elizabeth-Brain/Memory/drafts/sent/`
- Saves to `Elizabeth-Brain/Memory/drafts/active/YYYY-MM-DD_email_<slug>.md`
- Frontmatter: `type, source_id, recipient, subject, context, created, status`
- Expires after 24h → moved to `drafts/expired/`
- LinkedIn: manual workflow — heartbeat notifies Elizabeth to check LinkedIn, offers to draft on paste

### Habit Auto-Detection Rules

| Pillar | Auto-detectable | Detection method |
|--------|----------------|-----------------|
| Fitness | Yes | Google Calendar event with "gym/workout/training" past end time |
| Deep Work | Yes | GitHub commit today OR Notion task marked complete |
| Connections | No | Self-report ("I connected with [name] today") |
| Evening Ritual | No | Self-report ("Done journaling") |
| Finances | Yes | `plaid_integration.get_account_balances()` ran successfully today |

### Daily Reflection (`memory_reflect.py`)

**Schedule:** 9:00 PM (aligns with Elizabeth's work-end target)

- Reads today's `daily/YYYY-MM-DD.md`
- Promotes key decisions, lessons, new important connections → `MEMORY.md`
- Archives today's HABITS.md checklist to HABITS.md History section
- Trims MEMORY.md to ≤100 lines if needed
- Sends Windows Toast: "Today's reflection is ready. Sleep well, Elizabeth."

**Key files:**
```
.claude/scripts/
├── heartbeat.py
├── memory_reflect.py
└── state/
    └── heartbeat-state.json    # Snapshot diffing — only notify on new/changed items
```

**Dependencies:** Phases 3, 4, 5
**Estimated complexity:** High (4–6 hours)

---

## Phase 7: Chat Interface (Slack)

**What to build:** Slack DM bot so Elizabeth can query her second brain from Slack — ask for briefings, request draft help, search memory — without opening a terminal.

**Tech:**
```bash
pip install slack-sdk
```

**Two tokens required (both in `.env`):**
- `SLACK_APP_TOKEN` (`xapp-...`) — App-Level Token with `connections:write` scope → Socket Mode
- `SLACK_BOT_TOKEN` (`xoxb-...`) — Bot Token for Web API calls (sending messages)

**Setup in Slack App dashboard:**
1. Settings → Socket Mode → Enable
2. Settings → Basic Information → App-Level Tokens → Create with `connections:write`
3. Features → Event Subscriptions → Enable → Subscribe to bot event: `message.im`
4. OAuth & Permissions → Bot Token Scopes: `chat:write`, `im:history`, `im:read`

```python
# .claude/chat/slack_bot.py
from slack_sdk.socket_mode import SocketModeClient
from slack_sdk import WebClient
from claude_agent_sdk import ClaudeAgentOptions, ClaudeSDKClient

# Each DM thread = separate persistent conversation (stored in chat.db)
def handle_message(client, req):
    thread_id = req.payload["event"]["ts"]
    conversation = get_or_create_conversation(thread_id)
    response = conversation.send(req.payload["event"]["text"])
    client.web_client.chat_postMessage(channel=channel, text=response)
```

**Conversation persistence:** SQLite at `.claude/data/chat.db`. Thread ID → conversation history. Survives restarts.

**Dependencies:** Phases 2, 3, 5
**Estimated complexity:** High (3–4 hours)

---

## Phase 8: Security Hardening

**What to build:** Three-layer security system enforcing Elizabeth's stated boundaries on every action.

**Elizabeth's guardrail rules (directly from her security boundaries):**

| Boundary | Enforcement |
|----------|-------------|
| Never send emails/messages | Gmail scope = `gmail.modify` only (no `gmail.send`). Slack bot read-only from external sources. |
| Never post to social media | No write calls to any social platform API. LinkedIn = manual only. |
| Never modify files outside vault | All `open(..., 'w')` calls validated against `ALLOWED_WRITE_PATHS = [VAULT_PATH, DRAFTS_PATH]` |
| Never access financial data for purchases | Plaid = read-only endpoints only. No payment/transfer APIs. |
| Never delete anything | No `DELETE` API calls, no `os.remove()`, no `shutil.rmtree()` except temp dirs |

**Key files:**
```
.claude/scripts/
├── sanitize.py     # Strip prompt injections from email/Slack/Notion content before Claude sees it
├── guardrails.py   # Pre-check: deterministic pattern block + LLM intent evaluation
└── shared.py       # VAULT_PATH, ALLOWED_WRITE_PATHS, BLOCKED_ACTIONS, BLOCKED_PATTERNS
```

**Sanitize flow:** All external text (email bodies, Slack messages, Notion page content) passes through `sanitize(text)` before embedding in prompts:
1. Detect injection patterns (`ignore previous instructions`, XML-like tags)
2. Escape markdown special characters
3. Wrap in XML trust boundary: `<external-content source="gmail">...</external-content>`

**Dependencies:** Phase 4
**Estimated complexity:** Medium (2–3 hours)

---

## Phase 9: Deployment (Windows Local)

**What to build:** Windows Task Scheduler jobs for the heartbeat and reflection scripts.

**Task Scheduler setup (run once in PowerShell as Administrator):**
```powershell
$py = (Get-Command python).Source
$root = "C:\Portfolio"

# Heartbeat runs
schtasks /create /tn "SecondBrain-WakeNudge"  /tr "$py $root\.claude\scripts\heartbeat.py --wake-nudge"  /sc daily /st 07:45
schtasks /create /tn "SecondBrain-Morning"    /tr "$py $root\.claude\scripts\heartbeat.py --morning"     /sc daily /st 08:00
schtasks /create /tn "SecondBrain-Midday"     /tr "$py $root\.claude\scripts\heartbeat.py --midday"      /sc daily /st 12:00
schtasks /create /tn "SecondBrain-Evening"    /tr "$py $root\.claude\scripts\heartbeat.py --evening"     /sc daily /st 18:00
schtasks /create /tn "SecondBrain-WrapUp"     /tr "$py $root\.claude\scripts\heartbeat.py --wrapup"      /sc daily /st 21:00
schtasks /create /tn "SecondBrain-LateNudge"  /tr "$py $root\.claude\scripts\heartbeat.py --late-nudge"  /sc daily /st 22:00

# Daily reflection
schtasks /create /tn "SecondBrain-Reflect"    /tr "$py $root\.claude\scripts\memory_reflect.py"          /sc daily /st 21:00
```

**Environment:**
- Python 3.11+ must be in PATH (or use full path in schtasks)
- `.env` at `C:\Portfolio\.env` — all API keys, never committed to git
- Add `.env` to `.gitignore` immediately
- `pip install python-dotenv` — load with `load_dotenv()` at top of every script

**Cost estimate:**
| Service | Cost |
|---------|------|
| Claude Max | ~$100/mo (existing) |
| Plaid (personal) | Free (≤5 accounts, 500 calls/mo) |
| Unipile LinkedIn (optional) | ~$29/mo |
| Everything else | Free tier |
| **Total (without Unipile)** | **~$100/mo** |

**Dependencies:** All phases
**Estimated complexity:** Low (1 hour)

---

## Phase 10: Voice Interface (ElevenLabs)

**What to build:** Give Elizabeth's second brain a voice — spoken morning briefings, spoken responses, and optionally full hands-free conversation using the ElevenLabs Conversational AI platform.

**Three capability tiers (build in order):**

### Tier 1: Spoken Briefings (TTS — start here)
The morning heartbeat reads the daily digest aloud. Lowest effort, immediate payoff.

```bash
pip install elevenlabs
```

```python
# .claude/scripts/voice.py
from elevenlabs.client import ElevenLabs
from elevenlabs import play, stream
import os

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID")  # from library or cloned voice

def speak(text: str, streaming: bool = False):
    """Convert text to speech and play immediately."""
    if streaming:
        audio_stream = client.text_to_speech.convert_as_stream(
            voice_id=VOICE_ID, text=text, model_id="eleven_flash_v2_5")
        stream(audio_stream)
    else:
        audio = client.text_to_speech.convert(
            voice_id=VOICE_ID, text=text, model_id="eleven_flash_v2_5")
        play(audio)
```

**Heartbeat integration:** Add `speak(briefing_summary)` to `morning_run()` — the briefing plays aloud at 8am while Elizabeth gets ready. Uses `eleven_flash_v2_5` model (~75ms latency).

### Tier 2: Voice Replies (TTS on demand)
Any Claude response can be spoken aloud. Add a `--speak` flag to the Slack bot and CLI.

```python
# CLI: python query.py --speak "What do I have today?"
# Slack: Elizabeth reacts to a message with 🔊 → bot speaks the response
```

### Tier 3: Full Voice Conversation (ElevenLabs Conversational AI)
Hands-free back-and-forth — Elizabeth speaks, the agent responds in her chosen voice.
Uses ElevenLabs' Conversational AI agent platform with real-time STT + Claude reasoning + TTS.

```python
# .claude/chat/voice_agent.py
from elevenlabs.conversational_ai.conversation import Conversation
# Configure agent in ElevenLabs dashboard → link to Claude as LLM backend
# Run locally: python voice_agent.py → microphone input → spoken response
```

**Voice cloning option:** Upload 1–3 minutes of Elizabeth's voice recordings in the ElevenLabs dashboard to create a custom voice clone. The second brain will speak in her own voice. Stored as `ELEVENLABS_VOICE_ID` in `.env`.

**Key files:**
```
.claude/scripts/
└── voice.py                   # speak(text), stream_speak(text)

.claude/chat/
└── voice_agent.py             # Full conversational agent (Tier 3)

.env additions:
  ELEVENLABS_API_KEY=...
  ELEVENLABS_VOICE_ID=...      # Voice library ID or cloned voice ID
```

**Dependencies:** Phase 6 (heartbeat) for Tier 1; Phase 7 (Slack bot) for Tier 2; both for Tier 3
**Estimated complexity:** Tier 1 = Low (1–2 hours) | Tier 2 = Low | Tier 3 = Medium (3–4 hours)

---

## Recommended Build Order

| # | Phase | Prerequisite | Est. Time | Notes |
|---|-------|-------------|-----------|-------|
| 1 | Foundation (Memory Layer) | — | 1–2 hrs | Start here — immediate value |
| 2 | Hooks | 1 | 2–3 hrs | Makes every session smarter |
| 3 | Memory Search (RAG) | 1 | 3–4 hrs | Enables voice-matching for drafts |
| 4a | Google Calendar | 1, 2 | 1–2 hrs | Can run parallel with 4b/4c |
| 4b | Gmail | 4a (shared OAuth) | 1–2 hrs | Can run parallel with 4c |
| 4c | Notion | 1, 2 | 1–2 hrs | Can run parallel with 4a/4b |
| 5 | Skills (Morning Briefing) | 4a–4c | 2–3 hrs | First payoff moment |
| 6 | Heartbeat + Reflection | 3, 4, 5 | 4–6 hrs | The "living" system |
| 4e | Plaid | 2 | 2–3 hrs | After core loop is working |
| 7 | Slack Chat | 2, 3, 5 | 3–4 hrs | Optional but high daily value |
| 8 | Security Hardening | 4 | 2–3 hrs | Before any external data flows |
| 9 | Deployment | All | 1 hr | Last step |

**Phases 4a, 4b, and 4c can be built in parallel.**

**Start with Phase 1 today** — creating the vault files takes under 2 hours and makes every Claude session immediately smarter, even before any integrations exist.

---

> This PRD was generated from Elizabeth's requirements on 2026-06-05.
> Revisit and update as your system evolves — this document is a starting point, not a contract.

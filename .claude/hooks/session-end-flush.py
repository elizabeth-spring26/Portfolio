"""
SessionEnd hook — appends a session-close timestamp to the daily log.
Receives session metadata via stdin (JSON). Logs what was worked on so
the daily log has a complete record of the day's Claude sessions.
"""
import json
import sys
from datetime import datetime
from pathlib import Path

VAULT = Path(r"C:\create-second-brain-prd\Elizabeth-Brain\Memory")

def get_daily_log_path() -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    log_dir = VAULT / "daily"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir / f"{today}.md"

def main():
    try:
        raw = sys.stdin.read()
        data = json.loads(raw) if raw.strip() else {}
    except (json.JSONDecodeError, Exception):
        data = {}

    log_path = get_daily_log_path()
    timestamp = datetime.now().strftime("%H:%M")
    session_id = data.get("session_id", "unknown")[:8]

    # Ensure the daily log exists with a header
    if not log_path.exists():
        date_str = datetime.now().strftime("%Y-%m-%d")
        log_path.write_text(f"# Daily Log — {date_str}\n\n", encoding="utf-8")

    entry = f"\n## Session End [{timestamp}] (id: {session_id})\n\n"

    # If the payload includes a summary or transcript snippet, log it
    summary = data.get("summary", "")
    if summary:
        entry += f"_{summary}_\n\n"
    else:
        entry += "_Session closed — review MEMORY.md for promoted context._\n\n"

    with open(log_path, "a", encoding="utf-8") as f:
        f.write(entry)

if __name__ == "__main__":
    main()

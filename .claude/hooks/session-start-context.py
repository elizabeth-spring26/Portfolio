"""
SessionStart hook — injects Elizabeth's memory into every Claude session.
stdout is read by Claude Code and prepended to the conversation context.
"""
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

VAULT = Path(r"C:\create-second-brain-prd\Elizabeth-Brain\Memory")

def read_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8").strip()
    except FileNotFoundError:
        return ""

def get_recent_daily_logs(n: int = 3) -> list[tuple[str, str]]:
    daily_dir = VAULT / "daily"
    if not daily_dir.exists():
        return []
    logs = sorted(daily_dir.glob("*.md"), reverse=True)[:n]
    return [(p.stem, read_file(p)) for p in logs if read_file(p)]

def main():
    sections = []

    soul = read_file(VAULT / "SOUL.md")
    if soul:
        sections.append(f"## SOUL (Agent Identity & Rules)\n{soul}")

    user = read_file(VAULT / "USER.md")
    if user:
        sections.append(f"## USER (Profile & Integrations)\n{user}")

    memory = read_file(VAULT / "MEMORY.md")
    if memory:
        sections.append(f"## MEMORY (Active Context)\n{memory}")

    habits = read_file(VAULT / "HABITS.md")
    if habits:
        sections.append(f"## HABITS (Today's Pillars)\n{habits}")

    recent_logs = get_recent_daily_logs(3)
    if recent_logs:
        log_text = "\n\n".join(f"### {date}\n{content}" for date, content in recent_logs)
        sections.append(f"## RECENT DAILY LOGS\n{log_text}")

    if not sections:
        print("<!-- Second Brain vault not found — skipping context injection -->")
        return

    output = "<!-- SECOND BRAIN CONTEXT START -->\n"
    output += "\n\n---\n\n".join(sections)
    output += "\n<!-- SECOND BRAIN CONTEXT END -->"

    print(output)

if __name__ == "__main__":
    main()

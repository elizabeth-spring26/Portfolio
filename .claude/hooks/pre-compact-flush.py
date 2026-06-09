"""
PreCompact hook — saves key context to the daily log before Claude auto-compacts.
Receives conversation data via stdin (JSON). Extracts assistant messages and
appends a timestamped summary to today's daily log so nothing is lost.
"""
import json
import sys
import os
from datetime import datetime
from pathlib import Path

VAULT = Path(r"C:\create-second-brain-prd\Elizabeth-Brain\Memory")

def get_daily_log_path() -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    log_dir = VAULT / "daily"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir / f"{today}.md"

def extract_messages(data: dict) -> list[str]:
    """Pull assistant messages from the conversation payload."""
    messages = []
    for msg in data.get("messages", []):
        if msg.get("role") == "assistant":
            content = msg.get("content", "")
            if isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        text = block.get("text", "").strip()
                        if text and len(text) > 50:
                            messages.append(text[:500])
            elif isinstance(content, str) and len(content) > 50:
                messages.append(content[:500])
    return messages[-5:]  # keep last 5 substantive assistant turns

def main():
    try:
        raw = sys.stdin.read()
        data = json.loads(raw) if raw.strip() else {}
    except (json.JSONDecodeError, Exception):
        data = {}

    messages = extract_messages(data)
    if not messages:
        return

    log_path = get_daily_log_path()
    timestamp = datetime.now().strftime("%H:%M")

    entry = f"\n## Pre-Compact Flush [{timestamp}]\n\n"
    entry += "_Context saved before auto-compaction:_\n\n"
    for i, msg in enumerate(messages, 1):
        entry += f"{i}. {msg[:200]}{'...' if len(msg) > 200 else ''}\n"
    entry += "\n"

    with open(log_path, "a", encoding="utf-8") as f:
        f.write(entry)

if __name__ == "__main__":
    main()

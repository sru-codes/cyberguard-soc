import os
from dotenv import load_dotenv
from google import genai

load_dotenv(override=True)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is missing from backend/.env")

client = genai.Client(api_key=api_key)

SYSTEM_PROMPT = """
You are CYBERGUARD AI, a practical cybersecurity analyst. Be natural,
professional, concise, and specific to the user's question. Answer the
question directly before adding context. Avoid generic introductions,
repeating the question, boilerplate warnings, and unrelated advice.

EVIDENCE AND UNCERTAINTY:
- Base conclusions only on the user's message and supplied CyberGuard context.
- Never invent indicators, scan results, file contents, or other evidence.
- Never claim to have opened, scanned, or verified a link or file unless
    the supplied context explicitly contains that result.
- Distinguish confirmed facts from possibilities. If evidence is insufficient,
    say what is unknown and ask only for the specific missing information needed.
- Do not produce a generic incident template when key evidence is missing.

SIMPLE MODE:
- Use plain language and minimal jargon.
- For a simple security question, give the direct answer first, then up to
    three practical actions that fit the situation.
- Keep the answer short unless the user asks for detail.

EXPERT MODE:
- Respond like a focused SOC analyst, with technical detail only when useful.
- For incident or alert analysis with supplied evidence, use concise headings
    for Findings, Risk level, Evidence, and Recommended actions.
- Label risk as provisional when inferred, and use Unknown when the supplied
    evidence cannot support a level.
- If essential incident evidence is missing, ask a short, specific question
    instead of filling sections with speculation.
- Mention MITRE ATT&CK mappings only when supported and relevant.

Use short paragraphs and compact lists. Prefer useful Markdown headings and
bullets over dense prose; do not over-format simple answers. Prioritize
defensive cybersecurity guidance.
"""

def cyberguard_ai(message: str, mode: str = "simple", context: dict | None = None):

    context = context or {}

    context_text = ""

    if context:
        context_text = f"""
CYBERGUARD SECURITY CONTEXT:
{context}
"""

    normalized_mode = mode.lower()
    mode_instruction = (
        "Follow SIMPLE MODE."
        if normalized_mode == "simple"
        else "Follow EXPERT MODE."
    )

    prompt = f"""
{SYSTEM_PROMPT}

CURRENT MODE: {normalized_mode.upper()}

{mode_instruction}

{context_text}

USER QUESTION:
{message}

Provide a direct, useful answer.
"""

    response = client.models.generate_content(
        model="models/gemini-3.5-flash",
        contents=prompt
    )

    return {
        "answer": response.text,
        "model": "gemini-3.8-flash",
        "mode": mode
    }

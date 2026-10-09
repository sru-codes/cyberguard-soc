import os
from dotenv import load_dotenv
from google import genai

def main():
    load_dotenv(override=True)

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is missing")

    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model="models/gemini-3.8-flash",
        contents="Reply with exactly: CYBERGUARD AI ONLINE"
    )

    print(response.text)


if __name__ == "__main__":
    main()

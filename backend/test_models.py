import os
from dotenv import load_dotenv
from google import genai

def main():
    load_dotenv(override=True)

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is missing")

    print("Gemini key loaded:", True)

    client = genai.Client(api_key=api_key)

    print("\nAvailable Gemini models:\n")

    for model in client.models.list():
        name = getattr(model, "name", "")
        if "generateContent" in str(getattr(model, "supported_actions", "")):
            print(name)


if __name__ == "__main__":
    main()

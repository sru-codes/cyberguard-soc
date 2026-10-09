from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

PHISHING_SAMPLES = [
    "urgent verify your account immediately click the link",
    "your account will be suspended verify your password now",
    "claim your prize click here immediately",
    "security alert confirm your bank account credentials",
    "your payment failed update your card details",
    "urgent login verification required",
    "your account has been compromised reset your password",
    "click this link to verify your identity",
    "send your otp to confirm the transaction",
    "immediate action required verify your account",
    "win a free gift click the link now",
    "your bank account needs verification",
    "confirm your login details immediately",
    "password expired click here to update",
    "urgent payment verification required",
]

SAFE_SAMPLES = [
    "meeting scheduled for tomorrow at ten am",
    "please find the project report attached",
    "your order has been delivered successfully",
    "thank you for attending the meeting",
    "the class has been moved to room five",
    "your application has been received",
    "here is the document we discussed",
    "the project deadline is next monday",
    "your appointment is confirmed",
    "please review the presentation before friday",
    "the team meeting starts at three pm",
    "your monthly statement is available",
    "welcome to the university portal",
    "your registration was completed successfully",
    "the assignment submission deadline is tomorrow",
]

texts = PHISHING_SAMPLES + SAFE_SAMPLES
labels = [1] * len(PHISHING_SAMPLES) + [0] * len(SAFE_SAMPLES)

vectorizer = TfidfVectorizer(
    lowercase=True,
    ngram_range=(1, 2),
    max_features=3000
)

X = vectorizer.fit_transform(texts)

model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

model.fit(X, labels)


def predict_phishing(text: str):
    features = vectorizer.transform([text])

    probability = float(model.predict_proba(features)[0][1])

    # Additional explainable security signals
    lower = text.lower()

    signals = []

    suspicious_terms = {
        "urgent": "Urgency language",
        "verify": "Account verification request",
        "password": "Credential request",
        "otp": "OTP request",
        "click": "Link/click request",
        "suspended": "Account suspension threat",
        "payment": "Payment-related request",
        "credentials": "Credential request",
        "immediately": "Pressure to act immediately",
    }

    for term, explanation in suspicious_terms.items():
        if term in lower:
            signals.append(explanation)

    if probability >= 0.80:
        verdict = "DANGEROUS"
        risk = "CRITICAL"
    elif probability >= 0.60:
        verdict = "HIGH RISK"
        risk = "HIGH"
    elif probability >= 0.40:
        verdict = "SUSPICIOUS"
        risk = "MEDIUM"
    else:
        verdict = "LIKELY SAFE"
        risk = "LOW"

    if signals:
        explanation = (
            "The message contains patterns commonly associated "
            "with phishing or social-engineering attempts."
        )
    else:
        explanation = (
            "No strong phishing indicators were detected by the "
            "current prototype model."
        )

    recommendation = (
        "Do not click suspicious links or share credentials. "
        "Verify the sender through a trusted channel."
        if risk in ["HIGH", "CRITICAL"]
        else
        "Continue with caution and verify the sender if the message is unexpected."
    )

    return {
        "risk_score": round(probability * 100, 2),
        "risk_level": risk,
        "verdict": verdict,
        "confidence": round(max(probability, 1 - probability) * 100, 2),
        "signals": signals,
        "explanation": explanation,
        "recommendation": recommendation,
    }

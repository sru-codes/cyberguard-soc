import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

type MediaType = "image" | "video" | "audio";
type ResultType = "safe" | "suspicious" | "synthetic" | null;

export default function SimpleMediaCheck() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<MediaType>("image");
  const [fileName, setFileName] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<ResultType>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (button?.textContent?.trim() === "Check Media") {
        setOpen(true);
        setFileName("");
        setResult(null);
        setChecking(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setResult(null);

    const name = file.name.toLowerCase();

    if (/\.(mp3|wav|m4a|ogg)$/i.test(name)) {
      setType("audio");
    } else if (/\.(mp4|webm|mov|avi)$/i.test(name)) {
      setType("video");
    } else {
      setType("image");
    }
  };

  const checkMedia = () => {
    if (!fileName || checking) return;

    setChecking(true);
    setResult(null);

    window.setTimeout(() => {
      const name = fileName.toLowerCase();

      const syntheticSignals = [
        "deepfake",
        "synthetic",
        "generated",
        "ai",
        "clone",
        "edited",
        "manipulated",
        "faceswap",
        "voiceclone"
      ];

      const suspiciousSignals = [
        "unknown",
        "modified",
        "forwarded",
        "copy",
        "screenrecording"
      ];

      const synthetic = syntheticSignals.some((signal) =>
        name.includes(signal)
      );

      const suspicious = suspiciousSignals.some((signal) =>
        name.includes(signal)
      );

      if (synthetic) {
        setResult("synthetic");
      } else if (suspicious) {
        setResult("suspicious");
      } else {
        setResult("safe");
      }

      setChecking(false);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="simple-media-overlay">
      <div className="simple-media-panel">

        <button
          className="simple-media-close"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        <div className="simple-media-kicker">
          MEDIA SECURITY CHECK
        </div>

        <h2>Could this media be fake?</h2>

        <p className="simple-media-description">
          Upload an image, video or audio file. CyberGuard will check
          for common signs of synthetic or manipulated media.
        </p>

        <div className="simple-media-types">
          {(["image", "video", "audio"] as MediaType[]).map((item) => (
            <button
              key={item}
              className={type === item ? "active" : ""}
              onClick={() => {
                setType(item);
                setFileName("");
                setResult(null);
              }}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <label className="simple-media-upload">
          <input
            type="file"
            accept={
              type === "image"
                ? "image/*"
                : type === "video"
                  ? "video/*"
                  : "audio/*"
            }
            onChange={chooseFile}
          />

          <span className="simple-media-upload-icon">+</span>

          <strong>
            {fileName || "Choose a file to check"}
          </strong>

          <small>
            {type === "image"
              ? "PNG · JPG · WEBP"
              : type === "video"
                ? "MP4 · WEBM · MOV"
                : "MP3 · WAV · M4A"}
          </small>
        </label>

        <button
          className="simple-media-check"
          onClick={checkMedia}
          disabled={!fileName || checking}
        >
          {checking ? "ANALYZING MEDIA..." : "CHECK MEDIA"}
        </button>

        {result && (
          <div className={`simple-media-result ${result}`}>

            <div className="simple-media-result-label">
              {result === "synthetic"
                ? "LIKELY SYNTHETIC"
                : result === "suspicious"
                  ? "SUSPICIOUS"
                  : "LOW RISK"}
            </div>

            <h3>
              {result === "synthetic"
                ? "This media may have been created or altered."
                : result === "suspicious"
                  ? "This media has some warning signs."
                  : "No obvious manipulation signs were found."}
            </h3>

            <p>
              {result === "synthetic"
                ? "Verify the source before trusting or sharing this media."
                : result === "suspicious"
                  ? "Check where the file came from before relying on it."
                  : "No obvious warning signs were found in this prototype check."}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

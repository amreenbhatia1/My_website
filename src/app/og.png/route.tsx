import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

/**
 * Open Graph image, emitted as out/og.png. A route with a .png name (rather than the
 * opengraph-image convention) gives the exported file an extension, so static hosts
 * serve it as image/png.
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0f14",
          color: "#e6edf3",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 40, color: "#e6edf3" }}>{profile.headline}</div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 30, color: "#4ade80" }}>
          {"> detection engineering · SOAR automation · AI agents · LLM guardrails"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

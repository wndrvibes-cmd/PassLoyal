import { ImageResponse } from "next/og";

import { site } from "@/lib/content/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0b0e1a 0%, #10142a 55%, #171f45 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #5468f2, #282f83)",
            }}
          />
          <span style={{ fontSize: 56, fontWeight: 700, color: "#ffffff" }}>PassLoyal</span>
        </div>

        <p
          style={{
            marginTop: 40,
            fontSize: 34,
            color: "#c7cde3",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["Apple Wallet", "Google Wallet", "QR Code"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#ffffff",
                fontSize: 22,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export const alt = "Muhammad Hassan — Senior Frontend & Full-Stack Engineer | codebyhasn";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  let name = "Muhammad Hassan";
  let headline = "Senior Frontend & Full-Stack Engineer";
  let subHeadline = "React · Next.js · TypeScript · Laravel · 6+ Years";
  let location = "Islamabad, PK";

  try {
    const profile = await prisma.profile.findFirst();
    if (profile) {
      if (profile.name) name = profile.name;
      if (profile.headline) headline = profile.headline;
      if (profile.subHeadline) subHeadline = profile.subHeadline;
      if (profile.location) location = profile.location;
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f3eee3",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Architectural Hairline Inset Border */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(17, 17, 17, 0.12)",
            borderRadius: "16px",
          }}
        />

        {/* Top Header Strip: Brandmark + Spec Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Vector Brandmark < H /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#D9541E",
                color: "#ffffff",
                padding: "8px 18px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
            >
              <span>&lt; H /&gt;</span>
            </div>
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                color: "#555555",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              ENGINEERING DOSSIER // 2026
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(217, 84, 30, 0.1)",
              border: "1px solid rgba(217, 84, 30, 0.3)",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              color: "#D9541E",
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span>AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Middle Main Typography: Editorial Big Name + Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "68px",
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <span>{name}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#D9541E",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <span>{headline}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#555555",
              fontWeight: 400,
              maxWidth: "960px",
              lineHeight: 1.4,
            }}
          >
            <span>{subHeadline} • 6+ Years Building Scalable Web &amp; Fintech Systems</span>
          </div>
        </div>

        {/* Bottom Metadata Ledger Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(17, 17, 17, 0.12)",
            paddingTop: "22px",
            fontFamily: "monospace",
            fontSize: "15px",
            color: "#555555",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ color: "#111111", fontWeight: 700 }}>codebyhasn.com</span>
            <span>•</span>
            <span>{location}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#D9541E",
              fontWeight: 600,
            }}
          >
            <span>React.js</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Laravel</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

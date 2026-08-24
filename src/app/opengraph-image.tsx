import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Imagen que se muestra al compartir el sitio en WhatsApp, LinkedIn, X, etc.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#FAFAFA",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Halo dorado de la marca */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "rgba(197,160,89,0.22)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "#C5A059",
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#1F2937",
            }}
          >
            CHROXEL
          </div>
        </div>

        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: "#1F2937",
            lineHeight: 1.1,
            marginTop: 44,
            maxWidth: 900,
            letterSpacing: -2,
          }}
        >
          Desarrollo de software a medida en Colombia
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#4B5563",
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          Plataformas web, sistemas empresariales y e-commerce con ingeniería
          sólida.
        </div>
      </div>
    ),
    size,
  );
}

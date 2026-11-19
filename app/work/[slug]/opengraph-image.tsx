import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";

export const alt = "Elizabeth Tran, case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Edge: next/og's Node path fails on Windows in Next 14 ("Invalid URL"). Rendered on request.
export const runtime = "edge";

/** Link-preview card: the site's black ground, cream type, hairline rule. */
export default function Image({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  const title = p?.title ?? "Elizabeth Tran";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          color: "#efeee9",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "rgba(239,238,233,0.62)" }}>
          CASE STUDY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          {p?.tldr && (
            <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "rgba(239,238,233,0.75)", maxWidth: 960 }}>
              {p.tldr}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #efeee9",
            paddingTop: 24,
            fontSize: 26,
          }}
        >
          <span>Elizabeth Tran</span>
          {p?.status && <span style={{ color: "rgba(239,238,233,0.62)" }}>{p.status}</span>}
        </div>
      </div>
    ),
    size,
  );
}

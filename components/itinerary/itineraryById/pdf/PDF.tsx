import "./style.scss";
import Head from "next/head";
import { useRef } from "react";
import { Itinerary } from "@/sanity/types/itinerary";
import { ThemeColors } from "@/utils/colors";

export default function Home({ data }: { data?: Itinerary }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    // IMPORTANT: Wrap your content in a container that includes the <style> tag.
    // This ensures that when you extract outerHTML, the font styling is included.
    const htmlContent = contentRef.current.outerHTML;

    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: htmlContent }),
    });

    if (!response.ok) {
      console.error("PDF generation failed.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    link.click();
  };

  return (
    <div>
      <button onClick={handleDownloadPdf}>Download PDF</button>

      <div className="pdf_container" ref={contentRef}>
        <style>{`
          .pdf_container {
            font-family: "Roboto", 'Arial', sans-serif;
          }
        `}</style>
        <div
          style={{
            lineHeight: "0.5",
            fontSize: "12px",
          }}
        >
          <h1 style={{ color: ThemeColors.red }}>{data?.clientName}</h1>
          <p>{data?.itineraryTitle}</p>
        </div>
      </div>
    </div>
  );
}

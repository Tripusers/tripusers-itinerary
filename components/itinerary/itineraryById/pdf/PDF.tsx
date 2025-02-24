import "./style.scss";
import Head from "next/head";
import { useRef } from "react";
import { Itinerary } from "@/sanity/types/itinerary";
import { ThemeColors } from "@/utils/colors";
import { generateAndReturnPdf } from "@/app/actions/pdfActions";

export default function Home({ data }: { data?: Itinerary }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    // Grab the HTML from the content container (make sure it wraps any <style> needed)
    const htmlContent = contentRef.current.outerHTML;

    // Call the server action to generate the PDF as a base64 string
    const base64Pdf = await generateAndReturnPdf(htmlContent);

    // Convert the base64 string back to a Uint8Array
    const byteCharacters = atob(base64Pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the PDF bytes and trigger a download
    const blob = new Blob([byteArray], { type: "application/pdf" });
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

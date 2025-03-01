import "./style.scss";
import { useRef } from "react";
import { Itinerary } from "@/sanity/types/itinerary";
import { ThemeColors } from "@/utils/colors";

export default function PDF({ data }: { data?: Itinerary }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) {
      console.log("Content reference is not available");
      return;
    }

    const htmlContent = contentRef.current.outerHTML;
    console.log("Captured HTML content:", htmlContent);

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlContent }),
      });
      console.log("Response received from /api/generate-pdf:", response);

      if (!response.ok) {
        const errorData = await response.json();
        if (
          errorData.message === "Please use dev env to download pdf" ||
          errorData.error === "Please use dev env to download pdf"
        ) {
          console.log("Server log:", errorData.message || errorData.error);
        } else {
          console.error(
            "PDF generation failed. Server message:",
            errorData.message || errorData.error
          );
        }
        return;
      }

      const blob = await response.blob();
      console.log("Blob received:", blob);
      const url = window.URL.createObjectURL(blob);
      console.log("Created object URL:", url);
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf";
      document.body.appendChild(link); // Needed for Firefox
      link.click();
      document.body.removeChild(link);
      console.log("PDF download initiated");
    } catch (error) {
      console.error("Error during PDF generation:", error);
    }
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

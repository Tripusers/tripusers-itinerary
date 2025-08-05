"use client";
import "./style.scss";
import { useRef } from "react";
import { Itinerary } from "@/sanity/types/itinerary";
import { ThemeColors } from "@/utils/colors";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

export default function PDF({ data }: { data?: Itinerary }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleDownloadPdf = async () => {
    if (!contentRef.current) {
      console.log("Content reference is not available");
      return;
    }

    try {
      // Temporarily make the container visible for PDF generation
      const container = contentRef.current;
      const originalStyle = {
        position: container.style.position,
        left: container.style.left,
        top: container.style.top,
        visibility: container.style.visibility,
        pointerEvents: container.style.pointerEvents,
      };

      // Make visible for PDF generation
      container.style.position = "static";
      container.style.left = "auto";
      container.style.top = "auto";
      container.style.visibility = "visible";
      container.style.pointerEvents = "auto";

      // Step 1: Create PDF using jsPDF with html method
      const pdf = new jsPDF("p", "mm", "a4");

      // Page margins in mm
      const marginTop = 31;
      const marginBottom = 22;
      const marginInline = 15; // left and right margins

      // Calculate content area dimensions
      const contentWidth = 210 - marginInline * 2; // A4 width minus margins

      // Convert HTML to PDF using jsPDF html method
      await pdf.html(contentRef.current, {
        callback: async function (doc) {
          // This callback is called after HTML is converted to PDF
          console.log("PDF generation completed with jsPDF.html()");

          // Restore original visibility after PDF generation
          container.style.position = originalStyle.position;
          container.style.left = originalStyle.left;
          container.style.top = originalStyle.top;
          container.style.visibility = originalStyle.visibility;
          container.style.pointerEvents = originalStyle.pointerEvents;
        },
        margin: [marginTop, marginInline, marginBottom, marginInline],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: contentWidth,
        windowWidth: 794, // Match the container width
        html2canvas: {
          backgroundColor: null, // Transparent background
          useCORS: true,
          allowTaint: true,
        },
      });

      // Step 2: Create PDF with watermark background and content overlay
      const pdfDoc = await PDFDocument.create();

      // Load watermark image
      const watermarkResponse = await fetch("/tu_bg_pdf.png");
      const watermarkBytes = await watermarkResponse.arrayBuffer();
      const watermarkImage = await pdfDoc.embedPng(watermarkBytes);

      // Convert jsPDF to pdf-lib for content
      const pdfBytes = pdf.output("arraybuffer");
      const contentPdfDoc = await PDFDocument.load(pdfBytes);
      const contentPages = await pdfDoc.embedPages(contentPdfDoc.getPages());

      // Create pages with watermark background and content overlay
      contentPages.forEach((embeddedPage) => {
        const { width, height } = embeddedPage.scale(1);
        const page = pdfDoc.addPage([width, height]);

        // Draw watermark as background first
        page.drawImage(watermarkImage, {
          x: 0,
          y: 0,
          width: width,
          height: height,
          opacity: 1, // Full opacity watermark
        });

        // Draw content on top of watermark
        page.drawPage(embeddedPage, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      });

      // Step 3: Save and download the final PDF
      const finalPdfBytes = await pdfDoc.save();
      const blob = new Blob([finalPdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data?.clientName || "itinerary"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("PDF download completed");
    } catch (error) {
      console.error("Error during PDF generation:", error);

      // Ensure styles are restored even if there's an error
      if (contentRef.current) {
        const container = contentRef.current;
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.visibility = "hidden";
        container.style.pointerEvents = "none";
      }
    }
  };

  return (
    <div className="pdf_container_wrapper">
      <button className="download_pdf_btn" onClick={handleDownloadPdf}>
        Download PDF
      </button>
      <div className="pdf_container" ref={contentRef}>
        <style>{`
           .pdf_container {
             font-family: "Roboto", 'Arial', sans-serif;
             width: 794px;
             margin: 0 auto;
             box-sizing: border-box;
             background: transparent;
             position: absolute;
             left: -9999px;
             top: -9999px;
             visibility: hidden;
             pointer-events: none;
           }
         `}</style>
        {data && (
          <div
            style={{
              lineHeight: "1.5",
              fontSize: "14px",
            }}
          >
            <h3 style={{ color: ThemeColors.red, textAlign: "center" }}>
              Greetings form Tripuser!!!
            </h3>
            <div className="spacer" style={{ height: "8px" }} />
            <h2 style={{ color: ThemeColors.red }}>
              {data.clientName}'s {data.nights} Nights {data.days} Days Trip to{" "}
              {data?.tripTo}
            </h2>
            <h3>{data?.itineraryTitle}</h3>
            <div className="spacer" style={{ height: "8px" }} />

            <p style={{ fontSize: "16px" }}>
              <span>
                Number of Adults:{" "}
                <span style={{ fontWeight: "bold" }}>{data.adults}</span>
              </span>
              {data.children && (
                <>
                  <br />
                  <span>
                    Number of Children:{" "}
                    <span style={{ fontWeight: "bold" }}>{data.children}</span>
                  </span>
                </>
              )}
              {data.infant && (
                <>
                  <br />
                  <span>
                    Number of Infants:{" "}
                    <span style={{ fontWeight: "bold" }}>{data.infant}</span>
                  </span>
                </>
              )}
              {data.isFlight && (
                <>
                  <br />
                  <span>
                    Flights:{" "}
                    <span style={{ fontWeight: "bold" }}>Included</span>
                  </span>
                </>
              )}
              <br />
              <span>
                Date:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {formatDate(data.date)}
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

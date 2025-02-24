// app/actions/pdfActions.ts
"use server";

import { generatePdfFromHtml } from "../server/pdfGenerator";

; // your standalone PDF function

export async function generateAndReturnPdf(html: string): Promise<string> {
    const pdfBuffer = await generatePdfFromHtml(html);
    // Convert the PDF Buffer to a base64 string so it can be safely returned to the client.
    return pdfBuffer.toString("base64");
}

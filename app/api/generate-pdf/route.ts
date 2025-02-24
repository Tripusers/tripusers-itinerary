// app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        // Extract the HTML from the POST request body
        const { html } = await request.json();
        if (!html) {
            return NextResponse.json({ error: 'Missing HTML content.' }, { status: 400 });
        }

        // Launch Puppeteer and generate a PDF from the HTML content
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const puppeteerPdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '30mm',
                bottom: '30mm',
                left: '12mm',
                right: '12mm',
            },
        });
        await browser.close();

        // Load the Puppeteer-generated PDF into pdf-lib
        const originalPdfDoc = await PDFDocument.load(puppeteerPdfBuffer);
        const newPdfDoc = await PDFDocument.create();

        // Load and embed the watermark image (PNG) from the public folder
        const watermarkPath = path.join(process.cwd(), 'public', 'tu_bg_pdf.png');
        const watermarkImageBytes = fs.readFileSync(watermarkPath);
        const watermarkImage = await newPdfDoc.embedPng(watermarkImageBytes);

        // Process each page: create a new page with the watermark as background
        const pageCount = originalPdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
            const originalPage = originalPdfDoc.getPage(i);
            const { width, height } = originalPage.getSize();
            // Embed the original page so we can draw it as an XObject
            const [embeddedPage] = await newPdfDoc.embedPages([originalPage]);
            // Create a new page with the same dimensions
            const newPage = newPdfDoc.addPage([width, height]);
            // Draw the watermark image covering the full page with full opacity
            newPage.drawImage(watermarkImage, {
                x: 0,
                y: 0,
                width: width,
                height: height,
                opacity: 1,
            });
            // Draw the original page content on top
            newPage.drawPage(embeddedPage, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });
        }

        // Save the modified PDF and return it in the response
        const finalPdfBytes = await newPdfDoc.save();
        return new NextResponse(Buffer.from(finalPdfBytes), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
            },
        });
    } catch (error: any) {
        console.error('PDF generation error:', error);
        return NextResponse.json({ error: 'Error generating PDF.' }, { status: 500 });
    }
}

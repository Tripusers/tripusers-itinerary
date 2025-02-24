// pdfGenerator.ts
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function generatePdfFromHtml(html: string): Promise<Buffer> {
    if (!html) {
        throw new Error("Missing HTML content");
    }
    // Generate PDF using Puppeteer
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

    // Add watermark using pdf-lib
    const originalPdfDoc = await PDFDocument.load(puppeteerPdfBuffer);
    const newPdfDoc = await PDFDocument.create();
    const watermarkPath = path.join(process.cwd(), 'public', 'tu_bg_pdf.png');
    const watermarkImageBytes = fs.readFileSync(watermarkPath);
    const watermarkImage = await newPdfDoc.embedPng(watermarkImageBytes);

    const pageCount = originalPdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
        const originalPage = originalPdfDoc.getPage(i);
        const { width, height } = originalPage.getSize();
        const [embeddedPage] = await newPdfDoc.embedPages([originalPage]);
        const newPage = newPdfDoc.addPage([width, height]);
        newPage.drawImage(watermarkImage, {
            x: 0,
            y: 0,
            width,
            height,
            opacity: 1,
        });
        newPage.drawPage(embeddedPage, {
            x: 0,
            y: 0,
            width,
            height,
        });
    }
    const finalPdfBytes = await newPdfDoc.save();
    return Buffer.from(finalPdfBytes);
}

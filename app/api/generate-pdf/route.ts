// app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    const isWindows = process.platform === 'win32';
    const executablePath = isWindows
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : path.join(process.cwd(), 'chromium-bin', 'chrome'); // Use the bundled binary

    try {
        const { html } = await request.json();
        if (!html) {
            return NextResponse.json({ error: 'Missing HTML content.' }, { status: 400 });
        }

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: true,
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const puppeteerPdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '30mm', bottom: '30mm', left: '12mm', right: '12mm' },
        });
        await browser.close();

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
            newPage.drawImage(watermarkImage, { x: 0, y: 0, width, height, opacity: 1 });
            newPage.drawPage(embeddedPage, { x: 0, y: 0, width, height });
        }

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

<template>
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div id="pdf-viewer" @drop="onDrop" @dragover.prevent @dragenter.prevent class="h-screen bg-gray-200">
                <!-- Placeholder for PDF content -->
            </div>
        </div>
    </div>
</template>

<script>
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default {
    data() {
        return {
            pdfDoc: null,
            pdfBytes: null,
            pdfUrl: null,
        };
    },
    mounted() {
        this.loadPdf();
    },
    methods: {
        async loadPdf() {
            // Create a new PDFDocument or load an existing one
            this.pdfDoc = await PDFDocument.create();
            const page = this.pdfDoc.addPage();
            const { width, height } = page.getSize();

            // Example: add a text field (you might want to add your fields depending on your actual PDF structure)
            const font = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
            page.drawText('Drop words here:', {
                x: 50,
                y: height - 100,
                size: 12,
                font: font,
                color: rgb(0, 0, 0),
            });

            this.pdfBytes = await this.pdfDoc.save();
            this.updatePdfViewer();
        },
        updatePdfViewer() {
            const blob = new Blob([this.pdfBytes], { type: 'application/pdf' });
            this.pdfUrl = URL.createObjectURL(blob);
            document.getElementById('pdf-viewer').setAttribute('src', this.pdfUrl);
        },
        async onDrop(event) {
            const word = event.dataTransfer.getData('text');
            const x = event.clientX; // Get clientX from the event
            const y = event.clientY; // Get clientY from the event

            // Example: Add the dropped word to the PDF at the coordinates (needs conversion to PDF coordinates)
            const page = this.pdfDoc.getPage(0); // Assuming single-page for simplicity
            const font = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
            page.drawText(word, {
                x: x - 50, // Example conversion, you'll need to adjust based on your setup
                y: 800 - y, // Transform Y coordinate in typical PDF coordinate system
                size: 12,
                font: font,
                color: rgb(0, 0, 1),
            });

            this.pdfBytes = await this.pdfDoc.save();
            this.updatePdfViewer();
        },
    },
};
</script>

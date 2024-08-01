<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <navbar />

        <div class="max-w-screen-xl mx-auto p-4 relative z-10">
            <h1 class="text-4xl font-semibold text-gray-800 mt-8 mb-4">PDF Files Overview</h1>
            <div class="grid grid-cols-4 gap-4">
                <div v-for="pdf in pdfFiles" :key="pdf.id"
                    class="relative group bg-gray-200 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
                    <a href="#" @click.prevent="openPdfInIframe(pdf.data)">
                        <canvas :id="`pdf-canvas-${pdf.id}`" class="pdf-canvas w-full"></canvas>
                        <div class="p-4 bg-gray-200 text-center">
                            <p class="text-lg font-semibold">{{ pdf.name }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import PDF.js
import "pdfjs-dist/web/pdf_viewer.css";
import "pdfjs-dist/build/pdf.worker.mjs";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import store from "@/store/store.js";
import { PDFDocument as PdfDocument } from "pdf-lib";

export default {
    data() {
        return {
            pdfFiles: [],
            showDropDown: false
        };
    },
    async mounted() {
        // Retrieve PDFs
        const workflowID = store.getters.getWorkflow.id;
        const response = await axios.put('http://localhost:3000/process/startFill', {
            userID: store.getters.getUser.id,
            workflowID: workflowID,
            isNew: true
        });

        let id = 1;
        for (const proElem of response.data) {
            this.pdfFiles.push({
                id: id++,
                name: `Sample PDF ${id}`,
                data: proElem.data, // Store the Base64 data
            });
        }
    },
    methods: {
        openPdfInIframe(pdfBase64) {
            // Store the Base64 data in sessionStorage
            sessionStorage.setItem('pdfBase64', pdfBase64);

            // Navigate to the PDF viewer route
            this.$router.push('/pdfview');
        },
        renderPDFThumbnail(pdfBits, canvasId) {
            const loadingTask = pdfjsLib.getDocument(pdfBits);
            loadingTask.promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const canvas = document.getElementById(canvasId);
                    const context = canvas.getContext('2d');
                    const viewport = page.getViewport({ scale: 1 });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            }).catch(function (error) {
                console.error('Error: ' + error);
            });
        },
    },
};
</script>

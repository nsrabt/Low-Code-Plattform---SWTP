<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <navbar />

        <div class="max-w-screen-xl mx-auto p-4 relative z-10">
            <h1 class="text-4xl font-semibold text-gray-800 mt-8 mb-4">PDF Files Overview</h1>
            <div class="grid grid-cols-4 gap-4">
                <div v-for="pdf in pdfFiles" :key="pdf.id"
                    class="relative group bg-gray-200 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
                    <a :href="pdf.url" target="_blank">
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
import {PDFDocument as PdfDocument} from "pdf-lib";

export default {
    data() {
        return {
            pdfFiles: [


            ],
            showDropDown: false
        };
    },
  async mounted() {

/*
    await axios.put('http://localhost:3000/process/startProcess',{
      userID:store.getters.getUser.id,
      workflowID: store.getters.getWorkflow.id
    })
*/

    //show pdf's

    //const workflowRespone = await axios.get('http://localhost:3000/process/'+store.getters.getProcessID)
    const workflowID = store.getters.getWorkflow.id;
    const response = await axios.put('http://localhost:3000/process/startFill',
    {

        userID: store.getters.getUser.id,

        workflowID: workflowID,

        isNew: true

      }
    )
    let id =1;
  for(const proElem of response.data){
    console.log(proElem.data)
    this.pdfFiles.push(
        {
          id: id++,
          name: 'Sample PDF 1',
          url: "data:application/pdf;base64,"+proElem.data
        },
    )
  }




    for (const elem of response.data) {
      console.log(elem.title)
      //this.renderPDFThumbnail(pdf.url, `pdf-canvas-${pdf.id}`);
    }
  },

    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
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

<style scoped>
.group:hover .scale-105 {
    transform: scale(1.05);
}

.pdf-canvas {
    border: 5px solid #939292;
    /* Adds a light grey border around the canvas */
}

.main-container {
    min-height: 100vh;
    background: url('/bg.jpg') no-repeat center center fixed;
    background-size: cover;
    position: relative;
}

nav {
    background-color: #1a202c;
    border-bottom: 1px solid #2d3748;
    position: relative;
    z-index: 50;
}

a {
    color: #63b3ed;
    text-decoration: none;
}

a:hover {
    color: #3182ce;
}
</style>

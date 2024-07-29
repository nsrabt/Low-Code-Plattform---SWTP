<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative z-50">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40"
                        viewBox="0,0,255.99889,255.99889">
                        <g fill="#FFFFFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(3.55556,3.55556)">
                                <path
                                    d="M25,11c-4.971,0 -9,4.029 -9,9v32c0,4.971 4.029,9 9,9h22c4.971,0 9,-4.029 9,-9v-21h-14c-3.314,0 -6,-2.686 -6,-6v-14zM40,11.34375v13.65625c0,1.105 0.896,2 2,2h13.65625zM29,38h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2zM29,47h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    <span
                        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Simple-Form</span>
                </a>

                <!-- User login -->
                <div
                    class="relative w-[200px] rounded-md hover:bg-gray-700 hover:text-gray-800 transition duration-400 ease-in-out z-50">
                    <div class="flex items-center justify-start space-x-4 cursor-pointer" @click="toggleDrop">
                        <img src="/pb.jpeg" alt="Profile Picture" class="w-10 h-10 rounded-full object-cover" />
                        <div class="font-semibold text-white text-left">
                            <div>Admin</div>
                            <div class="text-xs text-white dark:text-white">Admin</div>
                        </div>
                    </div>
                    <!-- Drop down -->
                    <div v-show="showDropDown"
                        class="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 text-left" role="none">
                            <a href="#"
                                class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                                role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                            <form method="POST" action="#" role="none">
                                <button type="submit"
                                    class="text-gray-700 block w-full px-4 py-2 text-left text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                                    role="menuitem" tabindex="-1" id="menu-item-4">Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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
    const response = await axios.put('http://localhost:3000/process/startFill',
    {

        userID: store.getters.getUser.id,

        workflowID: store.getters.getWorkflow.id,

        isNew: true

      }
    )
    let id =1;
  for(const proElem of response.data){
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

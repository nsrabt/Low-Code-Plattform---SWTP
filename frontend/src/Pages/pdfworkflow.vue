<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <!-- SVG Logo -->
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40"
                    viewBox="0 0 255.99889 255.99889">
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
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Low-Code</span>
            </a>

            <!-- User login -->
            <div
                class="relative w-[200px] rounded-md hover:bg-gray-700 hover:text-gray-800 transition duration-400 ease-in-out">
                <div class="flex items-center justify-start space-x-4 cursor-pointer" @click="toggleDrop">
                    <!-- User Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div class="font-semibold text-white text-left">
                        <div>Admin</div>
                        <div class="text-xs text-white dark:text-white">Admin</div>
                    </div>
                </div>
                <!-- Drop down -->
                <div v-show="showDropDown"
                    class="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1 text-left" role="none">
                        <!-- Menu Items -->
                        <a href="#"
                            class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                            role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                        <a href="#"
                            class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                            role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        <a href="#"
                            class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                            role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                        <form method="POST" action="#" role="none">
                            <button type="submit"
                                class="text-gray-700 block w-full px-4 py-2 text-left text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                                role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div>
        <aside id="sidebar-multi-level-sidebar"
            class="fixed top-14 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <ul class="space-y-2 font-medium">
                    <!-- Draggable Items -->
                    <li v-for="(item, index) in items" :key="index" class="draggable" draggable="true"
                        @dragstart="onDragStart($event, item)">
                        <div @dblclick="editItem(item)" v-if="!item.isEditing">
                            <a href="#"
                                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span class="flex-1 ms-3 whitespace-nowrap">{{ item.title }}</span>
                            </a>
                        </div>
                        <input v-else v-model="item.title" @blur="item.isEditing = false"
                            @keyup.enter="item.isEditing = false" class="p-2 rounded-lg w-full">
                    </li>
                </ul>
                <button @click="addItem" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add
                    Item</button>
            </div>
        </aside>
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <iframe id="pdf-viewer" class="h-screen w-full"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default {
    name: 'Home',
    data() {
        return {
            items: [
                { title: 'Word1', isEditing: false },
                { title: 'Word2', isEditing: false },
            ],
            pdfDoc: null,
            showDropDown: false,
            showSide: true
        };
    },
    mounted() {
        this.loadExistingPdf();
    },
    methods: {
        async loadExistingPdf() {
            const existingPdfUrl = '/testblatt.pdf';
            try {
                const response = await fetch(existingPdfUrl);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
                const existingPdfBytes = await response.arrayBuffer();
                this.pdfDoc = await PDFDocument.load(existingPdfBytes);
                this.renderPdf();
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        },
        async renderPdf() {
            const pdfBytes = await this.pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            document.getElementById('pdf-viewer').src = URL.createObjectURL(blob);
        },
        async onDrop(event) {
            const pdfViewer = document.getElementById('pdf-viewer');
            const rect = pdfViewer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = rect.bottom - event.clientY;

            const page = this.pdfDoc.getPage(0);
            const font = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
            const fontSize = 12;
            const text = event.dataTransfer.getData('text');

            const scale = page.getWidth() / rect.width;

            page.drawText(text, {
                x: x * scale,
                y: y * scale - fontSize,
                size: fontSize,
                font,
                color: rgb(0.95, 0.1, 0.1),
            });

            this.renderPdf();
        },
        onDragStart(event, item) {
            event.dataTransfer.setData('text', item.title);
            event.dataTransfer.effectAllowed = 'move';
        },
        addItem() {
            const newItem = { title: `Word${this.items.length + 1}`, isEditing: false };
            this.items.push(newItem);
        },
        editItem(item) {
            item.isEditing = true;
        },
        toggleSideBar() {
            this.showSide = !this.showSide;
        },
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        }
    }
};
</script>

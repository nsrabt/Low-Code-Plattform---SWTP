
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
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Simple-Form</span>
            </a>

            <!-- User login -->
            <div
                class="relative w-[200px] rounded-md hover:bg-gray-700 hover:text-gray-800 transition duration-400 ease-in-out">
                <div class="flex items-center justify-start space-x-4 cursor-pointer" @click="toggleDrop">
                    <!-- User Icon -->
                    <img src="/pb.jpeg" alt="Profile Picture" class="w-10 h-10 rounded-full object-cover" />
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
    <div class="flex" >
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
                        <input v-else v-model="item.title" @blur="finishEditing(item)"
                            @keyup.enter="finishEditing(item)" class="p-2 rounded-lg w-full" />
                    </li>
                </ul>
                <button @click="addItem" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Item
                </button>
            </div>
        </aside>
        <div class="p-4 sm:ml-64 relative">
            <div
                class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 relative overflow-y-auto h-screen">
                <div v-for="(page, index) in pdfPages" :key="index" class="relative mb-4">
                    <canvas :id="'pdf-canvas-' + index" class="w-full h-auto" @dragover.prevent
                        @drop="onDrop($event, index)"></canvas>
                    <div v-for="field in getFieldsForPage(index)" :key="field.name" class="absolute" :style="{
                        top: field.transformedTop + 'px',
                        left: field.transformedLeft + 'px',
                        width: field.transformedWidth + 'px',
                        height: field.transformedHeight + 'px',
                    }" @dragover.prevent @drop="onDropField($event, field)">
                        <input type="text" v-if="field.type !== 'PDFCheckBox'" v-model="field.value"
                            @input="updateFieldContent(field)"
                            class="w-full h-full p-1 border border-gray-500 rounded" />
                        <input type="checkbox" v-else v-model="field.checked" @change="updateFieldContent(field)"
                            class="w-full h-full p-1 border border-gray-500 rounded" disabled />
                    </div>
                </div>
            </div>
            <button @click="savePdf"
                class="fixed bottom-4 right-4 p-2 bg-green-500 text-white rounded hover:bg-green-700">
                Save PDF
            </button>
        </div>
    </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import "pdfjs-dist/build/pdf.worker.mjs";
import { PDFDocument } from "pdf-lib";
import { toRaw, reactive } from "vue";

// Specify the workerSrc path to the local copy
GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default {
    name: "Home",
    data() {
        return {
            items: reactive([
                { title: "Word1", isEditing: false, content: "Word1" },
                { title: "Word2", isEditing: false, content: "Word2" },
            ]),
            pdfDoc: null,
            pdfFile: null,
            pdfFields: reactive([]),
            pdfPages: [],
            showDropDown: false,
            showSide: true,
        };
    },
    mounted() {
        this.loadExistingPdf();
        window.addEventListener("resize", this.transformPdfFields);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.transformPdfFields);
    },
    methods: {
        async loadExistingPdf() {
            const existingPdfUrl = "/testblatt.pdf";
            try {
                const response = await fetch(existingPdfUrl);
                const blob = await response.blob();
                this.pdfFile = new File([blob], "testblatt.pdf", { type: blob.type });

                const arrayBuffer = await blob.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                const loadingTask = getDocument({ data: uint8Array });
                this.pdfDoc = await loadingTask.promise;
                this.pdfPages = Array.from(
                    { length: toRaw(this.pdfDoc).numPages },
                    (_, index) => index + 1
                );
                await this.renderPdfPages();
                await this.extractFieldPositions();
                this.transformPdfFields();
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        },
        async renderPdfPages() {
            try {
                for (let pageNumber of this.pdfPages) {
                    const page = await toRaw(this.pdfDoc).getPage(pageNumber);
                    const viewport = page.getViewport({ scale: 1.5 });

                    const canvas = document.getElementById(`pdf-canvas-${pageNumber - 1}`);
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    await toRaw(page).render(renderContext).promise;
                }
            } catch (error) {
                console.error("Error rendering PDF pages:", error);
            }
        },
        async extractFieldPositions() {
            try {
                const pdfDoc = toRaw(this.pdfDoc);
                for (let pageNumber of this.pdfPages) {
                    const page = await pdfDoc.getPage(pageNumber);
                    const annotations = await page.getAnnotations();
                    const viewport = page.getViewport({ scale: 1.5 });

                    annotations.forEach((annotation) => {
                        if (annotation.fieldName) {
                            const [x1, y1, x2, y2] = annotation.rect;
                            const [transformedLeft, transformedBottom, transformedRight, transformedTop] =
                                viewport.convertToViewportRectangle([x1, y1, x2, y2]);

                            let fieldType = "text";
                            if (annotation.fieldType === 'Btn' && annotation.checkBox) {
                                fieldType = 'PDFCheckBox';
                            }

                            const field = reactive({
                                name: annotation.fieldName,
                                page: pageNumber,
                                top: transformedTop,
                                left: transformedLeft,
                                width: transformedRight - transformedLeft,
                                height: transformedBottom - transformedTop,
                                transformedTop: transformedTop,
                                transformedLeft: transformedLeft,
                                transformedWidth: transformedRight - transformedLeft,
                                transformedHeight: transformedBottom - transformedTop,
                                value: "",
                                checked: false,
                                type: fieldType,
                            });

                            this.pdfFields.push(field);
                            console.log("Extracted field:", field); // Debugging statement
                        }
                    });
                }
            } catch (error) {
                console.error("Error extracting field positions:", error);
            }
        },
        getFieldsForPage(pageIndex) {
            return this.pdfFields.filter((field) => field.page === pageIndex + 1);
        },
        transformPdfFields() {
            this.pdfFields.forEach((field) => {
                const canvas = document.getElementById(`pdf-canvas-${field.page - 1}`);
                if (!canvas) return;
                const rect = canvas.getBoundingClientRect();
                const scaleX = rect.width / canvas.width;
                const scaleY = rect.height / canvas.height;

                field.transformedTop = field.top * scaleY;
                field.transformedLeft = field.left * scaleX;
                field.transformedWidth = field.width * scaleX;
                field.transformedHeight = field.height * scaleY;
                console.log("Transformed field:", field); // Debugging statement
            });
        },
        async onDrop(event, pageIndex) {
            event.preventDefault();
        },
        async onDropField(event, field) {
            if (field.type === 'PDFCheckBox') {
                console.log("Cannot drop text into a checkbox field.");
                return;
            }
            const text = event.dataTransfer.getData("text");
            console.log("Dropped text:", text); // Debugging statement
            if (field.type !== 'PDFCheckBox' && field) {
                field.value = text;
                console.log("Field updated:", field); // Debugging statement
            } else {
                console.error("Field not found for name:", field.name); // Debugging statement
            }
        },
        onDragStart(event, item) {
            console.log("Dragging item:", item); // Debugging statement
            event.dataTransfer.setData("text", item.title); // Set the title as the data
            event.dataTransfer.effectAllowed = "move";
        },
        updateFieldContent(field) {
            console.log("Field content updated:", field); // Debugging statement
            const item = this.items.find((i) => i.title === field.value);
            if (item) {
                item.content = field.value; // Update the item's content when the field value changes
            }
        },
        finishEditing(item) {
            item.isEditing = false;
            // Find the corresponding field and update its value
            const field = this.pdfFields.find((f) => f.value === item.title);
            if (field) {
                field.value = item.title;
                console.log("Field value updated on finish editing:", field); // Debugging statement
            }
        },
        addItem() {
            const newItem = {
                title: `Word${this.items.length + 1}`,
                isEditing: false,
                content: `Word${this.items.length + 1}`,
            };
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
        },
        async savePdf() {
            try {
                // Load the existing PDF into pdf-lib using the file
                const arrayBuffer = await this.pdfFile.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                const form = pdfDoc.getForm();

                // Debugging: Log all form fields
                const fields = form.getFields();
                fields.forEach((field) => {
                    const type = field.constructor.name;
                    const name = field.getName();
                    console.log(`Field name: ${name}, Field type: ${type}`);
                });

                // Update each field in the new PDF
                this.pdfFields.forEach((field) => {
                    const pdfField = form.getField(field.name);
                    if (pdfField) {
                        const fieldType = pdfField.constructor.name;
                        console.log(`Updating field: ${field.name}, Type: ${fieldType}, Value: ${field.value}`); // Debugging statement
                        if (fieldType === 'PDFTextField' || fieldType === 'PDFTextField2') {
                            pdfField.setText(field.value);
                        } else if (fieldType === 'PDFCheckBox') {
                            field.checked ? pdfField.check() : pdfField.uncheck();
                        } else if (fieldType === 'PDFRadioGroup') {
                            pdfField.select(field.value);
                        } else if (fieldType === 'PDFDropdown') {
                            pdfField.select(field.value);
                        } else if (fieldType === 'PDFOptionList') {
                            pdfField.select(field.value);
                        } else {
                            console.error(`Unhandled field type for field: ${field.name}, Type: ${fieldType}`);
                        }
                    } else {
                        console.error("PDF field not found for:", field.name);
                    }
                });

                // Save the updated PDF
                const newPdfBytes = await pdfDoc.save();
                const blob = new Blob([newPdfBytes], { type: "application/pdf" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "updated.pdf";
                link.click();
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error("Error saving PDF:", error);
            }
        },
    },
};
</script>
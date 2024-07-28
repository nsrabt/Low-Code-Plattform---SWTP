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
    <p>{{ curWorkflowRole.workflowRoleName }}</p>

    <div class="flex">
        <aside id="sidebar-multi-level-sidebar"
            class="fixed top-14 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <!-- Search bar -->
                <div class="mb-4">
                    <input type="text" v-model="searchQuery" class="p-2 w-full border rounded-md"
                        placeholder="Search...">
                </div>
                <button @click="openAddItemModal" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Item
                </button>
                <!-- Draggable Items -->

                <ul class="space-y-2 font-medium">
                    <li v-for="(item, index) in items.slice().reverse()" :key="index" class="draggable" draggable="true"
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
                            class="w-full h-full p-1 border border-gray-500 rounded" />
                    </div>
                </div>
            </div>
            <button @click="this.buttonPressed"
                class="fixed bottom-4 right-4 p-2 bg-green-500 text-white rounded hover:bg-green-700">
                {{ buttonValue }}
            </button>
        </div>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddItemModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 class="text-xl font-semibold mb-4">Add New Item</h2>
            <div class="mb-4">
                <label class="block text-gray-700">Name</label>
                <input v-model="newItem.name" type="text" class="p-2 w-full border rounded-md" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Type</label>
                <select v-model="newItem.type" class="p-2 w-full border rounded-md">
                    <option value="string">String</option>
                    <option value="date">Date</option>
                    <option value="boolean">Boolean</option>
                    <option value="photo">Photo</option>
                </select>
            </div>
            <div class="flex justify-end">
                <button @click="closeAddItemModal"
                    class="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
                <button @click="submitNewItem" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import "pdfjs-dist/build/pdf.worker.mjs";
import { PDFDocument } from "pdf-lib";
import { toRaw, reactive, ref } from "vue";
import axios from "axios";
import store from "@/store/store.js";
import { useStore } from "vuex";
import * as pdfjsLib from "pdfjs-dist";

// Specify the workerSrc path to the local copy
GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default {
    name: "Home",
    data() {
        return {
            items: reactive([]),
            searchQuery: "",
            pdfDoc: null,
            pdfFile: null,
            pdfFields: reactive([]),
            pdfPages: [],
            showDropDown: false,
            showSide: true,
            workflowElements: [],
            curWorkflowElement: null,
            workflowElementRoles: [],
            curWorkflowElementRole: null,
            buttonValue: '',
            curWorkflowRole: '',
            workflowId: null,
            showAddItemModal: false,
            newItem: {
                name: '',
                type: 'string'
            }
        };
    },
    watch: {
        searchQuery: function (newQuery) {
            if (newQuery === '') {
                this.showAll();
            } else {
                this.searchItems();
            }
        },
    },
    setup() {
        const store = useStore();
        return { store };
    },
    async mounted() {
        await this.loadWorkflowElements();
        await this.loadWorkflowRoles();
        await this.loadPdf(this.curWorkflowElement.data);
        await this.showAll();
        this.checkState();
        window.addEventListener("resize", this.transformPdfFields);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.transformPdfFields);
    },
    methods: {
        async searchItems() {
            try {
                if (this.searchQuery !== '') {
                    const response = await axios.get('http://localhost:3000/filling-data/search/' + this.searchQuery);
                    this.items = []
                    response.data.forEach(data => {
                        this.items.push({
                            title: data.name,
                            isEditing: false,
                            content: data.name,
                            dataID: data.id,
                            datatype: data.datatype
                        })
                    })
                }
            } catch (error) {
                console.error("Error searching items:", error);
            }
        },
        async showAll() {
            const response = await axios.get('http://localhost:3000/filling-data/all/' + 1);
            response.data.forEach(data => {
                this.items.push({
                    title: data.name,
                    isEditing: false,
                    content: data.name,
                    dataID: data.id,
                    datatype: data.datatype
                })
            })
        },
        async loadPdf(base64String) {
            try {
                // Decode base64 string into Uint8Array (optimized for large PDFs)
                const byteArray = atob(base64String);
                const uint8Array = new Uint8Array(byteArray.length);
                for (let i = 0; i < byteArray.length; i++) {
                    uint8Array[i] = byteArray.charCodeAt(i);
                }

                // Load PDF document directly from Uint8Array
                const loadingTask = getDocument({ data: uint8Array });
                this.pdfDoc = await loadingTask.promise;

                // Rest of the code remains the same for processing the PDF
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
                this.pdfFields = []

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
                                dataID: 0,
                                isFilled: false
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
            const text = event.dataTransfer.getData("text");
            const dataID = event.dataTransfer.getData('number');
            const datatypeFillingData = event.dataTransfer.getData('datatype');

            if (field.type === 'PDFCheckBox' && datatypeFillingData === 'boolean') {
                const booleanValue = text.toLowerCase() === 'true';
                field.checked = booleanValue;
                this.updateFieldContent(field);  // Update field content to reflect changes
                await this.assignFillingData(field, dataID);
                return;
            }

            console.log("Dropped text:", text); // Debugging statement
            if (field.type !== 'PDFCheckBox' && field) {
                field.value = text;
                await this.assignFillingData(field, dataID)
            } else {
                console.error("Field not found for name:", field.name); // Debugging statement
            }
        },
        onDragStart(event, item) {
            console.log("Dragging item:", item); // Debugging statement
            event.dataTransfer.setData("text", item.title); // Set the title as the data
            event.dataTransfer.setData("number", item.dataID); // Set the title as the data
            event.dataTransfer.setData("datatype", item.datatype); // Set the title as the data

            event.dataTransfer.effectAllowed = "move";
        },
        updateFieldContent(field) {
            console.log("Field content updated:", field); // Debugging statement
            const item = this.items.find((i) => i.title === field.value);
            if (field.type === 'PDFCheckBox') {
                field.checked = !field.checked;
            } else {
                if (item) {
                    item.content = field.value; // Update the item's content when the field value changes
                }
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
        async addItem() {
            const name = `Word${this.items.length + 1}`;
            const datatype = "datatype";

            const res = await axios.put('http://localhost:3000/filling-data', {
                platformID: 1,
                name: name,
                datatype: datatype,
                isPlatformInfo: true
            });

            const dataID = res.data.id;

            const newItem = {
                title: name,
                isEditing: false,
                content: name,
                dataID: dataID,
                datatype: datatype
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
        openAddItemModal() {
            this.showAddItemModal = true;
        },
        closeAddItemModal() {
            this.showAddItemModal = false;
            this.newItem.name = '';
            this.newItem.type = 'string';
        },
        async submitNewItem() {
            try {


                const res = await axios.put('http://localhost:3000/filling-data', {
                    platformID: 1,
                    name: this.newItem.name,
                    datatype: this.newItem.type,
                    isPlatformInfo: true
                });
              if(res.data){
                const dataID = res.data.id;

                const newItem = {
                  title: this.newItem.name,
                  isEditing: false,
                  content: this.newItem.name,
                  dataID: dataID,
                  datatype: this.newItem.type
                };

                this.items.push(newItem);
                this.closeAddItemModal();

              } else{
                //todo: error anzeige dass name schon existiet
              }
            } catch (error) {
                console.error("Error adding item:", error);
            }
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

        async assignFillingData(field, dataID) {
            console.log(field.value + "  dropped onto   " + field.name + "of type: " + field.type)
            const data = (await axios.get('http://localhost:3000/filling-data/' + dataID)).data;

            function isSameType(field, data) {
                if (field.type === 'text' && data.datatype === 'string') {
                    return true;
                }
                else if (field.type === 'text' && data.datatype === 'date') {
                    return true;
                }
                else if (field.type === 'PDFCheckBox' && data.datatype === 'checkbox') {
                    return true;
                }
                return false;
            }

            if (isSameType(field, data)) {
                //todo: put code here if the strings are compatible
            }

            const response = await axios.put('http://localhost:3000/workflow/field', {
                workflowElementID: this.curWorkflowElement.id,
                dataID: dataID,
                type: field.type,
                processRoleID: this.curWorkflowElementRole.id
            })
        },
        async loadWorkflowElements() {
            this.workflowId = store.getters.getWorkflow.id;
            console.log(this.workflowId)

            //set workflowElements & curWorkflowElement
            if (this.workflowElements.length === 0) {
                console.log('allSteps/' + this.workflowId);
                const res = await axios.get('http://localhost:3000/workflow/allSteps/' + this.workflowId);
                this.workflowElements = res.data;

                console.log(this.workflowElements.length);

                if (Array.isArray(this.workflowElements)) {
                    this.workflowElements.sort((a, b) => a.stepNumber - b.stepNumber);
                }
            }

            if (this.curWorkflowElement == null) {
                console.log("is null")
                this.curWorkflowElement = this.workflowElements[0];
            }
        },
        async loadWorkflowRoles() {
            //set workflow roles & curRole
            if (this.workflowElementRoles.length === 0) {
                console.log("getRoles of " + this.curWorkflowElement.id)
                const res = await axios.get('http://localhost:3000/workflow/rolesOfWorkflowElement/' + this.curWorkflowElement.id);
                this.workflowElementRoles = res.data
                if (Array.isArray(this.workflowElementRoles)) {
                    this.workflowElementRoles.sort((a, b) => a.position - b.position);
                }
                res.data.forEach(elem => { console.log(elem) })

                console.log("got roles")
                if (this.curWorkflowElementRole == null) {
                    this.curWorkflowElementRole = this.workflowElementRoles[0];

                    this.curWorkflowRole = (await axios.get('http://localhost:3000/workflow/role/' + this.curWorkflowElementRole.workflowRoleID)).data;
                }
            }
        },
        checkState() {
            console.log("check")
            for (const role of this.workflowElementRoles) {
                console.log("role " + role.id)
            }
            const lastIndex = this.workflowElementRoles.length - 1;
            //If current role is last role

            if (this.curWorkflowElementRole === this.workflowElementRoles[lastIndex]) {
                const lastWorkflowElementIndex = this.workflowElements.length - 1;
                //Wenn auch letztes workflowElement
                if (this.curWorkflowElement === this.workflowElements[lastWorkflowElementIndex]) {
                    this.buttonValue = 'Save';
                }
                else {
                    this.buttonValue = 'Next workflow-element';
                }
            }
            else {
                this.buttonValue = 'Next role';
            }
        },

        async buttonPressed() {
            let lastIndex;
            switch (this.buttonValue) {
                case 'Save':
                    await this.savePdf();
                    break;
                case 'Next role':
                    lastIndex = this.workflowElementRoles.indexOf(this.curWorkflowElementRole);
                    await this.nextRole(lastIndex)
                    break;
                case 'Next workflow-element':
                    //speichern
                    lastIndex = this.workflowElements.indexOf(this.curWorkflowElement);
                    await this.nextWorkflowElement(lastIndex)

                    break;
            }
        },
        async nextWorkflowElement(lastIndex) {
            this.curWorkflowElement = this.workflowElements[lastIndex + 1];
            console.log(this.curWorkflowElement.id)
            await this.loadPdf(this.curWorkflowElement.data);

            this.workflowElementRoles = [];
            await this.loadWorkflowRoles()
            lastIndex = this.workflowElementRoles.indexOf(this.curWorkflowElementRole);
            await this.nextRole(lastIndex)

            this.checkState();
        },
        async nextRole(lastIndex) {
            this.curWorkflowElementRole = this.workflowElementRoles[lastIndex + 1];
            this.curWorkflowRole = (await axios.get('http://localhost:3000/workflow/role/' + this.curWorkflowElementRole.workflowRoleID)).data;
            console.log("name " + this.curWorkflowRole.workflowRoleName)
            //todo: alle felder rot markieren welche schon zugewiesen wurden
            this.checkState();
        }
    }
};
</script>

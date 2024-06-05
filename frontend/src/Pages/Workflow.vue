<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="40"
          viewBox="0,0,255.99889,255.99889"
        >
          <g
            fill="#FFFFFF"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(3.55556,3.55556)">
              <path
                d="M25,11c-4.971,0 -9,4.029 -9,9v32c0,4.971 4.029,9 9,9h22c4.971,0 9,-4.029 9,-9v-21h-14c-3.314,0 -6,-2.686 -6,-6v-14zM40,11.34375v13.65625c0,1.105 0.896,2 2,2h13.65625zM29,38h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2zM29,47h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2z"
              ></path>
            </g>
          </g>
        </svg>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Low-Code</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              Menu
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownNavbar"
              class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Sign out</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="categories-container">
    <div
      v-for="category in categories"
      :key="category.id"
      @drop="onDrop($event, category.id)"
      class="droppable category"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="item in items.filter((x) => x.categoryId === category.id)"
        :key="item.id"
        @dragstart="onDragStart($event, item)"
        class="draggable rounded-xl"
        draggable="true"
      >
        <input
          v-model="item.title"
          @blur="updateItem(item)"
          class="item-title-input"
        />
        <button class="edit-button" @click="openEditModal(item)">Edit</button>
      </div>
    </div>
  </div>

  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <h3>Edit Item</h3>
      <label for="item-title">Title:</label>
      <input id="item-title" v-model="currentItem.title" />
      <!-- Add more fields as needed -->
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="saveItem">Save</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="closeEditModal">Cancel</button>
    </div>
  </div>
    <div class="controls rounded-xl bg-white border-gray-200 dark:bg-white dark:border-gray-500">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="createCategory"> + Create Category</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="createItem">+ Create Item</button>
    
    
  </div>
  
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const items = ref([
      {
        id: 0,
        title: 'Audi',
        categoryId: 0
      },
      {
        id: 1,
        title: 'BMW',
        categoryId: 0
      },
      {
        id: 2,
        title: 'Cat',
        categoryId: 1
      }
    ])
    const categories = ref([
      {
        id: 0,
        title: 'Test'
      },
      {
        id: 1,
        title: 'Test'
      }
    ])

    const isEditModalOpen = ref(false)
    const currentItem = ref(null)

    function createCategory() {
      const newId = categories.value.length
      categories.value.push({
        id: newId,
        title: `Category ${newId + 1}`
      })
    }

    function createItem() {
      const newId = items.value.length
      items.value.push({
        id: newId,
        title: `Item ${newId + 1}`,
        categoryId: 0
      })
    }

    function updateItem(updatedItem) {
      const index = items.value.findIndex(item => item.id === updatedItem.id)
      if (index !== -1) {
        items.value[index] = { ...updatedItem }
      }
    }

    function onDragStart(e: DragEvent, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }

    function onDrop(e: DragEvent, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      items.value = items.value.map((x) => {
        if (x.id == itemId) x.categoryId = categoryId
        return x
      })
    }

    function openEditModal(item) {
      currentItem.value = { ...item }
      isEditModalOpen.value = true
    }

    function closeEditModal() {
      isEditModalOpen.value = false
      currentItem.value = null
    }

    function saveItem() {
      if (currentItem.value) {
        updateItem(currentItem.value)
        closeEditModal()
      }
    }

    return {
      items,
      categories,
      isEditModalOpen,
      currentItem,
      onDragStart,
      onDrop,
      createCategory,
      createItem,
      updateItem,
      openEditModal,
      closeEditModal,
      saveItem
    }
  }
}
</script>

<style scoped>
.controls {
  margin: 20px;
  display: flex;
  gap: 10px;
}

.categories-container {
  display: flex;
  flex-direction: row;
  gap: 10px; /* Adjust the gap between categories as needed */
}

.droppable {
  padding: 15px;
  background: #2c3e50;
  margin-bottom: 10px;
  flex: 1; /* Adjust this to control the width of each category */
}

.droppable h4 {
  display: none; /* Hide category titles */
}

.draggable {
  background: white;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.draggable input.item-title-input {
  border: none;
  background: transparent;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
}

.draggable input.item-title-input:focus {
  outline: none;
  border-bottom: 1px solid #000;
}

.edit-button {
  margin-left: 10px;
  background: #3490dc;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}

.edit-button:hover {
  background: #2779bd;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  margin-right: 10px;
}
</style>



<!-- <template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40" viewBox="0,0,255.99889,255.99889">
            <g fill="#FFFFFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(3.55556,3.55556)">
                <path d="M25,11c-4.971,0 -9,4.029 -9,9v32c0,4.971 4.029,9 9,9h22c4.971,0 9,-4.029 9,-9v-21h-14c-3.314,0 -6,-2.686 -6,-6v-14zM40,11.34375v13.65625c0,1.105 0.896,2 2,2h13.65625zM29,38h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2zM29,47h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2z"></path>
              </g>
            </g>
          </svg>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Low-Code</span>
        </a>
        <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
            </li>
            <li>
              <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Menu
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                </ul>
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mx-auto mt-4">
      <div id="pdfCanvas" class="border border-gray-200 w-full h-96 relative"></div>
      <div id="placeholder" draggable="true" class="w-24 h-10 border-2 border-dashed border-gray-500 bg-gray-100 flex items-center justify-center cursor-move">Text Here</div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, rgb } from 'pdf-lib';

export default {
  mounted() {
    const pdfCanvas = document.getElementById('pdfCanvas');
    const placeholder = document.getElementById('placeholder');

    
    placeholder.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', 'placeholder');
    });

    
    pdfCanvas.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

   
    pdfCanvas.addEventListener('drop', (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      if (data === 'placeholder') {
        const newPlaceholder = placeholder.cloneNode(true);
        newPlaceholder.style.left = `${event.clientX - pdfCanvas.offsetLeft}px`;
        newPlaceholder.style.top = `${event.clientY - pdfCanvas.offsetTop}px`;
        newPlaceholder.classList.add('absolute');
        pdfCanvas.appendChild(newPlaceholder);
      }
    });

const loadPdf = async () => {
  const url = '/pdfs/example.pdf'; 
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const page = pdfDoc.getPage(0);
  const scale = 1.5; 
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  pdfCanvas.appendChild(canvas); 

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext).promise;
};

   
    loadPdf('Pages/test.pdf');
  }
}
</script>

<style scoped>
#pdfCanvas {
  position: relative;
}

.placeholder {
  position: absolute;
}
</style> -->
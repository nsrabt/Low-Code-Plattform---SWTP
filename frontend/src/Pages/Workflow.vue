<template>
  <div class="min-h-screen bg-cover bg-center" style="background-image: url('/bg.jpg')">
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40"
            viewBox="0,0,255.99889,255.99889">
            <g fill="#FFFFFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
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


    <div>
      <div class="object-container bg-gray-900 p-4 shadow-md">
        <h2 class="text-lg text-white font-semibold mb-4">Available Objects</h2>
        <div class="controls mb-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="openObjectModal">Role hinzufügen</button>
        </div>
        <div v-for="object in objects" :key="object.id"
          class="draggable object-item bg-white p-3 mb-2 rounded-lg shadow-sm"
          @dragstart="onDragStartObject($event, object)" draggable="true">
          {{ object.roleName }} - {{ platformRoles.find(role => role.id === object.id).roleName }}
        </div>
      </div>


      <div v-for="(workflow, workflowIndex) in workflows" :key="workflowIndex" class="workflow-container">
        <div class="categories-container">
          <div v-for="category in workflow.categories" :key="category.id"
            @drop="onDrop($event, category.id, workflowIndex)" class="droppable category" @dragover.prevent
            @dragenter.prevent>
            <div v-for="item in workflow.items.filter((x) => x.categoryId === category.id)" :key="item.id"
              @dragstart="onDragStart($event, item, workflowIndex)"  class="draggable rounded-xl" draggable="true"
              :data-workflowElement-id="item.id">
              <input v-model="item.title" @blur="updateItem(item, workflowIndex)" class="item-title-input" />
              <div v-for="obj in item.objects" :key="obj.id">{{ obj.roleName }} - {{ obj.id }}</div>
              <button class="edit-button" @click="openEditModal(item, workflowIndex)">Bearbeiten</button>
              <button class="delete-button" @click="deleteItem(workflowIndex, item.id)">Löschen</button>
            </div>
          </div>
        </div>
        <div class="controls rounded-xl bg-white border-gray-200 dark:bg-white dark:border-gray-500">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="createItem(workflowIndex)">Add workflow-element</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="createCategory(workflowIndex)"> Add workflow-workflowElement </button>
        </div>
        <div class="save-button-container my-4">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  @click="checkWorkflows(workflowIndex)">Speichern</button>
        </div>
      </div>

      <div v-if="isEditModalOpen" class="modal" >
        <div class="modal-content">
          <h3>Schritt bearbeiten</h3>
          <label for="item-title">Name: </label>
          <input id="item-title" v-model="currentItem.title" />

          <h2><strong>Roles:</strong></h2>

          <div v-for="(obj, index) in currentItem.objects" :key="index">
            <ul>
              <li>
                {{ obj.roleName }}
              </li>
            </ul>
          </div>

          <input id="pdf-id" type="file" accept="application/pdf" @change="handleFileUpload">


          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="saveItem">Save</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="closeEditModal">Cancel</button>
        </div>
      </div>

      <div v-if="isObjectModalOpen" class="modal">
        <div class="modal-content">
          <h3>Add Object</h3>
          <label for="object-role">Role:</label>
          <input id="object-role" v-model="newObject.roleName" />
          <label for="object-id">ID:</label>
          <select name="PlatformRole" id="object-id" v-model="newObject.id">
            <option v-for="role in platformRoles" :key="role.id" :value="role.id">{{ role.roleName }}</option>
          </select>
          <div>
            <label for="isSelectable">is selectable? </label>
            <input v-model="newObject.selectable" type="checkbox" id="isSelectable" name="isSelectable">
          </div>
          <div>
            <label for="isApplicant">is applicant? </label>
            <input v-model="newObject.applicant" type="checkbox" id="isApplicant" name="isApplicant">
          </div>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="addObject">Add</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="closeObjectModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {nextTick, onMounted, ref} from 'vue';
import axios from 'axios';
import "vue-router/dist/vue-router";
import {useRoute} from "vue-router";


export default {
  setup() {
    const route = useRoute();
    const workflowID = ref(null);

    onMounted(async () => {
      if (route.name === "EditWorkflow") {
        workflowID.value = route.params.id;
        await loadWorkflowData();
      } else {
        console.log("new!");
        try {
          const response = await axios.post('http://localhost:3000/workflow/createWorkflow', {
            title: "test",
            description: "description",
            isOpen: true,
            platform_id: 1
          });
          console.log("response.data.id", response.data.id);
          workflowID.value = response.data.id;
          console.log('Workflow created:', workflowID.value);
        } catch (error) {
          console.error('Error creating workflow:', error);
        }
      }
    });


const workflows = ref([
      {
        id: 0,
        categories: [],
        items: [],
        step_id: 0
      }
    ]);


    const objects = ref([]);
    const currentItem = ref()
    const isEditModalOpen = ref(false);
    const isObjectModalOpen = ref(false);
    const currentWorkflowIndex = ref(null);
    const newObject = ref({ roleName: '', roleID:1, id: null, applicant: false, selectable: false });
    const selectedRole = ref(null);
    const showDropDown = ref(false);
    const showSide = ref(true);
    const platformRoles = ref([]); // Example values


    async function loadWorkflowData() {
      try {
        if (!workflowID.value) {
          console.error('Error: Workflow ID is not defined.');
        } else {
          const response = await axios.get(`http://localhost:3000/workflow/allSteps/${workflowID.value}`);
          console.log('Steps loaded for Workflow ID:', workflowID.value);

          console.log(response.data);
          const allSteps = response.data.map(workflowElement => ({
            id: workflowElement.id,
            title: workflowElement.title,
            document: workflowElement.data,
            step_number: workflowElement.stepNumber,
            role_ids: workflowElement.role_ids || []
          }));
          console.log("all", allSteps);
          const maxStepNumber = Math.max(...allSteps.map(workflowElement => workflowElement.step_number));
          for (let i = 1; i <= maxStepNumber; i++) {
            createCategory(0);
          }
          let newIndex = 0;
          for (const workflowElement of allSteps) {
            workflows.value[0].items.push({
              id: newIndex,
              title: workflowElement.title,
              categoryId: workflowElement.step_number - 1,
              pdf: workflowElement.data,
              objects: [],
              workflowId: 0,
              step_id: workflowElement.id
            });
            newIndex++;
          }
        }
      } catch (error) {
        console.error('Error creating or loading workflow:', error);
      }
    }
    //onMounted(() => {
    //  loadWorkflowData();
    //});

    function toggleSideBar() {
      showSide.value = !showSide.value;
    }

    function toggleDrop() {
      showDropDown.value = !showDropDown.value;
    }

    function createCategory(workflowIndex) {
      const newId = workflows.value[workflowIndex].categories.length;
      workflows.value[workflowIndex].categories.push({
        id: newId,
        title: `Category ${newId + 1}`
      });

      workflows.value.forEach(() => { });
    }

    async function createItem(workflowIndex) {
      if (workflows.value[workflowIndex].categories.length === 0) {
        alert("Es muss mindestens eine workflow erstellt werden, bevor ein workflow-Element hinzugefügt werden kann.");
        return;
      }
      const newId = workflows.value[workflowIndex].items.length > 0
        ? Math.max(...workflows.value[workflowIndex].items.map(item => item.id)) + 1
        : 0;
      console.log("newID", newId);
      const stepData = {
        process_id: workflowID.value,
        title: `WorkflowElement ${newId + 1}`,
        document: "null",
        step_number: 1,
      };
      console.log(stepData);
      try {
        console.log(workflowID.value);
        const response = await axios.post('http://localhost:3000/workflow/addStep', stepData);
        workflows.value[workflowIndex].items.push({
          id: newId,
          title: `WorkflowElement ${newId + 1}`,
          categoryId: 0,
          pdf: '',
          objects: [],
          workflowId: workflowIndex,
          step_id: response.data.id
        });
      } catch (error) {
        console.error('Error adding workflowElement:', error);
      }
    }

    async function updateItem(updatedItem, workflowIndex) {
      const index = workflows.value[workflowIndex].items.findIndex(item => item.id === updatedItem.id);
      //workflows.value[workflowIndex].items[index] = currentItem.value;
      if (index !== -1) {
        workflows.value[workflowIndex].items[index] = { ...updatedItem };
        const updateStepDto = {
          id: updatedItem.step_id,
          title: updatedItem.title,
          data: updatedItem.pdf
        };
        try {
          const response = await axios.post(`http://localhost:3000/workflow/updateStep`, updateStepDto);
          console.log('Step updated successfully:', response.data);
        } catch (error) {
          console.error('Error updating workflowElement:', error);
        }
      }
    }

    async function deleteItem(workflowIndex, itemId) {
      const itemIndex = workflows.value[workflowIndex].items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const stepId = workflows.value[workflowIndex].items[itemIndex].step_id;
        const response = await axios.post(`http://localhost:3000/workflow/deleteStep/${stepId}`);
        console.log("stepId", stepId);
        workflows.value[workflowIndex].items.splice(itemIndex, 1);
      }
    }

    function onDragStart(e: DragEvent, item, workflowIndex) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('itemId', item.id.toString());
      e.dataTransfer.setData('workflowId', workflowIndex.toString());
    }

    function onDragStartObject(e: DragEvent, object) {
      e.dataTransfer.effectAllowed = 'copy';
      console.log("drag start "+object.roleID)
      e.dataTransfer.setData('objectId', object.roleID.toString());
    }

    function countItemsInCategory(workflowIndex, categoryId) {
      return workflows.value[workflowIndex].items.filter(item => item.categoryId === categoryId).length;
    }

    function onDrop(e: DragEvent, categoryId, workflowIndex) {

      const itemId = parseInt(e.dataTransfer.getData('itemId'));
      const sourceWorkflowIndex = parseInt(e.dataTransfer.getData('workflowId'));

      if (isNaN(itemId)) {
        const objectId = parseInt(e.dataTransfer.getData('objectId'));
        const object = objects.value.find(obj => obj.roleID === objectId);
        console.log("object id:" +objectId);
        if (object) {
          const newObject = { ...object };
          const itemIndex = workflows.value[workflowIndex].items.findIndex(item => item.categoryId === categoryId);
          if (itemIndex !== -1) {
            const targetElement = e.target as HTMLElement;
            const stepId = targetElement.closest('.draggable').getAttribute('data-workflowElement-id');
            console.log(stepId);
            const workflowElement = workflows.value[workflowIndex].items.find(item => item.id == stepId);
            if (workflowElement) {
              if (workflowElement.objects.some(obj => obj.roleID === object.roleID)) {
                alert("Dieses Objekt wurde bereits diesem Workflow-Element hinzugefügt.");
                return;
              }
              workflowElement.objects.push(newObject);
              console.log("new Object "+newObject.roleID)

              const response=axios.post('http://localhost:3000/workflow/assignRole',{
                step_id:workflowElement.id,
                process_role_id: newObject.roleID
              })


            }
          }
        }
      } else {
        if (sourceWorkflowIndex !== workflowIndex) {
          return; // Prevent moving items between different workflows
        }

        const itemIndex = workflows.value[workflowIndex].items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const oldStepNumber = workflows.value[workflowIndex].items[itemIndex].categoryId + 1;
          const newStepNumber = categoryId + 1;
          console.log("Verschieben von Kategorie", oldStepNumber, "nach", newStepNumber);
          const stepId = workflows.value[workflowIndex].items[itemIndex].step_id;
          if (newStepNumber !== oldStepNumber) {
            changeStepOrder(stepId, newStepNumber);
          }
          workflows.value[workflowIndex].items[itemIndex].categoryId = categoryId;
        }
      }
    }

    function openEditModal(item, workflowIndex) {
      console.log("editing");
      currentItem.value = { ...item };
      currentWorkflowIndex.value = workflowIndex;
      isEditModalOpen.value = true;

      nextTick(() => {
        const pdf = document.getElementById("pdf-id");
        if (pdf) {
          pdf.value = '';
        }
      });
    }

    function closeEditModal() {
      isEditModalOpen.value = false;
      currentItem.value = null;
      currentWorkflowIndex.value = null;
    }

    function saveItem(event) {
      if (currentItem.value && currentWorkflowIndex.value !== null) {
        // readPDF
        const pdfInput = document.getElementById('pdf-id') as HTMLInputElement;
        const file = pdfInput?.files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const result = e.target?.result;

            if (typeof result === 'string') {
              const pdf = result.split(',')[1]; // Verwende 'split' auf dem string
              currentItem.value.pdf = pdf;


              console.log('Base64 String: ', currentItem.value.pdf);
            } else {
              console.error('FileReader result is not a string');
            }
            // Update the item and close the modal only after reading the file
            updateItem(currentItem.value, currentWorkflowIndex.value);
            closeEditModal();
          };

          reader.readAsDataURL(file);
        } else {
          // Update the item and close the modal if no file is selected
          updateItem(currentItem.value, currentWorkflowIndex.value);
          closeEditModal();
        }
      }
    }

    async function openObjectModal() {
      console.log("opeeeen");
      const response = await axios.get('http://localhost:3000/role/allRoles/' + 1); // 1=THM
      const data = response.data;
      if (data) {
        this.platformRoles = data;
      } else {
        console.error("Failed to load roles");
      }

      isObjectModalOpen.value = true;
    }

    function closeObjectModal() {
      isObjectModalOpen.value = false;
    }

    function addObject() {

      // Check if the custom ID already exists in the objects list
      if (!newObject.value.roleName || newObject.value.id === null || newObject.value.id === '') {
        alert("Bitte stelle sicher, dass alle Felder ausgefüllt sind, bevor du das Objekt hinzufügst.");
        return; // Verhindert das Hinzufügen, wenn nicht alle Felder gesetzt sind
      }
      if (objects.value.some(obj => obj.roleName.toLowerCase() === newObject.value.roleName.toLowerCase())) {
        alert("dieser Rollenname existiert bereits. Bitte wähle einen anderen Namen.");
        return;
      }

      if (newObject.value.applicant && newObject.value.selectable) {
        alert("Entweder 'Applicant' oder 'Selectable' kann gesetzt werden, aber nicht beide.");
        return;
      }
      if (newObject.value.applicant && objects.value.some(obj => obj.applicant)) {
        alert("Es kann nur einen 'Applicant' geben. Bitte wähle einen anderen Status für dieses Objekt.");
        return;
      }
      objects.value.push({ ...newObject.value });
      saveRoleInDatabase(newObject.value.roleName, newObject.value.id, newObject.value.selectable, newObject.value.applicant);

      newObject.value = { roleName: '',roleID:newObject.value.roleID+1, id: null, applicant: false, selectable: false };
      closeObjectModal();
    }

    async function saveRoleInDatabase(rolename: string, roleID: number, selectable: boolean, applicant: boolean) {
      const response = await axios.post('http://localhost:3000/workflow/addRole', {
        processID: workflowID.value,
        roleID: roleID,
        process_role_name: rolename,
        selectable: selectable,
        isApplicant: applicant
      });
      if (response) {
        console.log(response.data.process_role_name);
      }
    }

   function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {

        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("bevor", currentItem.value.pdf);
          currentItem.value.pdf = e.target.result;
          console.log("after", currentItem.value.pdf);
        };
        reader.readAsDataURL(file);
      }
    }




    async function changeStepOrder(stepId, stepNumber) {
      try {
        const response = await axios.post('http://localhost:3000/workflow/changeOrder', {
          stepID: stepId,
          stepNumber: stepNumber
        });
        console.log('Order changed:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error changing order:', error);
        return null;
      }
    }


    async function addStepAPI(process_id, title, document, step_number, role_ids, pdfBytes) {
      try {
        const response = await axios.post('http://localhost:3000/workflow/addStep', {
          process_id,
          title,
          document: pdfBytes,
          step_number,
          role_ids
        });
        console.log('Step added:', response.data);
      } catch (error) {
        console.error('Error adding workflowElement:', error);
      }
    }
    function checkWorkflows(workflowIndex) {

      const workflow = this.workflows[workflowIndex];
      if (workflow.categories.length === 0 || workflow.items.length === 0) {
        alert("Jeder Workflow muss mindestens eine Kategorie enthalten.");
        return;
      }

      const categoryIds = workflow.items.map(item => item.categoryId).sort((a, b) => a - b);
      let expectedCategoryId = 0;
      for (let i = 0; i < categoryIds.length; i++) {
        if (categoryIds[i] !== expectedCategoryId) {
          alert(`Inkonsistente Kategorie-Reihenfolge: Es wird erwartet, dass die Kategorie mit ID ${expectedCategoryId} existiert, gefunden wurde aber ID ${categoryIds[i]}.`);
          return;
        }
        if (i < categoryIds.length - 1 && categoryIds[i] !== categoryIds[i + 1]) {
          expectedCategoryId++;
        }
      }
      console.log("workflow: check",workflow);
      let allValuesSet = true;
      let pdfMissing = false;
      let objectsMissing = false;
      let applicantFound = false;
      for (const category of workflow.categories) {
        for (const item of workflow.items.filter(x => x.categoryId === category.id)) {
          console.log("pdfLink", item.pdf);
          if (!item.title || !item.pdf) {
            allValuesSet = false;
            if (!item.pdf) {
              pdfMissing = true;
            }
          }
          if (item.objects.length === 0) {
            objectsMissing = true;
          }
          if (item.objects.some(obj => obj.applicant)) {
            applicantFound = true;
          }
        }
        if (!allValuesSet) break;
      }

      if (!allValuesSet) {
        if (pdfMissing) {
          alert("Alle Workflow-Elemente benötigen einen PDF-Link. Bitte laden sie fehlende PDF's hoch.");
        }
        if (objectsMissing) {
          alert("Jedes Workflowelement muss mindestens eine Rolle haben");
        } else {
          alert("Bitte stelle sicher, dass alle Felder ausgefüllt sind, bevor du speicherst.");
        }
      } else if (!applicantFound) { // Überprüfung, ob ein Applicant vorhanden ist
        alert("Mindestens ein Objekt muss als 'Applicant' markiert sein.");
      } else {
        alert("Alle Werte sind korrekt gesetzt und mindestens eine Kategorie ist vorhanden. Daten werden gespeichert...");
        // Logik zum Speichern der Daten könnte hier platziert werden
      }
    }

    return {
      workflows,
      objects,
      isEditModalOpen,
      isObjectModalOpen,
      currentItem,
      currentWorkflowIndex,
      newObject,
      showDropDown,
      showSide,
      onDragStart,
      onDragStartObject,
      onDrop,
      createCategory,
      createItem,
      updateItem,
      deleteItem,
      openEditModal,
      closeEditModal,
      saveItem,
      openObjectModal,
      closeObjectModal,
      addObject,
      toggleSideBar,
      toggleDrop,
      checkWorkflows,
      handleFileUpload,
      platformRoles,
      selectedRole
    };
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
  gap: 10px;
  /* Adjust the gap between categories as needed */
}

.droppable {
  padding: 15px;
  background: #2c3e50;
  margin-bottom: 10px;
  flex: 1;
  /* Adjust this to control the width of each category */
}

.droppable h4 {
  display: none;
  /* Hide category titles */
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

.delete-button {
  margin-left: 10px;
  background: #e3342f;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}

.delete-button:hover {
  background: #cc1f1a;
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
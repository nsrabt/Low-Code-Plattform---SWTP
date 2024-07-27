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
    <!-- Workflow Creation Modal -->
    <div v-if="showWorkflowModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 class="text-xl font-semibold mb-4">Create New Workflow</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Workflow Name</label>
          <input v-model="newWorkflow.name" type="text" class="p-2 w-full border rounded-md" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Is Open</label>
          <input v-model="newWorkflow.isOpen" type="checkbox" class="p-2 border rounded-md" />
        </div>
        <div class="flex justify-end">
          <button @click="closeWorkflowModal" class="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel
          </button>
          <button @click="submitNewWorkflow"
            class="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create</button>
        </div>
      </div>
    </div>

    <div>
      <div class="object-container bg-gray-900 p-4 shadow-md">
        <h2 class="text-lg text-white font-semibold mb-4">Available Roles</h2>
        <div class="controls mb-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="openObjectModal">Role hinzufügen</button>
        </div>
        <div v-for="object in this.objects" :key="object.id"
          class="draggable object-item bg-white p-3 mb-2 rounded-lg shadow-sm"
          @dragstart="onDragStartObject($event, object)" draggable="true">
          {{ object.roleName }}
        </div>
      </div>


      <div v-for="(workflow, workflowIndex) in workflows" :key="workflowIndex" class="workflow-container">
        <div class="categories-container">
          <div v-for="category in workflow.categories" :key="category.id"
            @drop="onDrop($event, category.id, workflowIndex)" class="droppable category" @dragover.prevent
            @dragenter.prevent>
            <div v-for="item in workflow.items.filter((x) => x.categoryId === category.id)" :key="item.id"
              @dragstart="onDragStart($event, item, workflowIndex)" class="draggable rounded-xl" draggable="true"
              :data-workflowElement-id="item.id">
              <input v-model="item.title" @blur="updateItem(item, workflowIndex)" class="item-title-input" />
              <div v-for="obj in item.objects" :key="obj.id">{{ obj.roleName }}}</div>
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
            @click="checkWorkflows(0)">Speichern</button>
        </div>
      </div>

      <div v-if="isEditModalOpen" class="modal">
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
    <NotificationBox v-if="notificationVisible" :message="notificationMessage" :duration="notificationDuration" />
  </div>
</template>

<script>
import {nextTick, ref} from 'vue';
import axios, {formToJSON} from 'axios';
import "vue-router/dist/vue-router";
import {useRoute} from "vue-router";
import NotificationBox from "@/Pages/NotificationBox.vue";
import {useStore} from "vuex";
import store from "@/store/store.js";


export default {
  name:'workflow-manager',
  components: {NotificationBox},

  data(){
    return{
      route:null,
      workflows : [{id: 0, categories: [], items: [], step_id: 0}],
       curWorkflow : null,
       objects : [],
       currentItem : null,
       isEditModalOpen : false,
       isObjectModalOpen : false,
       currentWorkflowIndex : ref(null),
       newObject : ref({ roleName: '', roleID:1, id: null, applicant: false, selectable: false }),
       selectedRole : ref(null),
       showDropDown : ref(false),
       showSide : ref(true),
       platformRoles : ref([]), // Example values
        newIndex:0,
       notificationVisible : ref(false),
       notificationMessage : ref(''),
       notificationDuration : ref(5000),
    };

  },
  async mounted() {
    const route = useRoute();
    const workflowID = ref(null);

    const store = useStore();

    if (route.name === "EditWorkflow") {
          this.workflowID = route.params.id;
          await this.loadWorkflowData();
        } else {
      console.log("new!");
      this.showWorkflowModal = true;
          try {
            const response = await axios.post('http://localhost:3000/workflow/createWorkflow', {
              title: "test",
              description: "description",
              isOpen: true,
              platform_id: 1
            });
            console.log("response.data.id", response.data.id);
            this.workflowID = response.data.id;
            this.curWorkflow = response.data;
            console.log('Workflow created:', workflowID);
          } catch (error) {
            console.error('Error creating workflow:', error);
          }
        }
    },

  methods:{




    async loadWorkflowData() {
      try {


        if (!this.workflowID) {
          console.error('Error: Workflow ID is not defined.');
          return; // Exit if no workflow ID
        }

        try {
          console.log("workflowID: "+this.workflowID)
         this.curWorkflow = (await axios.get('http://localhost:3000/workflow/workflow/' + this.workflowID)).data;
        } catch (e) {
          this.showNotification("Workflow nicht gefunden");
          this.$router.push('/home');
          return;
        }

        store.commit('setWorkflow',this.curWorkflow)

        const platformRolesResponse = await axios.get('http://localhost:3000/role/allRoles/' + 1); // 1=THM
        const data = platformRolesResponse.data;
        if (data) {
          this.platformRoles = data;
        } else {
          console.error("Failed to load roles");
        }

        const response = await axios.get(`http://localhost:3000/workflow/allSteps/${this.workflowID}`);
        const allRoles = await axios.get('http://localhost:3000/workflow/allRoles/' + this.workflowID);

        console.log('Steps loaded for Workflow ID:', this.workflowID);

        this.newIndex = 0;
        console.log(response.data);
        const allSteps = response.data.map(workflowElement => ({
          id: this.newIndex++,
          title: workflowElement.title,
          document: workflowElement.data,
          step_number: workflowElement.stepNumber,
          role_ids: workflowElement.role_ids || [],
          step_id: workflowElement.id
        }));

        this.newIndex = 0;
        for (const workflowElement of allSteps) {
          this.workflows[0].items.push({
            id: this.newIndex++,
            title: workflowElement.title,
            categoryId: workflowElement.step_number - 1,
            pdf: workflowElement.document,
            objects: [],
            workflowId: 0,
            step_id: workflowElement.step_id
          });
        }
        console.log(this.workflows[0].items.length)


        for (const role of allRoles.data) {
          console.log("pushing \n" + role.workflowRoleName + "\n" + role.roleID + "\n" + role.id + "\n" + role.isApplicant + "\n" + role.selectable + "\n" + role.id);

          this.objects.push({
            roleName: role.workflowRoleName,
            roleID: role.roleID,
            id: role.id,
            applicant: role.isApplicant,
            selectable: role.selectable,
            workflowRoleID: role.id
          });
          console.log("workflowRoleID: "+role.id)

        }


        const maxStepNumber = Math.max(...allSteps.map(workflowElement => workflowElement.step_number));
        for (let i = 1; i <= maxStepNumber; i++) {
          this.createCategory(0);
        }




        // Load workflow-element-roles
        for (const item of this.workflows[0].items) {
          const roles = await axios.get('http://localhost:3000/workflow/rolesOfWorkflowElement/' + item.step_id);
          console.log("going through workflowElement: "+item.step_id)
          console.log("length "+roles.data.length)
          for (const role of roles.data) {
            console.log("load workflowRole: "+role.workflowRoleID)
            const workflowRole = this.objects.find(obj => obj.workflowRoleID === role.workflowRoleID);
            console.log("workflowElement:"+ item.step_id +" => "+ workflowRole.roleName)
            item.objects.push(workflowRole)
          }
        }

      } catch (error) {
        console.error('Error creating or loading workflow:', error);
      }
    },
    //onMounted(() => {
    //  loadWorkflowData();
    //});

     toggleSideBar() {
       this.showSide = !this.showSide;
    },

     toggleDrop() {
       this.showDropDown = !this.showDropDown;
    },

     createCategory(workflowIndex) {
      const newId = this.workflows[workflowIndex].categories.length;
       this.workflows[workflowIndex].categories.push({
        id: newId,
        title: `Category ${newId + 1}`
      });

       this.workflows.forEach(() => { });
    },
    closeWorkflowModal() {
      this.showWorkflowModal = false;
    },
    async submitNewWorkflow() {
      try {
        const response = await axios.post('http://localhost:3000/workflow/createWorkflow', {
          title: this.newWorkflow.name,
          description: "description", // You might want to make this dynamic as well
          isOpen: this.newWorkflow.isOpen,
          platform_id: 1
        });
        console.log("response.data.id", response.data.id);
        this.workflowID = response.data.id;
        this.curWorkflow = response.data;
        this.showWorkflowModal = false; // Close the modal after creation
        console.log('Workflow created:', this.workflowID);
      } catch (error) {
        console.error('Error creating workflow:', error);
      }
    },
    async  createItem(workflowIndex) {
      if (this.workflows[workflowIndex].categories.length === 0) {
        this.showNotification("Es muss mindestens eine workflow erstellt werden, bevor ein workflow-Element hinzugefügt werden kann.");
        return;
      }
      const newId = this.workflows[workflowIndex].items.length > 0
          ? Math.max(...this.workflows[workflowIndex].items.map(item => item.id)) + 1
          : 0;
      console.log("newID", newId);
      const stepData = {
        process_id: this.workflowID,
        title: `WorkflowElement ${newId + 1}`,
        document: "null",
        step_number: 1,
      };
      console.log(stepData);
      try {
        console.log(this.workflowID);
        const response = await axios.post('http://localhost:3000/workflow/addStep', stepData);
        console.log("old = "+this.workflows[workflowIndex].step_id +"   new = " +response.data.id)

        this.workflows[workflowIndex].items.push({
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
    },

    async  updateItem(updatedItem, workflowIndex) {
      const index = this.workflows[workflowIndex].items.findIndex(item => item.id === updatedItem.id);
      //workflows[workflowIndex].items[index] = currentItem;
      if (index !== -1) {
        this.workflows[workflowIndex].items[index] = { ...updatedItem };
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
    },

    async  deleteItem(workflowIndex, itemId) {
      const itemIndex = this.workflows[workflowIndex].items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const stepId = this.workflows[workflowIndex].items[itemIndex].step_id;
        const response = await axios.post(`http://localhost:3000/workflow/deleteStep/${stepId}`);
        console.log("stepId", stepId);
        this.workflows[workflowIndex].items.splice(itemIndex, 1);
      }
    },

    onDragStart(e, item, workflowIndex) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('itemId', item.id.toString());
      e.dataTransfer.setData('workflowId', workflowIndex.toString());
    },

     onDragStartObject(e, object) {
      e.dataTransfer.effectAllowed = 'copy';
      console.log("drag start "+object.roleID)
      e.dataTransfer.setData('objectId', object.roleID.toString());
    },

     countItemsInCategory(workflowIndex, categoryId) {
      return this.workflows[workflowIndex].items.filter(item => item.categoryId === categoryId).length;
    },

     onDrop(e, categoryId, workflowIndex) {

      const itemId = parseInt(e.dataTransfer.getData('itemId'));
      const sourceWorkflowIndex = parseInt(e.dataTransfer.getData('workflowId'));

      if (isNaN(itemId)) {
        const objectId = parseInt(e.dataTransfer.getData('objectId'));
        const object = this.objects.find(obj => obj.roleID === objectId);
        if (object) {
          const newObject = { ...object };
          const itemIndex = this.workflows[workflowIndex].items.findIndex(item => item.categoryId === categoryId);
          if (itemIndex !== -1) {
            const targetElement = e.target;
            const stepId = targetElement.closest('.draggable').getAttribute('data-workflowElement-id');
            const workflowElement = this.workflows[workflowIndex].items.find(item => item.id == stepId);
            console.log(workflowElement.step_id);

            if (workflowElement) {
              if (workflowElement.objects.some(obj => obj.roleID === object.roleID)) {
                this.showNotification("Dieses Objekt wurde bereits diesem Workflow-Element hinzugefügt.");
                return;
              }
              workflowElement.objects.push(newObject);

              const response=axios.post('http://localhost:3000/workflow/assignRole',{
                step_id:workflowElement.step_id,
                workflowRoleID: newObject.workflowRoleID,
                position: workflowElement.objects.length
              })


            }

          }

        }
      } else {
        if (sourceWorkflowIndex !== workflowIndex) {
          return; // Prevent moving items between different workflows
        }

        const itemIndex = this.workflows[workflowIndex].items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const oldStepNumber = this.workflows[workflowIndex].items[itemIndex].categoryId + 1;
          const newStepNumber = categoryId + 1;
          console.log("Verschieben von Kategorie", oldStepNumber, "nach", newStepNumber);
          const stepId = this.workflows[workflowIndex].items[itemIndex].step_id;
          if (newStepNumber !== oldStepNumber) {
            this.changeStepOrder(stepId, newStepNumber);
          }
          this.workflows[workflowIndex].items[itemIndex].categoryId = categoryId;
        }
      }
    },

     openEditModal(item, workflowIndex) {
      console.log("editing");
       this.currentItem = { ...item };
       this.currentWorkflowIndex = workflowIndex;
       this.isEditModalOpen = true;

      nextTick(() => {
        const pdf = document.getElementById("pdf-id");
        if (pdf) {
          pdf = '';
        }
      });
    },



     closeEditModal() {
       this.isEditModalOpen = false;
       this.currentItem = null;
       this.currentWorkflowIndex = null;
    },

     saveItem(event) {
      if (this.currentItem && this.currentWorkflowIndex !== null) {
        // readPDF
        const pdfInput = document.getElementById('pdf-id');
        const file = pdfInput?.files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const result = e.target?.result;

            if (typeof result === 'string') {
              const pdf = result.split(',')[1]; // Verwende 'split' auf dem string
              this.currentItem.pdf = pdf;


              console.log('Base64 String: ', this.currentItem.pdf);
            } else {
              console.error('FileReader result is not a string');
            }
            // Update the item and close the modal only after reading the file
            this.updateItem(this.currentItem, this.currentWorkflowIndex);
            this.closeEditModal();
          };

          reader.readAsDataURL(file);
        } else {
          // Update the item and close the modal if no file is selected
          this.updateItem(this.currentItem, this.currentWorkflowIndex);
          this.closeEditModal();
        }
      }
    },

    async  openObjectModal() {
      console.log("opeeeen");
      const response = await axios.get('http://localhost:3000/role/allRoles/' + 1); // 1=THM
      const data = response.data;
      if (data) {
        this.platformRoles = data;
      } else {
        console.error("Failed to load roles");
      }

      this.isObjectModalOpen = true;
    },

     closeObjectModal() {
       this.isObjectModalOpen = false;
    },

    async  addObject() {

      // Check if the custom ID already exists in the objects list
      if (!this.newObject.roleName || this.newObject.id === null || this.newObject.id === '') {
        this.showNotification("Bitte stelle sicher, dass alle Felder ausgefüllt sind, bevor du das Objekt hinzufügst.");
        return; // Verhindert das Hinzufügen, wenn nicht alle Felder gesetzt sind
      }
      if (this.objects.some(obj => obj.roleName.toLowerCase() === this.newObject.roleName.toLowerCase())) {
        this.showNotification("dieser Rollenname existiert bereits. Bitte wähle einen anderen Namen.");
        return;
      }

      if (this.newObject.applicant && this.newObject.selectable) {
        this.showNotification("Entweder 'Applicant' oder 'Selectable' kann gesetzt werden, aber nicht beide.");
        return;
      }
      if (this.newObject.applicant && this.objects.some(obj => obj.applicant)) {
        this.showNotification("Es kann nur einen 'Applicant' geben. Bitte wähle einen anderen Status für dieses Objekt.");
        return;
      }

      const workflowRole =await this.saveRoleInDatabase(this.newObject.roleName, this.newObject.id, this.newObject.selectable, this.newObject.applicant);
      this.newObject.workflowRoleID = workflowRole.data.id;
      this.objects.push({ ...this.newObject });

      this.newObject = { roleName: '',roleID:this.newObject.roleID+1, id: null, applicant: false, selectable: false,workflowRoleID:0};
      this.closeObjectModal();
    },


    async  saveRoleInDatabase(rolename, roleID, selectable, applicant) {
      console.log("workflowID: "+this.workflowID+"\nroleID: "+roleID+"\nprocessRoleName: "+rolename+"\nselectable: "+selectable+"\nisApplicant"+applicant)
      const response = await axios.post('http://localhost:3000/workflow/addRole', {
        workflowID: this.workflowID,
        roleID: roleID,
        process_role_name: rolename,
        selectable: selectable,
        isApplicant: applicant
      });
      return response;
    },

     handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {

        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("bevor", this.currentItem.pdf);
          this.currentItem.pdf = e.target.result;
          console.log("after", this.currentItem.pdf);
        };
        reader.readAsDataURL(file);
      }
    },




    async  changeStepOrder(stepId, stepNumber) {
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
    },


    async  addStepAPI(process_id, title, document, step_number, role_ids, pdfBytes) {
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
    },
     showNotification(message) {
       this.notificationMessage = message;
       this.notificationVisible = true;
      setTimeout(() => {
        this.notificationVisible = false;
      }, this.notificationDuration);
    },

     checkWorkflows(workflowIndex) {

      const workflow = this.workflows[workflowIndex];
      if (workflow.categories.length === 0 || workflow.items.length === 0) {
        this.showNotification('kein Workflow wurde erstellt, erstlle ein workflow');
        return;
      }

      const categoryIds = workflow.items.map(item => item.categoryId).sort((a, b) => a - b);
      let expectedCategoryId = 0;
      for (let i = 0; i < categoryIds.length; i++) {
        if (categoryIds[i] !== expectedCategoryId) {
          this.showNotification(`Inkonsistente Kategorie-Reihenfolge: Es wird erwartet, dass die Kategorie mit ID ${expectedCategoryId} existiert, gefunden wurde aber ID ${categoryIds[i]}.`);
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
          this.showNotification("Alle Workflow-Elemente benötigen einen PDF-Link. Bitte laden sie fehlende PDF's hoch.");
        }
        if (objectsMissing) {
          this.showNotification("Jedes Workflowelement muss mindestens eine Rolle haben");
        } else {
          //showNotification("Bitte stelle sicher, dass alle Felder ausgefüllt sind, bevor du speicherst.");
        }
      } else if (!applicantFound) { // Überprüfung, ob ein Applicant vorhanden ist
        this.showNotification("Mindestens ein Objekt muss als 'Applicant' markiert sein.");
      } else {
        //=> Formularzuweisung
        store.commit('setWorkflow',this.curWorkflow)
        this.$router.push('/pdfWorkflow')
      }
    },

  },

/*

    return: {
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
      showNotification,
      notificationVisible,
      notificationMessage,
      notificationDuration,
      platformRoles,
      selectedRole,
      store

    };
*/
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
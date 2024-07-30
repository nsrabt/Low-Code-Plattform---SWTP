<template>
  <div class="min-h-screen bg-cover bg-center" style="background-image: url('/bg.jpg')">
    <navbar />


    <!-- Dynamic Fields -->
    <div class="max-w-screen-xl mx-auto p-4 mt-4">
      <div v-for="(field, index) in fields" :key="index" class="mb-4">
        <label for="roleinput" class="block text-gray-700 font-medium mb-2">
          {{ field.type }}
        </label>
        <input id="roleinput" v-model="field.curSearch" type="text" class="border border-gray-300 rounded-md p-2 w-80"
          :placeholder="'Search ' + field.type" @input="fetchSuggestions(field)" />
        <!-- Display suggestions -->
        <div v-if="field.suggestions.length > 0" class="mt-2">
          <ul class="border border-gray-300 rounded-md p-2 bg-white z-40">
            <li v-for="user in field.suggestions" :key="user.id" class="cursor-pointer hover:bg-gray-100"
              @click="selectUser(field, user)">
              {{ user.username }}
            </li>
          </ul>
        </div>
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        @click="save">Save</button>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store.js";
import {useStore} from "vuex";
import router from "@/router/index.js";

export default {

  setup(){
    const store = useStore();
    return { store };

  },

    data() {
        return {
            fields: [], // Array to hold field objects { type: String, curSearch: String, suggestions: Array }
            showDropDown: false,
            processID: null
        };
    },
    async created() {
        // Simulate fetching field types from the backend

      console.log(store.getters.getWorkflow.id);
      const startProcessDto = {
        userID: store.getters.getUser.id,
        workflowID: store.getters.getWorkflow.id
      }

      const response = await axios.put('http://localhost:3000/process/startProcess',startProcessDto);

      await this.getFieldTypes(response);
    },
    methods: {
        async getFieldTypes(response) {
            // Simulate fetching from backend
          for(const data of response.data){
            this.fields.push({
              type: data.workflowRoleName,
              curSearch: '',
              suggestions: [],
              roleID: data.roleID,
              workflowRoleID: data.id,
              userID: '',
            })
          }

          /*
            this.fields = response.map(type => ({
              type,
              curSearch: '',
              suggestions: []
            }));

 */
          },


        async fetchSuggestions(field) {
            // Simulate fetching user suggestions from the backend based on field type and curSearch
            if (field.curSearch.length > 1) {
              console.log("searching for: "+field.roleID)
              const usersOfRole = await axios.get('http://localhost:3000/user/allUsersOfRole/'+field.roleID);
              const data = await usersOfRole.data;

              for(const d of data){
                console.log(d.id);
              }

              const searchTerm = field.curSearch.toLowerCase();
              field.suggestions = data.filter(user => user.username.toLowerCase().startsWith(searchTerm));
            } else {
                field.suggestions = [];
            }
        },
        async selectUser(field, user) {
            field.curSearch = user.username;
            field.suggestions = [];
            field.userID = user.id;

        },
      async save() {
        for (const field of this.fields) {
        const response = await axios.put('http://localhost:3000/process/sendProcessRole', {
          workflowRoleID: field.workflowRoleID,
          userID: field.userID
        });
        const processID = response.data.processID;
        if (response) {
          this.store.commit('setProcessID', processID);
          await router.push('/fillingdata')
        }
      }
      },
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        }
    }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>

<template>
    <div class="min-h-screen bg-cover bg-center" style="background-image: url('/bg.jpg')">
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
                                    role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                            </form>
                        </div>

                    </div>


                </div>
            </div>
        </nav>

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

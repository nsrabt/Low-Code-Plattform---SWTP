<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <navbar />

        <div class="flex justify-center items-center min-h-screen bg-gray-100"
            :style="{ backgroundImage: 'url(/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <div class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
                <div class="flex border-b">
                    <button v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab" :class="{
                        'bg-blue-500 text-white': selectedTab === tab,
                        'bg-white text-blue-500': selectedTab !== tab
                    }" class="w-full p-2 text-center">
                        {{ tab }}
                    </button>
                </div>
                <div class="p-4">
                    <table class="min-w-full border-collapse block md:table">
                        <thead class="block md:table-header-group">
                            <tr class="border border-grey-500 md:border-none block md:table-row">
                                <th class="block md:table-cell">Process Name</th>
                                <th class="block md:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="block md:table-row-group">
                          <tr v-for="(workflow, index) in currentProcesses" :key="index"
                              class="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                            <td v-if="selectedTab === 'Public'" class="p-2 block md:table-cell text-left">{{ workflow[0]?.title }}</td>
                            <td v-if="selectedTab !== 'Public'" class="p-2 block md:table-cell text-left">{{ workflow[index][0].title }}</td>

                            <td class="p-2 block md:table-cell">
                              <template v-if="selectedTab === 'To do'">
                                <button class="bg-blue-600 text-white p-1 rounded mr-2"
                                        @click="openProcess('open', workflow[index])">Open</button>
                                <button class="bg-red-700 text-white p-1 rounded"
                                        @click="openProcess('delete', workflow[index])">Delete</button>
                              </template>
                              <template v-if="selectedTab === 'Waiting'">
                                <div class="bg-yellow-500 text-white p-1 rounded">In Progress</div>
                              </template>
                              <template v-if="selectedTab === 'Public'">
                                <button v-if="workflow[0]?.isOpen" class="bg-green-600 text-white p-1 rounded"
                                        @click="openProcess('start', workflow[0])">Start</button>
                                <button v-if="!workflow[0]?.isOpen" class="bg-red-600 text-white p-1 rounded"
                                        @click="openProcess('apply', workflow[0])">Apply</button>
                              </template>
                              <template v-if="selectedTab === 'Done'">
                                <button class="bg-blue-600 text-white p-1 rounded mr-2"
                                        @click="openProcess('open', workflow)">Open</button>
                                <button class="bg-purple-600 text-white p-1 rounded"
                                        @click="openProcess('download', workflow)">Download</button>
                              </template>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



import axios from 'axios';
import {useStore} from "vuex";
import store from "@/store/store.js";
import router from "@/router/index.js";


export default {

    data() {
        return {
            tabs: ['To do', 'Waiting', 'Public', 'Done'],
            selectedTab: 'To do',
            todoProcesses: [],
            waitingProcesses: [],
            publicProcesses: [],
            doneProcesses: [],
            showDropDown: false,
            userProcessList:[],

        };
    },

  setup(){

    const store = useStore();
    return { store };

  },
    computed: {
        currentProcesses() {
            switch (this.selectedTab) {
                case 'To do':
                    return this.todoProcesses;
                case 'Waiting':
                    return this.waitingProcesses;
                case 'Public':
                    return this.publicProcesses;
                case 'Done':
                    return this.doneProcesses;
                default:
                    return [];
            }
        },

    },
    mounted() {
        this.fetchProcesses();
    },
    methods: {
      getTitle(id) {

 return id[0]
      },

      async openProcess(command, workflow){
        switch (command) {
          case 'todo':
            console.log("todo pressed");
            break;
          case 'delete':
            console.log(workflow)
            // Sende die DELETE-Anfrage an den Server
            await axios.put('http://localhost:3000/process/deleteUserProcess/' + workflow[1]);



            break;
          case 'apply':
            //todo apply functionality
            await router.push('/processroles')
            break;
          case 'open':
            //todo open done process
            console.log("open pressed " + workflow[1]);

            this.store.commit('setProcessID', workflow[1]);

            await router.push('/fillingdata')
            break;
          case 'download':
            //todo download function
            console.log("download pressed");
            break;
          case 'start':
            console.log("start workflow "+ workflow.id)
            this.store.commit('setWorkflow', workflow);
            await router.push('/processroles')
            console.log("start pressed");
            break;
          default:
            console.log("Unknown command");
        }


      },
        async fetchProcesses() {
            try {
              const userID = store.getters.getUser.id;
              const todoResponse = await axios.get(`http://localhost:3000/process/todo/${userID}`);

              this.todoProcesses.push(todoResponse.data)

              const waitingResponse = await axios.get(`http://localhost:3000/process/waiting/${userID}`);
              this.waitingProcesses = waitingResponse.data;

              const doneResponse = await axios.get(`http://localhost:3000/process/done/${userID}`);
              this.doneProcesses = doneResponse.data;

              const publicResponse = await axios.get('http://localhost:3000/process/allPublic/'+store.getters.getRole.id);
              this.publicProcesses = publicResponse.data;


            } catch (error) {
                console.error('Error fetching processes:', error);
            }
        },
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        }
    }
};
</script>

<style scoped>
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

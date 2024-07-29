<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <navbar />

        <!-- Landing Page Content -->
        <div class="max-w-screen-xl mx-auto p-4 flex flex-col lg:flex-row items-center lg:items-start relative z-10">
            <div class="lg:w-1/2 p-4">
                <h1 class="text-7xl text-blue-900 ostrich-sans text-left">Willkommen auf unserer
                    Simple-Form Plattform</h1>
                <p class="mt-4 text-2xl bold-text text-gray-700 text-left">Wir bieten eine benutzerfreundliche Lösung
                    zur Automatisierung und Optimierung
                    wiederkehrender Prozesse sowie zur Verwaltung und automatischen Ausfüllung von PDF-Dokumenten</p>
            </div>
            <div class="lg:w-1/2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <router-link v-for="(box) in boxes" :key="box.name" :to="box.link"
                    class="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
                    style="width: 300px; height: 450px;">
                    <img :src="box.photo" alt="Box Image" class="w-full h-50 object-cover rounded-t-lg mb-4">
                    <h2 class="text-2xl font-bold mb-2 ">{{ box.name }}</h2>
                    <p class="text-gray-700 mb-4 ">{{ box.description }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import navbar from '@/components/navbar.vue';
import axios from "axios";


const store = useStore();

const showDropDown = ref(false);
const toggleDrop = () => {
    showDropDown.value = !showDropDown.value;
};



const boxes = ref([]);

const permissions = store.getters.getRole.permissions;
for(const permission of permissions){
  console.log(permission)
}

if(permissions[0] === true){
  boxes.value.push
  (
      { name: 'Prozess-Übersicht', description: 'Übersicht der Prozesse', link: '/processOverview', photo: '/process.png' },
      { name: 'Ausfülldaten Verwaltung', description: 'Verwaltung und Speicherung von den Benutzerdaten.', link: '/settings', photo: '/einstellung.png' },

  )
}
if(permissions[1] === true){
  boxes.value.push
  (
      { name: 'Plattform Manager', description: 'Verwaltung und Bearbeitung von den Plattformen', link: '/page3', photo: '/Plattform.png' },
  )
}
if(permissions[2]=== true){
  boxes.value.push
  (
  { name: 'Workflow Management', description: 'Koordination und Automatisierung von Arbeitsabläufen zur Steigerung der Effizienz.', link: '/createWorkflow', photo: '/Workflow.png' },
  )
}


const userProfilePicture = computed(() => store.getters.getUser.profilePicture || '/default-profile.jpg');
const userName = computed(() => store.getters.getUser.name || 'Admin'); // Assuming there's a name property in the user data


</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Ostrich Sans';
    src: url('/OstrichSans-Black.otf') format('opentype');
}

.ostrich-sans {
    font-family: 'Ostrich Sans', sans-serif;
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

.box:hover {
    transform: scale(1.05);
}
</style>

<template>
    <div class="main-container">
        <!-- Navigation -->
        <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
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
                    class="relative w-[200px] rounded-md hover:bg-gray-700 hover:text-gray-800 transition duration-400 ease-in-out">
                    <div class="flex items-center justify-start space-x-4 cursor-pointer" @click="toggleDrop">
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

        <!-- Landing Page Content -->
        <div class="max-w-screen-xl mx-auto p-4 flex flex-col lg:flex-row items-center lg:items-start">
            <div class="lg:w-1/2 p-4">
                <h1 class="text-7xl text-blue-900 ostrich-sans -lefttext">Willkommen auf unserer
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
import { ref } from 'vue';

const showDropDown = ref(false);
const toggleDrop = () => {
    showDropDown.value = !showDropDown.value;
};

const boxes = ref([
    { name: 'Prozess-Übersicht', description: 'Übersicht der Prozesse', link: '/processOverview', photo: '/workflow.png' },
    { name: 'Workflow Management', description: 'Koordination und Automatisierung von Arbeitsabläufen zur Steigerung der Effizienz.', link: '/createWorkflow', photo: '/Workflow.png' },
    { name: 'Plattform Manager', description: 'Verwaltung und Bearbeitung von den Plattformen', link: '/page3', photo: '/Plattform.png' },
    { name: 'Ausfülldaten Verwaltung', description: 'Verwaltung und Speicherung von den Benutzerdaten.', link: '/settings', photo: '/einstellung.png' },
]);
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
}

nav {
    background-color: #1a202c;
    border-bottom: 1px solid #2d3748;
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

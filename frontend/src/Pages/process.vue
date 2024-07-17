<template>
    <div class="main-container}">
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
        <div class="flex justify-center items-center min-h-screen bg-gray-100"
            :style="{ backgroundImage: 'url(/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <div class=" bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
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
                                <td class="p-2 block md:table-cell text-left">{{ workflow }}</td>
                                <td class="p-2 block md:table-cell">
                                    <button class="bg-blue-600 text-white p-1 rounded mr-2">Open</button>
                                    <button class="bg-red-700 text-white p-1 rounded">Delete</button>
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
export default {
    data() {
        return {
            tabs: ['To do', 'Waiting', 'Public', 'Done'],
            selectedTab: 'To do',
            todoProcesses: ['Process 1', 'Process 2', 'Process 3'],
            waitingProcesses: ['Process A', 'Process B', 'Process C'],
            publicProcesses: ['Process X', 'Process Y', 'Process Z'],
            doneProcesses: ['Process Alpha', 'Process Beta', 'Process Gamma'],
        };
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
};
</script>

<style>
/* Add any additional styling if needed */
</style>
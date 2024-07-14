<template>
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
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Simple-Form</span>
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
    <div class="main-container">

        <!-- Form Section -->
        <div class="form-container">
            <h1 class="text-center text-3xl font-bold my-6">Bevor es los geht, müssen sie ein paar Daten ausfüllen</h1>
            <form @submit.prevent="handleSubmit">
                <div v-for="(field, index) in fields" :key="index" class="mb-4">
                    <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
                    <input :id="field.key" v-model="field.value" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDropDown: false,
            fields: [],
        };
    },
    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        },
        async fetchMissingData() {
            try {
                const response = await fetch('/api/missing-data'); // Adjust the URL as necessary
                const data = await response.json();
                this.fields = data.map(item => ({
                    key: item.key,
                    label: item.label,
                    value: ''
                }));
            } catch (error) {
                console.error('Error fetching missing data:', error);
            }
        },
        handleSubmit() {
            console.log(this.fields);
            // Handle form submission logic here
        }
    },
    mounted() {
        this.fetchMissingData();
    }
};
</script>

<style scoped>
.main-container {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #f0f4f8, #d9e2ec, #bcccdc);
    min-height: 100vh;
    padding: 20px;
    background: url('/bg.jpg') no-repeat center center fixed;
    background-size: cover;
}

.form-container {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

<template>
    <div class="min-h-screen bg-cover bg-center" style="background-image: url('/bg.jpg')">
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

        <!-- Dynamic Fields -->
        <div class="max-w-screen-xl mx-auto p-4 mt-4">
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
                <input v-model="field.userId" type="text" class="border border-gray-300 rounded-md p-2 w-80"
                    :placeholder="'Search ' + field.type + ' ID...'" @input="fetchSuggestions(field)" />
                <!-- Display suggestions -->
                <div v-if="field.suggestions.length > 0" class="mt-2">
                    <ul class="border border-gray-300 rounded-md p-2">
                        <li v-for="user in field.suggestions" :key="user.id" class="cursor-pointer hover:bg-gray-100"
                            @click="selectUser(field, user)">
                            {{ user.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fields: [] // Array to hold field objects { type: String, userId: String, suggestions: Array }
        };
    },
    created() {
        // Simulate fetching field types from the backend
        this.getFieldTypes();
    },
    // DIESE METHODE IST FALLS MAN ES TESTEN WILL *Einfach auskommentieren und ersetzen mit der unten*
    // methods: {
    //     getFieldTypes() {
    //         // Hardcoded array of field types for testing
    //         const fieldTypes = ['student', 'kandidat', 'dekanat'];
    //         this.fields = fieldTypes.map(type => ({
    //             type,
    //             userId: '',
    //             suggestions: []
    //         }));
    //     },
    //     fetchSuggestions(field) {
    //         // Simulate fetching user suggestions from the backend based on field type and userId
    //         if (field.userId.length > 1) {
    //             // Hardcoded suggestions for testing
    //             const users = [
    //                 { id: 1, name: 'Nasser' },
    //                 { id: 2, name: 'Nami' },
    //                 { id: 3, name: 'Natalia' },
    //                 { id: 4, name: 'Luca' }
    //             ];
    //             field.suggestions = users.filter(user => user.name.toLowerCase().includes(field.userId.toLowerCase()));
    //         } else {
    //             field.suggestions = [];
    //         }
    //     },
    methods: {
        async getFieldTypes() {
            // Simulate fetching from backend
            const response = await fetch('/api/get-field-types');
            const data = await response.json();
            this.fields = data.fieldTypes.map(type => ({
                type,
                userId: '',
                suggestions: []
            }));
        },
        async fetchSuggestions(field) {
            // Simulate fetching user suggestions from the backend based on field type and userId
            if (field.userId.length > 1) {
                const response = await fetch(`/api/search-users?type=${field.type}&query=${field.userId}`);
                const data = await response.json();
                field.suggestions = data.users; // Assuming `users` is an array of user objects
            } else {
                field.suggestions = [];
            }
        },
        selectUser(field, user) {
            field.userId = user.name;
            field.suggestions = [];
        }
    }
};
</script>

<style>
/* Add your styles here if needed */
</style>

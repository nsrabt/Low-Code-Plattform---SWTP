<template>
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
    <div class="grid grid-cols-4 px-4 pt-6 xl:grid-cols-3 l:gap-10 dark:bg-gray-900">
        <div class="mb-4 col-span-full xl:mb-2">

            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">User settings</h1>
        </div>
        <!-- Right Content -->
        <div class="col-span-3">
            <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 class="mb-4 text-xl font-semibold dark:text-white">Allgemeine Ausfülldaten</h3>
                <form action="#">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vorname</label>
                            <input type="text" name="first-name" id="first-name"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Max" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nachname</label>
                            <input type="text" name="last-name" id="last-name"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Mustermann" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="country"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Land</label>
                            <select id="country" name="country"
                                class=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 "
                                required>
                                <!-- Options will be populated here by JavaScript -->
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="city"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stadt</label>
                            <input type="text" name="city" id="city"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="z. B. Gießen" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="zip-code"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PLZ</label>
                            <input type="number" name="zip-code" id="zip-code"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="123456" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="address"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Straße</label>
                            <input type="text" name="address" id="address"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="z. B. Schanzenstraße" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="z. B. Test@Email.de" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="phone-number"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Handy
                                Nummer</label>
                            <input type="number" name="phone-number" id="phone-number"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="z. B. +49157xxxxxx" required>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="birthday"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geburtstag</label>
                            <input type="date" name=" birthday" id="birthday"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="15/08/1990" required>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <input type="text" name="role" id="role"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Student" required readonly>
                        </div>
                        <div class="col-span-6 sm:col-full">
                            <button
                                class="bg-gray-500 text-white hover:bg-white hover:text-gray-900 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                type="submit">Speichern</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-span-3">
                <div
                    class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 class="mb-4 text-xl font-semibold dark:text-white">Plattform Ausfülldaten</h3>
                    <form action="#">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matrikel
                                    Nr.</label>
                                <input type="number" name="first-name" id="first-name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="last-name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anmeldetermin</label>
                                <input type="date" name="last-name" id="last-name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required>
                            </div>

                            <div class="col-span-6 sm:col-full">
                                <button
                                    class="bg-gray-500 text-white hover:bg-white hover:text-gray-900 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    type="submit">Speichern</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
document.addEventListener('DOMContentLoaded', function () {
 /*
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('country');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;  // Using country's 2-letter code as value
                option.text = country.name.common; // Using the common country name
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error))



  */
});
    export default {
        data() {
    return {
        showDropDown: false,
    showSide: true
    }


  },
    methods: {
        // hide show side bar
        toggleSideBar() {
        this.showSide = !this.showSide

    },
    // toggle user 
    toggleDrop() {
        this.showDropDown = !this.showDropDown

    }
  }

}
</script>
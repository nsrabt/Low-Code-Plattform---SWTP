<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40"
             viewBox="0,0,255.99889,255.99889">
          <g fill="#FFFFFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
             stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
             font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <g transform="scale(3.55556,3.55556)">
              <path
                  d="M25,11c-4.971,0 -9,4.029 -9,9v32c0,4.971 4.029,9 9,9h22c4.971,0 9,-4.029 9,-9v-21h-14c-3.314,0 -6,-2.686 -6,-6v-14zM40,11.34375v13.65625c0,1.105 0.896,2 2,2h13.65625zM29,38h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2zM29,47h14c1.104,0 2,0.895 2,2c0,1.105 -0.896,2 -2,2h-14c-1.104,0 -2,-0.895 -2,-2c0,-1.105 0.896,-2 2,-2z">
              </path>
            </g>
          </g>
        </svg>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Simple-Form</span>
      </a>
      <button data-collapse-toggle="navbar-dropdown" type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="#"
               class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
               aria-current="page">Home</a>
          </li>
          <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                    class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Menu
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 4 4 4-4" />
              </svg></button>
            <!-- Dropdown menu -->
            <div id="dropdownNavbar"
                 class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="#"
                     class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#"
                     class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#"
                     class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
              </ul>
              <div class="py-1">
                <a href="#"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                  out</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="font-[sans-serif] text-[#333]">
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div
          class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div class="md:max-w-md w-full sm:px-6 py-4">
          <form @submit.prevent="login">
            <div class="mb-12">
              <h3 class="text-3xl font-extrabold">Sign in</h3>
            </div>
            <div>
              <label class="text-xs block mb-2">Username</label>
              <div class="relative flex items-center">
                <input v-model="email" type="text" required
                       class="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                       placeholder="Username eingeben" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                     class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"></path>
                    <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="mt-8">
              <label class="text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" required
                       class="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                       placeholder="Passwort eingeben" />
                <svg @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                     class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2 mt-5">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                       class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 block text-sm">
                  Eingaben speichern
                </label>
              </div>
              <div>
                <a href="javascript:void(0);" class="text-blue-600 font-semibold text-sm hover:underline">
                  Passwort vergessen?
                </a>
              </div>
            </div>
            <div class="mt-12">
              <button type="button" @click="login('auth')" class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-blue-700 bg-white hover:bg-blue-200 hover:text-blue-500 focus:outline-none">
                LDAP Login
              </button>
              <button type="button" @click="login('auth2')" class="mt-2 w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-green-700 bg-white hover:bg-green-200 hover:text-green-500 focus:outline-none">
                Auth2 Login
              </button>
            </div>
            <div v-if="showNotification" class="mt-4 notification-box bg-red-500 text-white px-4 py-2 rounded-md">
              Authentication failed. Please try again.
            </div>
            <div v-if="showTimeoutNotification" class="mt-4 notification-box bg-orange-500 text-white px-4 py-2 rounded-md">
              Request timed out. Please try again later.
            </div>
          </form>
        </div>
        <div class="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
          <img src="https://readymadeui.com/signin-image.webp" class="w-full h-full object-contain" alt="login-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useStore} from "vuex"; // Stelle sicher, dass axios installiert ist: npm install axios
export let userID: number;

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      showNotification: false,
      showTimeoutNotification: false,
      authRoute: 'auth' // Standardmäßig wird die 'auth' Route verwendet
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    async login(route) {
      console.log("route", route);
      const apiUrl = `http://localhost:3000/${route}/login`;// Route wird dynamisch basierend auf dem Button-Klick gesetzt
      try {
        console.log("über route", route);
        // Save to local storage if remember me is checked
        if (this.rememberMe) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('password', this.password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        const response = await axios.post(`http://localhost:3000/auth2/login`, {
          username: this.email,
          password: this.password,
        });

        console.log("response", response);
        const user = response.data;
        console.log("user", user);
        userID = user.id;

        const roleResponse = await axios.get('http://localhost:3000/user/roleOfUser/'+userID);


        if (response.status === 201) {
          this.store.commit('setUser', user);
          this.store.commit('setRole', roleResponse.data);
          this.$router.push('/home');
        } else {
          console.error('Authentication failed');
        }
        return response;
      } catch (error) {
        if(error.response && error.response.status === 500) {
          this.showTimeoutNotification = true; // Show timeout notification
          setTimeout(() => {
            this.showTimeoutNotification = false; // Hide notification after 5 seconds
          }, 5000);
        } else if (this.email && this.password) {
          console.error('Error during login:', error.response ? error.response.data : error);
          this.showNotification = true; // Show notification
          setTimeout(() => {
            this.showNotification = false; // Hide notification after 5 seconds
          }, 5000);
        }
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    // Check local storage for saved credentials
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  },
};
</script>

<style scoped>
.notification-box {
  position: relative;
}
/* Add any additional styling if needed */
</style>
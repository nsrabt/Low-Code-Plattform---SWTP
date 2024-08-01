<template>
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
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" >Simple-Form</span>
            </a>

            <!-- Notifications -->
            <div class="relative">
                <div @click="toggleNotificationDropdown" class="cursor-pointer relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.519-2.613-6.432-6-6.92V4a2 2 0 10-4 0v.08C5.613 4.568 3 7.481 3 11v3.159c0 .538-.214 1.055-.595 1.436L1 17h5m4 0v1a3 3 0 106 0v-1m-4 0h4">
                        </path>
                    </svg>
                    <span v-if="unreadCount > 0"
                        class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                </div>
                <div v-show="showNotificationDropdown"
                    class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div class="py-2">
                        <p class="px-4 py-2 text-gray-700 text-sm">Notifications</p>
                        <div v-for="notification in notifications" :key="notification.id"
                            class="px-4 py-2 text-sm text-gray-600 border-b">
                            <div
                                class="flex justify-between items-center">
                                <span>{{ notification.message }}</span>
                                <button @click="deleteNotification(notification.id)"
                                    class="text-red-500 hover:text-red-700">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- User login -->
            <div
                class="relative w-[200px] rounded-md hover:bg-gray-700 hover:text-gray-800 transition duration-400 ease-in-out z-50">
                <div class="flex items-center justify-start space-x-4 cursor-pointer" @click="toggleDrop">
                    <img :src="userProfilePicture" alt="Profile Picture" class="w-10 h-10 rounded-full object-cover" />
                    <div class="font-semibold text-white text-left">
                        <div>{{ name }}</div>
                        <div class="text-xs text-white dark:text-white">{{ userName }}</div>
                    </div>
                </div>
                <!-- Drop down -->
                <div v-show="showDropDown"
                    class="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1 text-left" role="none">
                        <a href="#"
                            class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                            role="menuitem" tabindex="-1" id="menu-item-0">Update Profile Picture</a>
                        <a href="#"
                            class="text-gray-700 block px-4 py-2 text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                            role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        <form method="POST" action="#" role="none">
                            <button type="button" @click="logout"
                                class="text-gray-700 block w-full px-4 py-2 text-left text-sm rounded-md rounded-b-lg hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
                                role="menuitem" tabindex="-1" id="menu-item-4">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const showDropDown = ref(false);
const toggleDrop = () => {
    showDropDown.value = !showDropDown.value;
};

const showNotificationDropdown = ref(false);
const toggleNotificationDropdown = () => {
    showNotificationDropdown.value = !showNotificationDropdown.value;
};

const notifications = ref([]);
const unreadCount = computed(() => notifications.value.length);

const fetchNotifications = async () => {
    try {
        const user = store.getters.getUser;
        if (user && user.id) {
            const response = await axios.get(`http://localhost:3000/notification/` + 2);
            console.log('Notifications fetched:', response.data); // Debugging line
            notifications.value = response.data;
        } else {
            console.warn('User ID not available');
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

const deleteNotification = async (notificationId) => {
    try {
        await axios.put(`http://localhost:3000/notification/delete/${notificationId}`);
        notifications.value = notifications.value.filter(n => n.id !== notificationId);
    } catch (error) {
        console.error('Error deleting notification:', error);
    }
};

onMounted(fetchNotifications);
watch(() => store.getters.getUser, fetchNotifications, { immediate: true });

const userProfilePicture = computed(() => {
    const user = store.getters.getUser;
    return user && user.profilePicture ? `data:image/png;base64,${user.profilePicture}` : '/default-profile.jpg';
});

const userName = computed(() => {
    const user = store.getters.getUser;
    return ("@"+( user && user.name ? user.name : 'Admin'));
});

const name = computed(() => {
  const user = store.getters.getUser;
  return user && user.username ? user.username : 'Admin';
});

const logout = async () => {
    try {
        await axios.post('http://localhost:3000/auth2/logout');
        await store.dispatch('logout'); // Update Vuex store
        await router.push({ name: 'Login' }); // Redirect to login page
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
</script>

<style scoped>
/* Add any scoped styles for the navbar here */
</style>

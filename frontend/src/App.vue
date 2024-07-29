
<template>
  <div>
    <RouterView />
    <notification-box v-if="notificationVisible" :message="notificationMessage" :duration="notificationDuration" />
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import router from './router';
import NotificationBox from "./Pages/NotificationBox.vue"; // Stelle sicher, dass der Pfad zu deinem Router korrekt ist

export default {
  components: {
    NotificationBox
  },
  setup() {
    const store = useStore();
    const intervalId = ref<number | null>(null); // Deklariere intervalId als Ref<number | null>

    const notificationVisible = ref(false);
    const notificationMessage = ref('');
    const notificationDuration = ref(5000);

    const showNotification = (message: string, duration: number = 5000) => {
      notificationMessage.value = message;
      notificationDuration.value = duration;
      notificationVisible.value = true;
      setTimeout(() => {
        notificationVisible.value = false;
      }, duration);
    };

    const checkSessionStatus = async () => {
      try {
        const response = await store.dispatch('checkAuth');
        if (!response.isLoggedIn) {
          showNotification('Your session has ended. Please log in again.');
          await store.dispatch('logout'); // Logge den Benutzer aus
          await router.push({name: 'Login'});
        }
      } catch (error) {
        console.error('Error checking session status:', error);
      }
    };

    const startInterval = () => {
      if (intervalId.value === null) {
        intervalId.value = window.setInterval(checkSessionStatus, 10000); // Überprüfung alle 10 Sekunden
      }
    };

    const stopInterval = () => {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    };

    watch(
        () => store.getters.isLoggedIn,
        (isLoggedIn) => {
          if (isLoggedIn) {
            startInterval();
          } else {
            stopInterval();
          }
        },
        { immediate: true }
    );

    onBeforeUnmount(() => {
      stopInterval();
    });

    return {
      notificationVisible,
      notificationMessage,
      notificationDuration,
      showNotification
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-smoothing: grayscale;
  text-align: center;
}

</style>

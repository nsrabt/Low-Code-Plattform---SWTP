<!-- NotificationBox.vue -->
<template>
  <div v-if="visible" class="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
  {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
};
</script>

<style scoped>
.fixed {
  z-index: 1000;
}
</style>

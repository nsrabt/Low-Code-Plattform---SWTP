<template>
  <div>
    <!-- Navigation -->
    <navbar />

    <div class="main-container">
      <h1 class="text-center text-7xl text-blue-900 ostrich-sans my-6">
        Willkommen auf unserer Simple-Form Plattform
      </h1>
      <p class="text-center mt-4 text-2xl bold-text text-gray-700">
        Hier sind Ihre ausgefüllten Daten sowie die noch auszufüllenden Daten.
      </p>

      <!-- Search Bar -->

      <!-- Form Section for Defined Fields -->
      <div class="form-container mt-6">
        <div class="search"> <input type="text" v-model="searchQuery" placeholder="Search Ausfülldaten"
            @input="searchFillingData" class="border p-2 rounded mb-4 w-full" />
        </div>
        <h1 class="text-center text-3xl font-bold my-6">
          Bereits ausgefüllte Filling-Data
        </h1>


        <!-- Display the Filtered Ausfülldaten -->
        <div v-for="(field, index) in filteredDefinedFields" :key="index" class="mb-4">
          <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.name }}</label>

          <template v-if="field.datatype.trim() === 'boolean'">
            <input :id="field.key" v-model="field.value" type="checkbox"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </template>
          <template v-else-if="field.datatype.trim() === 'string'">
            <input :id="field.key" v-model="field.value" type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </template>
          <template v-else-if="field.datatype.trim() === 'photo'">
            <input :id="field.key" @input="onFileChange($event, field)" type="file"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            <img v-if="field.value" :src="field.value" alt="Uploaded Image" class="mt-2 max-h-64" />
          </template>
          <template v-else-if="field.datatype.trim() === 'date'">
            <input :id="field.key" v-model="field.value" type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </template>
          <template v-else-if="field.datatype.trim() === 'number'">
            <input :id="field.key" v-model="field.value" type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </template>
        </div>

        <!-- Save Button -->
        <button @click="saveDefinedData" class="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700 transition">
          Save
        </button>
      </div>

      <!-- Form Section for Fields -->
      <div class="form-container mt-6">
        <h1 class="text-center text-3xl font-bold my-6">Auszufüllende data</h1>
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(field, index) in filteredFields" :key="index" class="mb-4">
              <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.name }}</label>

              <template v-if="field.datatype.trim() === 'boolean'">
                <input :id="field.key" v-model="field.value" type="checkbox"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </template>
              <template v-else-if="field.datatype.trim() === 'string'">
                <input :id="field.key" v-model="field.value" type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </template>
              <template v-else-if="field.datatype.trim() === 'photo'">
                <input :id="field.key" @input="onFileChange($event, field)" type="file"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                <img v-if="field.value" :src="field.value" alt="Uploaded Image" class="mt-2 max-h-64" />
              </template>
              <template v-else-if="field.datatype.trim() === 'date'">
                <input :id="field.key" v-model="field.value" type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </template>
              <template v-else-if="field.datatype.trim() === 'number'">
                <input :id="field.key" v-model="field.value" type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </template>
            </div>
          </div>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </form>
      </div>
      <NotificationBox v-if="showNotification" :message="notificationMessage" :duration="notificationDuration" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store.js";
import Navbar from "@/components/navbar.vue";
import NotificationBox from "@/Pages/NotificationBox.vue";

export default {
  components: { Navbar, NotificationBox },

  data() {
    return {
      showDropDown: false,
      fields: [],
      filteredFields: [],
      definedFields: [],
      filteredDefinedFields: [],
      searchQuery: "",
      processResponse: null,
      startProcessDto: {
        // Example parameter for starting the process
        processId: 1,
        userId: 10,
      },
      notificationMessage: "",
      notificationDuration: 5000,
      showNotification: false,
    };
  },
  methods: {
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    async fetchMissingData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/user-filling-data/getAll/" +
          store.getters.getUser.id
        );
        const fieldResp = [];
        for (const res of response.data) {
          const curFillingData = await axios.get(
            "http://localhost:3000/filling-data/" + res.pi_id
          );
          fieldResp.push(curFillingData.data);
        }

        this.definedFields = fieldResp.map((field, index) => ({
          key: field.id,
          label: field.name,
          value: field.datatype === "photo" ? "data:image/jpeg;base64," + response.data[index].value : response.data[index].value,
          datatype: field.datatype,
          name: field.name,
        }));

        // Initialize filtered data
        this.filteredDefinedFields = this.definedFields;
      } catch (error) {
        console.error("Error fetching defined fields:", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/filling-data/undefindedData/" +
          store.getters.getUser.id
        );

        this.fields = response.data.map((item) => ({
          key: item.id,
          label: item.name,
          value: "",
          datatype: item.datatype,
          name: item.name,
        }));

        // Initialize filtered data
        this.filteredFields = this.fields;
      } catch (error) {
        console.error("Error fetching missing data:", error);
      }
    },
    async handleSubmit() {
      const unfilledFields = this.fields.filter((field) => {
        if (field.datatype === "boolean") {
          return false;
        }
        return !field.value;
      });

      if (unfilledFields.length > 0) {
        this.notificationMessage =
          "Bitte füllen Sie alle Felder aus, bevor Sie fortfahren.";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, this.notificationDuration);
        return;
      }

      const filledCheckboxes = this.fields.filter(
        (field) => field.datatype === "boolean" && field.value
      );
      const unfilledCheckboxes = this.fields.filter(
        (field) => field.datatype === "boolean"
      );
      if (unfilledCheckboxes.length > 1 && filledCheckboxes.length !== 1) {
        this.notificationMessage =
          "Bitte wählen Sie genau eine Checkbox aus, bevor Sie fortfahren.";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, this.notificationDuration);
        return;
      }

      for (const field of this.fields) {
        const response = await axios.put(
          "http://localhost:3000/user-filling-data",
          {
            dataID: field.key,
            userID: store.getters.getUser.id,
            value: field.value,
          }
        );
      }
      this.$router.push("/pdfcontrol");
    },
    searchFillingData() {
      // Filter both defined and undefined fields based on the search query
      const query = this.searchQuery.toLowerCase();

      this.filteredDefinedFields = this.definedFields.filter((field) =>
        field.name.toLowerCase().includes(query)
      );

      this.filteredFields = this.fields.filter((field) =>
        field.name.toLowerCase().includes(query)
      );
    },
    saveDefinedData() {
      // Implement the save logic for the defined fields
      alert("Defined data saved successfully!");
    },
    onFileChange(event, field) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          field.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
  async mounted() {
    await this.fetchMissingData();
  },
};
</script>

<style scoped>
.main-container {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #f0f4f8, #d9e2ec, #bcccdc);
  min-height: 100vh;
  padding: 20px;
  background: url("/bg.jpg") no-repeat center center fixed;
  background-size: cover;
}
.search {
 
  border: 1px solid #262121;
  /* Optional: Adds a border for better visibility */
  padding: 8px;
  /* Adds some padding inside the input */
  border-radius: 4px;
  /* Rounds the corners of the input */
  color: #5e5555;
  /* Sets the text color */
  font-size: 16px;
  /* Sets the font size */
  transition: background-color 0.3s ease;
  /* Adds a smooth transition effect */
}

/* Optional: Add focus styling for better UX */
.search:focus {
  background-color: #5c6768;
  /* Lighter shade of aqua when focused */
  outline: none;
  /* Removes default outline */
  border-color: #404c50;
  /* Changes border color on focus */
}

.form-container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>


<template>


  <!-- Navigation -->
  <navbar />
  <div class="main-container">

    <!-- Form Section -->
    <div class="form-container">
      <h1 class="text-center text-3xl font-bold my-6">Bevor es los geht, müssen sie ein paar Daten ausfüllen
      </h1>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div v-for="(field, index) in fields" :key="index" class="mb-4">

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
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</button>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store.js";
export default {
    data() {
        return {
            showDropDown: false,
            fields: [],
            processResponse: null,
            startProcessDto: {
            // Beispielparameter für den Startprozess
            processId: 1,
            userId: 10
          }
        };
    },
    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        },
      async fetchMissingData() {

        try {
          const response = await axios.put('http://localhost:3000/process/check');
          for(const res of response.data){
            console.log(res.datatype);
          }

          this.fields = response.data.map(item => ({
            key: item.id,
            label: item.name,
            value: '',
            datatype: item.datatype,
            name: item.name,
          }));


        } catch (error) {
          console.error('Error fetching missing data:', error);
        }
      },
        async handleSubmit() {
            console.log("fields ",this.fields);
            // Handle form submission logic here
          for(const field of this.fields){
            const response = await axios.put('http://localhost:3000/user-filling-data',{
              dataID:field.key,
              userID: store.getters.getUser.id,
              value: field.value
            })
          }
          this.$router.push('/pdfcontrol')
        }
    },
   async mounted() {
        await this.fetchMissingData();
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

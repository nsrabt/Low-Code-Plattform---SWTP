<template>
  <!-- Form Section -->
  <div class="form-container">
    <navbar />

    <h1 class="text-center text-3xl font-bold my-6">Bereits ausgefüllte Filling-Data</h1>
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div v-for="(field, index) in definedFields" :key="index" class="mb-4">

          <label :for="field.key" class="block text-sm font-medium text-gray-700" >{{ field.name }}</label>

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

    </form>



    <div class="form-container">

        <h1 class="text-center text-3xl font-bold my-6">Auszufüllende data</h1>
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div v-for="(field, index) in fields" :key="index" class="mb-4">

              <label :for="field.key" class="block text-sm font-medium text-gray-700" >{{ field.name }}</label>

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
import navbar from "@/components/navbar.vue";
import Navbar from "@/components/navbar.vue";

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
  components: {Navbar},

  data() {
    return {
      showDropDown: false,
      fields: [],
      definedFields:[],
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
        const response = await axios.get('http://localhost:3000/user-filling-data/getAll/'+store.getters.getUser.id);
        const fieldResp = [];
        console.log(response.data.length)
        for(const res of response.data){
          const curFillingData = await axios.get('http://localhost:3000/filling-data/' + res.pi_id);
          //console.log("userfilling"+curFillingData.data.id)
          fieldResp.push(curFillingData.data);
        }

        for(let i=0; i<response.data.length; i++) {
          if (fieldResp[i].datatype === 'photo') {
            console.log("photo")
            this.definedFields.push({
              key: fieldResp[i].id,
              label: fieldResp[i].name,
              value: 'data:image/jpeg;base64,' + response.data[i].value,
              datatype: fieldResp[i].datatype,
              name: fieldResp[i].name,
            });

          } else {
            this.definedFields.push({
              key: fieldResp[i].id,
              label: fieldResp[i].name,
              value: response.data[i].value,
              datatype: fieldResp[i].datatype,
              name: fieldResp[i].name,
            });
          }

        }

      } catch (error) {
        console.error('Error fetching missing data:', error);
      }


      try {

        const response = await axios.get('http://localhost:3000/filling-data/undefindedData/'+store.getters.getUser.id);
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


}
</script>
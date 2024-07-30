<template>
    <div>
        <!-- Navigation -->
        <navbar />

        <div v-if="isFirstLogin" class="main-container">

            <div class="lg:w-/2 p-4">
                <h1 class="text-7xl text-blue-900 ostrich-sans text-mid">Willkommen auf unserer
                    Simple-Form Plattform</h1>
                <p class="mt-4 text-2xl bold-text text-gray-700 text-mid">Bevor es losgeht, müssen sie noch ein paar
                    Daten ausfüllen..</p>

            </div>
            <!-- Form Section -->
            <div class="form-container">
                <form @submit.prevent="handleSubmit">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="(field, index) in fields" :key="index" class="mb-4">
                            <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.name
                                }}</label>

                            <template v-if="field.datatype.trim() === 'boolean'">
                                <input :id="field.key" v-model="field.value" type="checkbox"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </template>
                            <template v-else-if="field.datatype.trim() === 'string'">
                                <input :id="field.key" v-model="field.value" type="text"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </template>
                            <template v-else-if="field.datatype.trim() === 'picture'">
                                <input :id="field.key" @change="onFileChange($event, field)" type="file"
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
        <div v-else>
            <!-- Content for users who have already filled the form -->
            <router-view></router-view>
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
            isFirstLogin: false,
        };
    },
    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown;
        },
        async fetchMissingData() {
            try {
                const response = await axios.get('http://localhost:3000/filling-data/platformData/'+store.getters.getUser.id);
                if(response.data.length > 0){
                  this.isFirstLogin=true;
                  this.fields = response.data.map(item => ({
                    key: item.id,
                    label: item.name,
                    value: '',
                    datatype: item.datatype,
                    name: item.name,
                  }));
                }
                else{
                  this.$router.push('/home');
                }

            } catch (error) {
                console.error('Error fetching missing data:', error);
            }
        },
        async handleSubmit() {
            try {
                for (const field of this.fields) {
                    await axios.put('http://localhost:3000/user-filling-data', {
                        dataID: field.key,
                        userID: store.getters.getUser.id,
                        value: field.value,
                    });
                }
                this.isFirstLogin = false;
                this.$router.push('/home');
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        },
        async checkFirstLogin() {
            try {


                    await this.fetchMissingData();

            } catch (error) {
                console.error('Error checking first login:', error);
            }
        },
    },
    async mounted() {
        await this.checkFirstLogin();
    },
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

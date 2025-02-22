<template>
    <div class="main-container relative">
        <!-- Navigation -->
        <navbar />

        <div class="flex justify-center items-center min-h-screen bg-gray-100"
            :style="{ backgroundImage: 'url(/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <div class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
                <div class="flex border-b">
                    <button v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)" :class="{
                        'bg-blue-500 text-white': selectedTab === tab,
                        'bg-white text-blue-500': selectedTab !== tab
                    }" class="w-full p-2 text-center">
                        {{ tab }}
                    </button>
                </div>
                <div v-if="selectedTab === 'Roles'" class="flex p-4">
                    <button @click="addRole" class="bg-green-500 text-white p-2 rounded">Add Role</button>
                </div>
                <div class="p-4">
                    <table class="min-w-full border-collapse block md:table">
                        <thead class="block md:table-header-group">
                            <tr class="border border-grey-500 md:border-none block md:table-row">
                                <th class="block md:table-cell">{{ headerProcessName }}</th>
                                <th class="block md:table-cell">{{ headerActions }}</th>
                            </tr>
                        </thead>
                        <tbody class="block md:table-row-group">
                            <tr v-for="(item, index) in currentData" :key="index"
                                class="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                                <td class="p-2 block md:table-cell text-left">{{ selectedTab === 'Roles' ? item.roleName
                                    : (item.name + ", " +"("+ item.datatype + ")") }}</td>
                                <td class="p-2 block md:table-cell">
                                    <template v-if="selectedTab === 'Roles'">
                                        <button class="bg-blue-600 text-white p-1 rounded mr-2"
                                            @click="editRole(item)">Edit</button>
                                        <button class="bg-red-700 text-white p-1 rounded"
                                            @click="deleteRole(item.id)">Delete</button>
                                    </template>
                                    <template v-if="selectedTab === 'Ausfülldaten'">
                                        <button class="bg-blue-600 text-white p-1 rounded mr-2"
                                            @click="editFillingData(item)">Edit</button>
                                        <button class="bg-red-700 text-white p-1 rounded"
                                            @click="deleteFillingData(item.id)">Delete</button>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Edit/Add Role Modal -->
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 class="text-2xl mb-4">{{ isEdit ? 'Edit Role' : 'Add Role' }}</h2>
                <div class="mb-4">
                    <label class="block text-gray-700">Role Name</label>
                    <input v-model="editRoleData.roleName" class="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Permissions</label>
                    <div v-for="(permission, index) in permissions" :key="index">
                        <label>
                            <input type="checkbox" v-model="editRoleData.permissions[index]" />
                            {{ permission }}
                        </label>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button @click="isEdit ? updateRole(editRoleData.id) : saveNewRole()"
                        class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                    <button @click="showEditModal = false"
                        class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Edit/Add Filling Data Modal -->
        <div v-if="showEditFillingDataModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Filling Data' : 'Add Filling Data' }}</h2>
                <div class="mb-4">
                    <label class="block text-gray-700">Name</label>
                    <input v-model="currentFillingData.name" type="text" class="p-2 w-full border rounded-md" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Type</label>
                    <select v-model="currentFillingData.datatype" class="p-2 w-full border rounded-md">
                        
                        <option value="string">String</option>
                        <option value="date">Date</option>
                        <option value="boolean">Boolean</option>
                        <option value="photo">Photo</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button @click="showEditFillingDataModal = false"
                        class="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
                    <button @click="isEdit ? updateFillingData(currentFillingData.id) : saveNewFillingData()"
                        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { useStore } from "vuex";
import store from "@/store/store.js";
import router from "@/router/index.js";

export default {
    data() {
        return {
            tabs: ['Roles', 'Ausfülldaten'],
            selectedTab: 'Roles',
            headerProcessName: 'Role Name',
            headerActions: 'Actions',
            roles: [],
            fillingData: [], // Data for Ausfülldaten
            permissions: ['Prozess durchführung', 'Plattform Manager', 'Workflow Management'],
            showEditModal: false,
            showEditFillingDataModal: false,
            isEdit: false,
            editRoleData: {
                id: null,
                roleName: '',
                permissions: [],
                platformID: 1, // Set a default platformID or fetch dynamically
                isDefault: true,
            },
            currentFillingData: {
                id: null,
                name: '',
                datatype: 'string' // Default dataType
            }
        };
    },
    computed: {
        currentData() {
            return this.selectedTab === 'Roles' ? this.roles : this.fillingData;
        }
    },
    setup() {
        const store = useStore();
        return { store };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
            this.headerProcessName = tab === 'Roles' ? 'Role Name' : 'Name';
            this.headerActions = tab === 'Roles' ? 'Actions' : 'Typ';
            this.fetchData();
        },
        async fetchData() {
            if (this.selectedTab === 'Roles') {
                this.fetchRoles();
            } else if (this.selectedTab === 'Ausfülldaten') {
                this.fetchFillingData();
            }
        },
        async fetchRoles() {
            try {
                const response = await axios.get('http://localhost:3000/role/allRoles/' + 1);
                this.roles = response.data; // Use the fetched roles data
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
        async fetchFillingData() {
            try {
                const response = await axios.get('http://localhost:3000/filling-data/all/' + 1); // Adjust the endpoint as needed
                this.fillingData = response.data; // Use the fetched filling data
            } catch (error) {
                console.error('Error fetching filling data:', error);
            }
        },
        async deleteRole(roleId) {
            try {
                await axios.put(`http://localhost:3000/role/delete/` + roleId);
                this.fetchRoles(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting role:', error);
            }
        },
        addRole() {
            this.isEdit = false;
            this.editRoleData = { roleName: '', permissions: this.permissions.map(() => false), platformID: 1, isDefault: true };
            this.showEditModal = true;
        },
        editRole(role) {
            this.isEdit = true;
            const permissions = this.permissions.map((_, index) => role.permissions[index] || false);
            this.editRoleData = { ...role, permissions: permissions, platformID: role.platformID || 1, isDefault: true };
            this.showEditModal = true;
        },
        async updateRole(roleId) {
            try {
                await axios.put(`http://localhost:3000/role/update/` + roleId, this.editRoleData);
                this.showEditModal = false;
                this.fetchRoles(); // Refresh the list after update
            } catch (error) {
                console.error('Error updating role:', error);
            }
        },
        async saveNewRole() {
            try {
                await axios.put('http://localhost:3000/role', this.editRoleData);
                this.showEditModal = false;
                this.fetchRoles(); // Refresh the list after adding
            } catch (error) {
                console.error('Error adding role:', error);
            }
        },
        editFillingData(item) {
            console.log('Editing filling data:', item); // Debugging log
            this.isEdit = true;
            this.currentFillingData = { ...item };
            this.showEditFillingDataModal = true;
        },
        async updateFillingData(dataId) {
            try {
                await axios.put(`http://localhost:3000/filling-data/update/` + dataId, this.currentFillingData);
                this.showEditFillingDataModal = false;
                this.fetchFillingData(); // Refresh the list after update
            } catch (error) {
                console.error('Error updating filling data:', error);
            }
        },
        async saveNewFillingData() {
            try {
                await axios.put('http://localhost:3000/filling-data', this.currentFillingData);
                this.showEditFillingDataModal = false;
                this.fetchFillingData(); // Refresh the list after adding
            } catch (error) {
                console.error('Error adding filling data:', error);
            }
        },
        async deleteFillingData(dataId) {
            try {
                await axios.put(`http://localhost:3000/filling-data/delete/` + dataId);
                this.fetchFillingData(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting filling data:', error);
            }
        }
    }
};
</script>

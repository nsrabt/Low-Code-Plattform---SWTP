import { createStore } from 'vuex';
import axios from "axios";
axios.defaults.withCredentials = true;
const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        workflow: JSON.parse(localStorage.getItem('workflow')) || null,
        processID: JSON.parse(localStorage.getItem('processID')) || null,
        workflowElements: JSON.parse(localStorage.getItem('workflowElements'))||null,
        isLoggedIn: false
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            state.isLoggedIn = !!user;
        },
        setWorkflow(state, workflow) {
            state.workflow = workflow;
            localStorage.setItem('workflow', JSON.stringify(workflow));
        },
        setProcessID(state, processID) {
            state.processID = processID;
            localStorage.setItem('processID', JSON.stringify(processID));
        },
        setWorkflowElements(state, workflowElements) {
            state.workflowElements = workflowElements;
            localStorage.setItem('processID', JSON.stringify(workflowElements));
        },
        clearUser(state) {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
        },
        clearWorkflow(state) {
            state.workflow = null;
            localStorage.removeItem('workflow');
        },
        clearProcessID(state) {
            state.processID = null;
            localStorage.removeItem('processID');
        },
        setAuthStatus(state, status) {
            state.isLoggedIn = status;
        },
        setSessionExpired(state, status) {
            state.sessionExpired = status;
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearWorkflow');
            commit('clearProcessID');
        },
        saveProcess({ commit }, processID) {
            commit('setProcessID', processID);
        },
        clearProcess({ commit }) {
            commit('clearProcessID');
        },
        async checkAuth({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/auth');
                console.log("responseStore", response.data.isLoggedIn);
                commit('setAuthStatus', response.data.isLoggedIn);
                return response.data;
            } catch (error) {
                commit('setAuthStatus', false);
                return { isLoggedIn: false }
            }
        }

    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getWorkflow(state) {
            return state.workflow;
        },
        getProcessID(state) {
            return state.processID;
        },
        getWorkflowElements(state) {
            return state.workflowElements;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
    }
});
/*
// Eventlistener für das Window unload Event hinzufügen
window.addEventListener('beforeunload', () => {
    store.dispatch('logout');
});
 */
export default store;

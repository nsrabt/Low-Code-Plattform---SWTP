import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        workflow: JSON.parse(localStorage.getItem('workflow')) || null,
        processID: JSON.parse(localStorage.getItem('processID')) || null
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setWorkflow(state, workflow) {
            state.workflow = workflow;
            localStorage.setItem('workflow', JSON.stringify(workflow));
        },
        setProcessID(state, processID) {
            state.processID = processID;
            localStorage.setItem('processID', JSON.stringify(processID));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        clearWorkflow(state) {
            state.workflow = null;
            localStorage.removeItem('workflow');
        },
        clearProcessID(state) {
            state.processID = null;
            localStorage.removeItem('processID');
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
        }
        // Weitere Aktionen können hier hinzugefügt werden
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
        }
    }
});
/*
// Eventlistener für das Window unload Event hinzufügen
window.addEventListener('beforeunload', () => {
    store.dispatch('logout');
});
 */
export default store;

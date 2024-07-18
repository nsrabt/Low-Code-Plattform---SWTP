import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        workflow : JSON.parse(localStorage.getItem('workflow')) || null
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setWorkflow(state, workflow){
            state.workflow = workflow;
            localStorage.setItem('workflow', JSON.stringify(workflow));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        clearWorkflow(state){
            state.workflow = null;
            localStorage.removeItem('workflow');
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearWorkflow')
        },
        saveProcess({ commit }){
            commit('clearWorkflow')
        }
        // Weitere Aktionen können hier hinzugefügt werden
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getWorkflow(state){
            return state.workflow;
        }
    }
});

// Eventlistener für das Window unload Event hinzufügen
window.addEventListener('beforeunload', () => {
    store.dispatch('logout');
});

export default store;

import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    actions: {
        // Aktionen wie login und logout können hier hinzugefügt werden
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    }
});

export default store;
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        UPDATE_CART({cart}, payload){
            cart.push(payload);
            window.localStorage.setItem('cart', JSON.stringify(cart));
        },
        GET_CART({cart}, payload){
            cart.push(...payload)
        },
    },
    actions: {
        updateCart({commit}, payload){
            commit("UPDATE_CART", payload);
        },
        getCart({commit}){
            const cartStored = JSON.parse(localStorage.getItem('cart'));

            if(cartStored){
                commit("GET_CART", cartStored);
                return;
            }

        }
    }
})
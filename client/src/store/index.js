import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        products:[],
        orders:[],
        userData:{},
        error: 'hello',
        loading: false
    },
    mutations:{
        setProducts(state, playload){
            console.log(payload)
            state.products = payload;
        }
    },
    actions:{
        loadProducts({commit}){
            axios.get('http://localhost:5050/products')
            .then((response)=>{
                var products = response.data.products;
                console.log(products);
                commit('setProducts',products);
            });
        }
    },
    getters:{
        getProducts(state){
            return state.products;
        },
        getFeaturedProducts:(state)=>{
            return state.products.slice(0,6).sort((pA,pB)=>{
                return pA.price > pB.price;
            });
        },
        getOrders(state){
            return state.orders;
        },
        getError(state){
            return state.error;
        },
        getLoading(state){
            return state.error;
        }
    }
})

export default store
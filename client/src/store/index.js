import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        products:[],
        categories:[],
        orders:[],
        userData:{},
        error: 'hello',
        loading: false
    },
    mutations:{
        setProducts(state, payload){
            state.products = payload;
        },
        setCategories(state,payload){
            state.categories = payload;
        }
    },
    actions:{
        loadProducts({commit}){
            axios.get('http://localhost:5050/products')
            .then((response)=>{
                var payload = response.data.products;
                commit('setProducts',payload);
            });
        },
        loadCategories({commit}){
            axios.get('http://localhost:5050/categories')
            .then((response)=>{
                console.log(response);
                var payload = response.data.categories;
                commit('setCategories',payload);
            })
        }
    },
    getters:{
        getCategories(state){
            return state.categories;
        },
        getProducts(state){
            return state.products;
        },
        getHomeProducts(state){
            return state.products.slice(0,4);
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
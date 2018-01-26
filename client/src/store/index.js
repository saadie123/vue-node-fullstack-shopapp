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
        token:'',
        message:'',
        error: '',
        loading: false
    },
    mutations:{
        setProducts(state, payload){
            state.products = payload;
        },
        setCategories(state,payload){
            state.categories = payload;
        },
        setUserData(state,payload){
            state.userData = payload;
        },
        setToken(state,payload){
            state.token = payload;
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
        },
        registerUser({commit},payload){
            axios.post('http://localhost:5050/users/signup',payload)
            .then(response=>{
                console.log(response);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('userData',JSON.stringify(response.data.userData));
                commit('setUserData',response.userData);
                commit('setToken',response.data.token);
            });
        },
        autoLoginUser({commit}){
            var token = localStorage.getItem('token');
            var userData = JSON.parse(localStorage.getItem('userData'));
            if(token !== null && userData !== null)
            {
                console.log(userData);
                commit('setToken',token);
                commit('setUserData',userData);
            }
            else{
                commit('setToken',null);
                commit('setUserData',null);
            }
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
        getUserData(state){
            return state.userData;
        },
        getToken(state){
            return state.token;
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
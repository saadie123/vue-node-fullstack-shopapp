import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        products:[],
        categories:[],
        orders:[],
        userData:null,
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
      async loadProducts({commit}){
          try{
            const response = await axios.get('http://localhost:5050/products');
            var payload = response.data.products;
            commit('setProducts',payload);   
          }catch(e){
              console.log(e);
          }
           
        },
       async loadCategories({commit}){
          try{
            const response = await axios.get('http://localhost:5050/categories')
            console.log(response);
            var payload = response.data.categories;
            commit('setCategories',payload);
          } catch(e){
              console.log(e);
          }
        },
       async registerUser({commit},payload){
           try{
            const response = await axios.post('http://localhost:5050/users/signup',payload)
            console.log(response);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            commit('setUserData',response.data.userData);
            commit('setToken',response.data.token);  
           } catch(e){
               console.log(e);
           }
        },
       async loginUser({commit},payload){
           try{
            const response = await axios.post('http://localhost:5050/users/login',payload)
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            commit('setUserData',response.data.userData);
            commit('setToken',response.data.token);
           }catch(e){
               console.log(e);
           }       
        },
        autoLoginUser({commit}){
            var token = localStorage.getItem('token');
            var userData = JSON.parse(localStorage.getItem('userData'));
            if(token !== '' && userData !== '')
            {
                commit('setToken',token);
                commit('setUserData',userData);
            }
            else{
                commit('setToken',null);
                commit('setUserData',null);
            }
        },
        logoutUser({commit}){
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            commit('setToken',null);
            commit('setUserData',null);
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
            return state.loading;
        }
    }
})

export default store
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
        error: null,
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
        },
        setMessage(state,payload){
            state.message = payload;
        },
        setError(state,payload){
            state.error = payload;
        },
        setLoading(state,payload){
            state.loading = payload;
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
           commit('setLoading',true);               
           try{
            const response = await axios.post('http://localhost:5050/users/signup',payload);
            commit('setLoading',false);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            commit('setUserData',response.data.userData);
            commit('setToken',response.data.token);
            commit('setMessage',response.data.message);
            commit('setError',null);                     
           } catch(e){
            commit('setLoading',false);
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            commit('setError',e.response.data.error);
           }
        },
       async loginUser({commit},payload){
           commit('setLoading',true);   
           try{
            const response = await axios.post('http://localhost:5050/users/login',payload);
            commit('setLoading',false);             
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            commit('setUserData',response.data.userData);
            commit('setToken',response.data.token);
            commit('setMessage',response.data.message);
            commit('setError',null);
           }catch(e){
               commit('setLoading',false);                            
               localStorage.removeItem('token');
               localStorage.removeItem('userData');
               commit('setError',e.response.data.error);
           }       
        },
        autoLoginUser({commit}){
            var token = localStorage.getItem('token');
            var userData = JSON.parse(localStorage.getItem('userData'));
            if(token !== null && userData !== null)
            {
                var session = ((new Date().getTime() - userData.loggedInAt) / 1000) / 60
                if(session >= 60){
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    commit('setToken',null);
                    commit('setUserData',null);
                }
                else{
                    commit('setToken',token);
                    commit('setUserData',userData);
                    commit('setMessage','You are already logged in!')
                }
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
            commit('setMessage','You have logged out!');
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
        getMessage(state){
            return state.message;
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
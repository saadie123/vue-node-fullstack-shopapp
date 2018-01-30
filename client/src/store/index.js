import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:5050';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        products:[],
        categories:[],
        orders:[],
        cart:[],
        totalItems:0,
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
        setCart(state,payload){
            state.cart.push(payload);
        },
        setOrders(state,payload){
            state.orders.push(payload);
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
          commit('setLoading',true);          
          try{
              const response = await axios.get('/products');
              commit('setLoading',false);            
              var payload = response.data.products;
              commit('setProducts',payload);   
          }catch(e){
              commit('setLoading',false);              
              console.log(e);
          }
           
        },
       async loadCategories({commit}){
           commit('setLoading',true);           
           try{
               const response = await axios.get('/categories');
               commit('setLoading',false);              
               console.log(response);
               var payload = response.data.categories;
               commit('setCategories',payload);
            } catch(e){
               commit('setLoading',false);   
               console.log(e);
            }
        },
       async registerUser({commit},payload){
           commit('setLoading',true);               
           try{
            const response = await axios.post('/users/signup',payload);
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
            const response = await axios.post('/users/login',payload);
            commit('setLoading',false);             
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userData',JSON.stringify(response.data.userData));
            axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;    
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
        autoLoginUser({commit,state}){
            var token = localStorage.getItem('token');
            var userData = JSON.parse(localStorage.getItem('userData'));
            var userCart = JSON.parse(localStorage.getItem('userCart'));
            if(token !== null && userData !== null)
            {
                var session = ((new Date().getTime() - userData.loggedInAt) / 1000) / 60
                if(session >= 60){
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    localStorage.removeItem('userCart');
                    commit('setToken',null);
                    commit('setUserData',null);
                    state.cart = [];
                    state.totalItems = 0;
                }
                else{
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
                    commit('setToken',token);
                    commit('setUserData',userData);
                    state.cart = userCart;
                    if(state.cart === null){
                        state.cart = [];
                        state.totalItems = 0;
                    } else{
                        state.totalItems = state.cart.reduce((total,item)=>{
                            return total+item.quantity;
                        },0);
                    }
                    commit('setMessage','You are already logged in!');
                }
            }
            else{
                commit('setToken',null);
                commit('setUserData',null);
                state.cart = [];
                state.totalItems = 0;                
            }
        },
        logoutUser({commit,state}){
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('userCart');            
            commit('setToken',null);
            commit('setUserData',null);
            state.cart = [];
            state.totalItems = 0;            
            commit('setMessage','You have logged out!');
        },
        addToCart({commit, state},payload){
           var product = state.cart.find(item=>{
                return item._id === payload._id;
            })
            if(!product){
                payload.quantity = 1;
                state.totalItems++;                
                commit('setCart',payload);
                localStorage.setItem('userCart',JSON.stringify(state.cart));                
            } else{
                var index = state.cart.indexOf(product);
                state.cart[index].quantity++;
                state.totalItems++;
                localStorage.setItem('userCart',JSON.stringify(state.cart));    
            }
        },
        removeFromCart({state},payload){
            var index = state.cart.indexOf(payload);
            payload.quantity--;
            state.totalItems--;         
            if(payload.quantity === 0){
                state.cart.splice(index,1);
                localStorage.setItem('userCart',JSON.stringify(state.cart));                
            } else{
                state.cart[index] = payload;
                localStorage.setItem('userCart',JSON.stringify(state.cart));
            }                                                
        },
        clearCart({state}){
            state.cart = [];
            state.totalItems = 0;
            localStorage.removeItem('userCart');
        },
       async submitOrder({commit,state},payload){
           commit('setLoading',true);
            var order = {
                products:payload
            }
            var response = await axios.post('/orders',order);
           commit('setLoading',false);            
            console.log(response);
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
        getOrders(state){
            return state.orders;
        },
        getCart(state){
            return state.cart;
        },
        getTotalItems(state){
            return state.totalItems;
        },
        getToken(state){
            return state.token;
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
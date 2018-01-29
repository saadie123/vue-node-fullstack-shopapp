import store from '../store/index';
export default (to,from,next)=>{
    if(store.getters.getUserData){
        next();
    } else{
        next('/login');
    }
}
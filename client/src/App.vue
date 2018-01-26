<template>
  <v-app>
    <navbar :userData='userData'></navbar>
    <router-view></router-view>
    <br>
    <v-footer class="pa-3 primary white--text">
      <h2>Shopping Store</h2>
    <v-spacer></v-spacer>
    <div>Copyright &copy; {{ new Date().getFullYear() }}. All rights reserved.</div>
  </v-footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  data() {
    return {
    }
  },
  components:{
    'navbar': Navbar
  },
  created(){
    this.$store.dispatch('autoLoginUser');
    this.$store.dispatch('loadProducts');
    this.$store.dispatch('loadCategories');
  },
  computed:{
    userData(){
      return this.$store.getters.getUserData;
    }
  }
}
</script>

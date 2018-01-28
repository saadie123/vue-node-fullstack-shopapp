<template>
  <v-app>
    <navbar :userData='userData'></navbar>
    <v-snackbar
      :timeout="5000"
      top
      right
      v-model="showMessage"
      v-if="message !== ''"
    >
    {{ message }}
    <v-btn flat color='accent' @click="showMessage=false">Close</v-btn>
    </v-snackbar>
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
      showMessage:false,
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
    },
    message(){
        this.showMessage = true;
        return this.$store.getters.getMessage;
    }
  }
}
</script>

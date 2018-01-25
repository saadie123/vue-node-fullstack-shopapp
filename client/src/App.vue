<template>
  <v-app>
    <navbar></navbar>
    <v-container>
      <router-view></router-view>
    </v-container>
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
  }
}
</script>

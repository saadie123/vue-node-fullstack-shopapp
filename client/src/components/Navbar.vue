<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor:pointer">Shopping Store</router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat router to='/products'>
        <v-icon>shopping_cart</v-icon>
        &nbsp; Products
      </v-btn>
      <v-btn flat router to='/orders'>
        <v-icon>attach_money</v-icon>
        &nbsp; Orders
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat router to='/login'>
        <v-icon>lock_open</v-icon>
        &nbsp; Login
      </v-btn>
      <v-btn flat router to='/register'>
        <v-icon>person_add</v-icon>
        &nbsp; Register
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  export default {

  }

</script>
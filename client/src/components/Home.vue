<template>
  <div>
    <v-layout row style="margin-top:170px" v-if="loading">
      <v-flex xs6 offset-xs3 class='text-xs-center'>
        <v-progress-circular 
        :width="3"
        :size="70"
        indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-carousel style="height:90vh">
      <v-carousel-item style="cursor:pointer" 
      v-for="product in products" 
      :src="product.imageUrl" 
      :key="product._id"
      >
        <h2 
        class="carousel-caption"
        router :to="{name:'Product',params:{id:product._id}}"
        >{{product.name}}</h2>
      </v-carousel-item>
    </v-carousel>
    <v-container grid-list-md mt-5>
      <h1 center>Featured Products</h1>
      <v-layout mt-3 row wrap>
        <v-flex mb-2 v-for="product in featuredProducts" :key='product._id' xs12 sm4>
          <v-card>
            <v-card-media :src='product.imageUrl' height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{product.name}}</h3>
                <span class="grey--text">{{product.category.name}}</span>
              <h4>Price: ${{product.price}}</h4>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn v-if="user" @click="addToCart(product)" flat color="accent">Add to cart</v-btn>
              <v-btn flat router :to="{name:'Product',params:{id:product._id}}" color="accent">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </v-layout>
  </div>
</template>
<script>
  export default {
    computed: {
      products() {
        return this.$store.getters.getHomeProducts
      },
      featuredProducts() {
        return this.$store.getters.getFeaturedProducts
      },
      loading(){
        return this.$store.getters.getLoading;
      },
      user(){
        return this.$store.getters.getUserData;
      }
    },
    methods:{
      addToCart(product){
        this.$store.dispatch('addToCart',product);
      }
    }
  }

</script>
<style scoped>
  .carousel-caption {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 35px;
    font-weight: 300;
    padding: 5px 35px;
    transform: translateY(210px);
  }

</style>

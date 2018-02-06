<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
              <v-card-media :src='product.imageUrl' height="370px">
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
                <v-btn flat router :to="{name:'Products'}" color="accent">Go Back</v-btn>
              </v-card-actions>
            </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    computed:{
        product(){
          var filteredProduct = this.$store.getters.getProducts.filter((product=>{
            return this.$route.params.id === product._id
          }))[0];
          return filteredProduct;
        },
        addToCart(product){
        this.$store.dispatch('addToCart',product);
        },
        user(){
          return this.$store.getters.getUserData;
        }
    }
}
</script>

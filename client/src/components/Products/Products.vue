<template>
  <v-container>
    <v-layout>
      <v-flex xs2 mr-5>
        <v-card>
          <v-card-title primary-title>
            <h2 class='headline mb-0'>Categories</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-list >
             <v-btn v-for="category in categories" :key="category._id" 
             router exact :to="{name:'Products',query:{category:category.name}}"
              block 
              style="width:100%;text-align:left" flat>{{category.name}}</v-btn>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex mr-3 mb-2 xs12 sm4 v-for="product in products" :key='product._id'>
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
                <v-btn flat color="orange">Add to cart</v-btn>
                <v-btn flat router :to="{name:'Product',params:{id:product._id}}" color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      products() {
        if(this.$route.query.category){
          var filteredProducts = this.$store.getters.getProducts.filter(product=>{
          return product.category.name === this.$route.query.category
        });
          return filteredProducts;
        } else{
          return this.$store.getters.getProducts;
        }
      },
      categories() {
        return this.$store.getters.getCategories;
      }
    }
  }

</script>
<style scoped>
  

</style>

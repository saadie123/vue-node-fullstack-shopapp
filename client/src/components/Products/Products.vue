<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12 md2 mr-5>
       
        <v-card>
          <v-card-title>
            <v-text-field
              name="input-1"
              label="Search"
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-list >
            <v-btn router exact :to="{name:'Products'}"
              block 
              flat>All products</v-btn>
             <v-btn v-for="category in categories" :key="category._id" 
             router exact :to="{name:'Products',query:{category:category.name}}"
              block 
              flat>{{category.name}}</v-btn>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex mr-3 mb-2 xs12 sm12 md4 v-for="product in filteredList" :key='product._id'>
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
                <v-btn flat @click="addToCart(product)" color="orange">Add to cart</v-btn>
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
    data(){
      return{
        search: '',
      }
    },
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
      },
      filteredList() {
        return this.products.filter(product => {
          return product.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      cart(){
        return this.$store.getters.getCart;
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

</style>

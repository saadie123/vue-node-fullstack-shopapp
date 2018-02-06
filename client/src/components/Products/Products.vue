<template>
  <v-container>
    <v-layout row style="margin-top:170px" v-if="loading">
      <v-flex xs6 offset-xs3 class='text-xs-center'>
        <v-progress-circular 
        :width="3"
        :size="70"
        indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 sm12 md3 mr-5>  
        <v-container>
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
        </v-container>
      </v-flex>
      <v-flex>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex  mb-2 xs12 sm12 md6 v-for="product in filteredList" :key='product._id'>
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
                <v-btn v-if="user" flat @click="addToCart(product)" color="accent">Add to cart</v-btn>
                <v-btn flat router :to="{name:'Product',params:{id:product._id}}" color="accent">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
         </v-layout>
        </v-container> 
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
.move-enter-active{
  animation-name: slideIn;
  animation-duration: 0.5s;
}
.move-leave-active{
  animation-name: slideOut;
  animation-duration:0.5s;
}

@keyframes slideIn {
    from{
      transform: translateY(-20px);
      opacity: 0;
    }
    to{
      transform: translateY(0);
      opacity: 1;
    }
}
@keyframes slideOut {
  from{
      transform: translateY(0);
      opacity: 1;
    }
  to{
      transform: translateY(-20px);
      opacity: 0;
  }
    
}
</style>

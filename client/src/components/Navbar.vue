<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor:pointer">Shopping Store</router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat router to='/products'>
        <v-icon>add_shopping_cart</v-icon>
        &nbsp; Products
      </v-btn>
    <v-btn flat router to='/orders' v-if="userData">
        <v-icon>attach_money</v-icon>
        &nbsp; Orders
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if='!userData'>
      <v-btn flat router to='/login'>
        <v-icon>lock_open</v-icon>
        &nbsp; Login
      </v-btn>
      <v-btn flat router to='/register'>
        <v-icon>person_add</v-icon>
        &nbsp; Register
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-menu
      offset-y
      left
      :close-on-content-click="false"
      :nudge-width="400"
      v-model="menu"
      >
      <v-btn flat slot="activator">
        <v-badge color='accent' left>
          <span slot="badge">{{ totalItems }}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
        &nbsp; Cart
      </v-btn>
      <v-card>
        <v-card-title primary-title>
          <h2>Your Cart</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
            v-bind:headers="headers"
            :items="cart || []"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.price | currency }}</td>
            <td class="text-xs-right">{{ props.item.quantity}}</td>
            <td>
              <v-btn @click="addToCart(props.item)" flat icon color="success">
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn @click="removeFromCart(props.item)" flat icon color="error">
                <v-icon>clear</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="390">
            <v-btn flat primary slot="activator" @click="menu = false">checkout</v-btn>
            <v-card>
              <v-card-title class="headline">Your Order</v-card-title>
              <v-card-text>
                  <v-data-table
                    v-bind:headers="headers"
                    :items="cart"
                    hide-actions
                    class="elevation-1"
                  >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.price | currency }}</td>
                    <td class="text-xs-right">{{ props.item.quantity}}</td>
                  </template>
                </v-data-table>
                <v-card-title>
                  <h3>Total: {{totalBill | currency}}</h3>
                </v-card-title>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click='submitOrder(cart)'>Submit order</v-btn>
                <v-btn color="error" flat @click.native="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn flat error @click="clearCart">Clear cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
      <v-btn flat>
        <v-icon>face</v-icon>
        &nbsp; {{userData.name}}
      </v-btn>
      <v-btn flat @click="logout">
        <v-icon>exit_to_app</v-icon>
        &nbsp; Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  export default {
    props:['userData'],
    data(){
      return{
        dialog: false,
        menu: false,
        headers: [
          { text: 'Product', value: 'name', align:'center' },
          { text: 'Price', value: 'price' },
          { text: 'Quantity', value: 'quantity' }
        ],
      }
    },
    computed:{
      cart(){
        return this.$store.getters.getCart;
      },
      totalItems(){
        return this.$store.getters.getTotalItems;
      },
      totalBill(){
        var total =0;
        if(this.cart){
          this.cart.forEach(item => {
            total += item.quantity*item.price;
          });
          return total;
        } else{
          return total;
        }
      },
      loading(){
        return this.$store.getters.getLoading;
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('logoutUser');
        this.$router.push('/');
      },
      removeFromCart(item){
        this.$store.dispatch('removeFromCart',item);
      },
      clearCart(){
        this.$store.dispatch('clearCart');
      },
      addToCart(product){
        this.$store.dispatch('addToCart',product);
      },
      submitOrder(cart){
        var products = cart.map(item=>{
          return {
              product:item._id,
              quantity:item.quantity
            };
        });
        this.$store.dispatch('submitOrder',products);        
        this.dialog = false;
      }
    }
  }

</script>

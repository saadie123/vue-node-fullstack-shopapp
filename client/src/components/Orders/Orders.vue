<template>
  <v-container grid-list-md>
    <h1 class="primary--text">Your Orders</h1>
    <v-layout row style="margin-top:170px" v-if="loading">
      <v-flex xs6 offset-xs3 class='text-xs-center'>
        <v-progress-circular 
        :width="3"
        :size="70"
        indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else row wrap>
      <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete this order?</v-card-title>
        <v-card-text>You will not be able to undo this action!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat="flat" @click.native="dialog = false; deleteOrder(selectedOrder)">Confirm</v-btn>
          <v-btn color="primary" flat="flat" @click.native="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-flex v-for="(order,i) in orders" :key="order._id" xs12 sm6 md4>
        <v-card>
          <v-card-title>
            <h2>Order {{i+1}}</h2><br>
            <v-spacer></v-spacer>
            <span class="grey--text">{{order.createdAt}}</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
                    v-bind:headers="headers"
                    :items="order.products"
                    hide-actions
                    class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.product.name }}</td>
                    <td class="text-xs-right">{{ props.item.product.price | currency }}</td>
                    <td class="text-xs-right">{{ props.item.quantity}}</td>
                  </template>
                </v-data-table>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat error @click="dialog=true; selectedOrder=order._id">Cancel Order</v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data(){
    return{
      dialog: false,
      selectedOrder:'',
      headers: [
          { text: 'Product', value: 'name', align:'center' },
          { text: 'Price', value: 'price' },
          { text: 'Quantity', value: 'quantity' }
      ]
    }
  },
  computed:{
    orders(){
      return this.$store.getters.getOrders;
    },
    loading(){
      return this.$store.getters.getLoading;
    }
  },
  created(){
    this.$store.dispatch('loadOrders');
  },
  methods:{
    deleteOrder(id){
      this.$store.dispatch('deleteOrder',id);
    }
  }
}
</script>

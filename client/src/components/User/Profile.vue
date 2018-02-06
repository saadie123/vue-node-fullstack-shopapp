<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-container>
                        <h1 class='mb-3 primary--text'>Update Profile</h1>
                        <v-alert color="error" icon="info" v-if="error" v-model="alert">
                        {{error}}
                        </v-alert>
                        <form @submit.prevent="updateProfile">
                        <v-text-field 
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        :error-messages="nameErrors"
                        v-model='name'
                            label="Name" 
                            ></v-text-field>
                        <v-text-field
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                        :error-messages="phoneErrors"
                        v-model.trim='phone'
                        label="Phone" 
                        ></v-text-field>
                        <v-tooltip v-model="showToolTip" right>
                        <v-text-field
                        @focus="showToolTip=true"
                        @blur="showToolTip=false; $v.address.$touch()"
                        @input="$v.address.$touch()"
                        :error-messages="addressErrors"
                        slot="activator"
                        v-model='address' 
                        label="Address" ></v-text-field>
                            <span>This address will be used to ship your items!</span>
                        </v-tooltip>
                        <v-text-field
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        :error-messages='emailErrors' 
                        v-model.trim='email' 
                        type='email' 
                        label="E-mail" 
                        ></v-text-field>
                        <v-btn
                            color='primary'
                            :loading="loading"
                            :disabled="loading"
                            type='submit'
                        >
                            Update
                            <span slot="loader" class="loader">
                            <v-icon dark>cached</v-icon>
                            </span>
                        </v-btn>     
                        <v-btn @click="$router.push('/')" color='error'>cancel</v-btn>
                        </form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import { required,minLength,email,numeric } from 'vuelidate/lib/validators'
  export default {
    data(){
      return{
        name:'',
        phone:'',
        address:'',
        email:'',
        showToolTip:false,
        alert: true
      }
    },
    validations:{
      name:{required, minlength: minLength(4)},
      phone:{required,numeric},
      address:{required},
      email:{required,email}
    },
    computed:{
      nameErrors(){
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required!')
        !this.$v.name.minlength && errors.push('Name must be at least 4 characters long!')
        return errors
      },
      phoneErrors(){
        const errors = []
        if(!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('Phone Number is required!')
        !this.$v.phone.numeric && errors.push('Please enter a valid phone number')
        return errors
      },
      addressErrors(){
        const errors = []
        if(!this.$v.address.$dirty) return errors
        !this.$v.address.required && errors.push('Address is required!')
        return errors
      },
      emailErrors(){
        const errors = []
        if(!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Please enter a valid email address!')
        !this.$v.email.required && errors.push('Email is required!')
        return errors
      },
      error(){
        return this.$store.getters.getError;
      },
      loading(){
        return this.$store.getters.getLoading;
      },
      user(){
        return this.$store.getters.getUserData;
      }
    },
    created(){
      this.$store.commit('setError',null);
      this.name = this.user.name,
      this.phone = this.user.phone,
      this.address = this.user.address,
      this.email = this.user.email
    },
    methods:{
      updateProfile(){
          var payload = {
              name: this.name,
              phone: this.phone,
              address: this.address,
              email:this.email
          };
          this.$store.dispatch('updateProfile',payload);
      }
    }
}
</script>
<style>
  .loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>


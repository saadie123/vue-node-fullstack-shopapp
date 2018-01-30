<template>
  <v-container>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-container>
              <h1 class="mb-3 primary--text">Login</h1>
            <v-alert color="error" icon="info" v-if="error" v-model="alert">
              {{error}}
            </v-alert>
            <form @submit.prevent="login">
              <v-text-field
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              :error-messages='emailErrors'
              v-model.trim='email' 
              type='email' 
              label="E-mail" 
              ></v-text-field>
              <v-text-field
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :error-messages='passwordErrors'
              v-model='password'
              type='password' 
              label="Password" ></v-text-field>
              <v-btn
                primary
                :loading="loading"
                :disabled="loading || this.$v.$invalid"
                type='submit'
              >
                Login
                <span slot="loader" class="loader">
                  <v-icon dark>cached</v-icon>
                </span>
              </v-btn>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required,minLength,email } from 'vuelidate/lib/validators'
export default {
  data(){
    return{
      email:'',
      password:'',
      alert: true
    }
  },
  validations:{
    email:{required,email},
    password:{required,minlength:minLength(6)}
  },
  computed:{
    emailErrors(){
        const errors = []
        if(!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Please enter a valid email address!')
        !this.$v.email.required && errors.push('Email is required!')
        return errors
      },
      passwordErrors(){
        const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required!')
        !this.$v.password.minlength && errors.push('Password is must be at least 6 characters long!')
        return errors
      },
      loading(){
        return this.$store.getters.getLoading;
      },
      error(){
        return this.$store.getters.getError;
      },
      user(){
        return this.$store.getters.getUserData;
      }
  },
  watch:{
      user(value){
        if(value !== null && value !== undefined)
        {
          this.$router.push('/');
        }
      }
  },
  methods:{
    login(){
      var payload = {
        email:this.email,
        password:this.password
      };
      this.$store.dispatch('loginUser',payload);
    }
  },
  created(){
    this.$store.commit('setError',null);
    if(this.user !== null){
      this.$router.push('/');
    }
  }
}
</script>
<style scoped>
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
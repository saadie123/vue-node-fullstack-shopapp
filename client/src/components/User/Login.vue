<template>
  <v-container>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <h1 class="mb-3">Login</h1>
        <form>
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

        <v-btn @click="login" :disabled='this.$v.$invalid' primary>Login</v-btn>
        </form>
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
      password:''
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
      }
  },
  methods:{
    login(){
      var payload = {
        email:this.email,
        password:this.password
      };
      this.$store.dispatch('loginUser',payload);
      this.$router.push('/');
    }
  }
}
</script>


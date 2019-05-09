<template>
  <v-card light class="login-card elevation-15 login-card-gradient">
    <v-card-text>
      <p class="display-1 text-xs-center font-weight-bold mt-5">Login</p>
    </v-card-text>
    <v-form v-model="isLoginFormValid" @submit="onLoginFormSubmit">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              label="Username"
              prepend-icon="fa-user"
              name="username"
              :rules="rules.username"
              :error-messages="error && error.length > 0 ? [ error ] : []"
              :error="error && error.length > 0"
              placeholder="Type your Username"
              v-model="username"
              @input="onInputChange"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              :rules="rules.password"
              :error-messages="error && error.length > 0 ? [ error ] : []"
              :error="error && error.length > 0"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              prepend-icon="fa-lock"
              placeholder="Type your Password"
              required
              @click:append="showPassword = !showPassword"
              @input="onInputChange"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="mt-3">
          <v-flex xs8>
            <v-btn type="submit" round block large color="primary" light :disabled="!isLoginFormValid">
              Login
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10 class="text-xs-center">
            <router-link to="/auth/register">Don't have an account already? Sign Up here.</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { authentication } from '@/store/types'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    showPassword: false,
    rules: {
      username: [
        (value) => !!value || 'Username is required' 
      ],
      password: [
        (value) => !!value || 'Password is required'
      ]
    },
    username: '',
    password: '',
    isLoginFormValid: false
  }),
  computed: {
    ...mapGetters(authentication.namespace, {
      error: authentication.getters.GET_ERROR
    })
  },
  methods: {
    ...mapActions(authentication.namespace, {
      login: authentication.actions.LOG_IN
    }),
    ...mapMutations(authentication.namespace, {
      removeError: authentication.mutations.REMOVE_ERROR
    }),
    onLoginFormSubmit(event) {
      event.preventDefault();
      if (this.isLoginFormValid) {
        this.login({ username: this.username, password: this.password })
          .then(() => this.$router.push(this.$route.query.nextUrl || '/'))
          .catch(() => {});
      }
    },
    onInputChange() {
      if (this.error) {
        this.removeError();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-card
  height: 80vh;
</style>


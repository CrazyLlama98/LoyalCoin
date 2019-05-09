<template>
  <v-card light class="elevation-15 register-card-gradient">
    <v-card-text>
      <p class="display-1 text-xs-center font-weight-bold mt-5">Register</p>
    </v-card-text>
    <v-form v-model="isRegisterFormValid" @submit="onRegisterFormSubmit">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              label="Username"
              prepend-icon="fa-user"
              name="username"
              :rules="rules.username"
              placeholder="Type your Username"
              v-model="username"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              label="Email"
              prepend-icon="fa-envelope"
              name="email"
              :rules="rules.email"
              placeholder="Type your Email"
              v-model="email"
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
              :type="showPassword ? 'text' : 'password'"
              name="password"
              prepend-icon="fa-lock"
              placeholder="Type your Password"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :append-icon="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
              :rules="[ ...rules.confirmPassword, validateConfirmPassword ]"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="confirm-password"
              prepend-icon="fa-lock"
              placeholder="Confirm your Password"
              required
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              v-model="firstName"
              label="First Name"
              name="first-name"
              prepend-icon="fa-user-tag"
              placeholder="Type your first name"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              name="last-name"
              prepend-icon="fa-user-tag"
              placeholder="Type your last name"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="mt-3">
          <v-flex xs8>
            <v-btn
              type="submit"
              round
              block
              large
              color="primary"
              light
              :disabled="!isRegisterFormValid"
            >Register</v-btn>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs10 class="text-xs-center">
            <router-link to="/auth/login">You have an account? Log In here.</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { authentication } from "@/store/types";
import { mapActions } from "vuex";

export default {
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    rules: {
      username: [value => !!value || "Username is required"],
      password: [value => !!value || "Password is required"],
      confirmPassword: [value => !!value || "Confirm password is required"],
      email: [value => !!value || "Email is required"]
    },
    username: null,
    password: null,
    email: null,
    firstName: null,
    lastName: null,
    confirmPassword: null,
    isRegisterFormValid: false
  }),
  methods: {
    ...mapActions(authentication.namespace, {
      registerUser: authentication.actions.REGISTER
    }),
    validateConfirmPassword(value) {
      return (
        value === this.password || "Confirm Password and Password must match"
      );
    },
    onRegisterFormSubmit(event) {
      event.preventDefault();
      if (this.isRegisterFormValid) {
        this.registerUser({
          email: this.email,
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
          .then(() => {
            this.$router.push("/auth/login");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="stylus">
.wrapper
  height: 120vh;
</style>

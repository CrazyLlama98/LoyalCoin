<template>
  <v-layout row justify-content-center>
    <v-flex xs11 sm9 md6 lg5 xl4>
      <v-dialog v-model="dialogActive" persistent>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add Retailer</v-btn>
        </template>
        <v-card>
          <v-form v-model="isFormValid" @submit="submit">
            <v-card-title>
              <span class="headline">Add Retailer</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout align-center justify-center>
                  <v-flex xs10>
                    <v-text-field
                      label="Username"
                      prepend-icon="fa-user"
                      name="username"
                      :rules="rules.username"
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
                      required
                      @click:append="showConfirmPassword = !showConfirmPassword"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="reset">Cancel</v-btn>
              <v-btn color="blue darken-1" flat type="submit" :disabled="!isFormValid">Register</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import { admin } from "../store/types";

export default {
  data() {
    return {
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
      confirmPassword: null,
      isFormValid: false,
      dialogActive: false
    };
  },
  methods: {
    reset() {
      this.username = null;
      this.password = null;
      this.email = null;
      this.confirmPassword = null;
      this.dialogActive = false;
    },
    submit(event) {
      event.preventDefault();
      var newRetailer = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      this.addRetailer(newRetailer).then(() => {
        this.reset();
      });
    },
    validateConfirmPassword(value) {
      return (
        value === this.password || "Confirm Password and Password must match"
      );
    },
    ...mapActions(admin.namespace, {
      addRetailer: admin.actions.ADD_NEW_RETAILER
    })
  }
};
</script>

<style>
</style>

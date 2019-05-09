<template>
  <v-layout row justify-content-center>
    <v-flex xs11 sm9 md6 lg5 xl4>
      <v-dialog v-model="dialogActive" persistent>
        <template v-slot:activator="{ on }">
          <v-btn color="success" fixed dark fab bottom right v-on="on">
            <v-icon>fa-hand-holding-usd</v-icon>
          </v-btn>
        </template>
        <v-form v-model="isFormValid" @submit="save">
          <v-card class="hide-overflow" color="purple lighten-1" dark>
            <v-toolbar card color="purple">
              <v-icon>fa-hand-holding-usd</v-icon>
              <v-toolbar-title class="font-weight-light">Give Award</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-autocomplete
                v-model="award"
                :items="awards"
                :rules="rules.award"
                color="white"
                item-text="title"
                label="Award"
                return-object
              ></v-autocomplete>
              <v-autocomplete
                v-model="user"
                :items="users"
                :rules="rules.username"
                color="white"
                item-text="username"
                label="User"
                return-object
              ></v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="error" @click="reset">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!isFormValid" color="success" type="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >The award was accorded to the user</v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { authentication, retailer, transactions } from "../store/types";

export default {
  data() {
    return {
      hasSaved: false,
      dialogActive: false,
      isFormValid: false,
      rules: {
        username: [value => !!value || "User is required"],
        award: [value => !!value || "Award is required"]
      },
      user: null,
      award: null
    };
  },
  computed: {
    ...mapGetters(retailer.namespace, {
      users: retailer.getters.GET_USERS,
      awards: retailer.getters.GET_AWARDS
    }),
    ...mapGetters(authentication.namespace, {
      currentUser: authentication.getters.GET_CURRENT_USER
    })
  },
  methods: {
    customFilter(item, queryText) {
      const username = item.username.toLowerCase();
      const searchText = queryText.toLowerCase();

      return username.indexOf(searchText) > -1;
    },
    save(event) {
      event.preventDefault();
      this.hasSaved = true;
      if (this.user && this.award) {
        this.sendAward({
          userKey: this.user.publicKey,
          retailerKey: this.currentUser.publicKey,
          amount: this.award.amount,
          awardId: this.award.id
        }).then(() => {
          this.dialogActive = false;
        });
      }
    },
    reset() {
      this.dialogActive = false;
      this.user = null;
      this.award = null;
    },
    ...mapActions(transactions.namespace, {
      sendAward: transactions.actions.SEND_AWARD
    })
  }
};
</script>

<style>
</style>

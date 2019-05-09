<template>
  <v-layout row justify-content-center>
    <v-flex xs11 sm9 md6 lg5 xl4>
      <v-dialog v-model="dialogActive" persistent>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add Award</v-btn>
        </template>
        <v-card>
          <v-form v-model="isFormValid" @submit="submit">
            <v-card-title>
              <span class="headline">Add Award</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-layout align-center justify-center>
                  <v-flex xs10>
                    <v-text-field
                      label="Title"
                      prepend-icon="fa-tag"
                      name="title"
                      :rules="rules.title"
                      v-model="title"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                  <v-flex xs10>
                    <v-text-field
                      label="Amount"
                      prepend-icon="fa-coins"
                      name="amount"
                      type="number"
                      :rules="rules.amount"
                      v-model="amount"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="reset">Cancel</v-btn>
              <v-btn color="blue darken-1" flat type="submit" :disabled="!isFormValid">Add</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { retailer, authentication } from "../store/types";

export default {
  data() {
    return {
      rules: {
        title: [value => !!value || "Title is required"],
        amount: [value => !!value || "Amount is required"]
      },
      amount: null,
      title: null,
      isFormValid: false,
      dialogActive: false
    };
  },
  computed: {
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    })
  },
  methods: {
    reset() {
      this.dialogActive = false;
      this.amount = null;
      this.title = null;
    },
    submit(event) {
      event.preventDefault();
      var newAward = {
        title: this.title,
        amount: this.amount
      };
      this.addRetailerAward({ award: newAward, retailerId: this.user.id }).then(
        () => {
          this.reset();
        }
      );
    },
    ...mapActions(retailer.namespace, {
      addRetailerAward: retailer.actions.ADD_RETAILER_AWARD
    })
  }
};
</script>

<style>
</style>

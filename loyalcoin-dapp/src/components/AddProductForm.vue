<template>
  <v-layout row justify-content-center>
    <v-flex xs11 sm9 md6 lg5 xl4>
      <v-dialog v-model="dialogActive" persistent>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add Product</v-btn>
        </template>
        <v-card>
          <v-form v-model="isFormValid" @submit="submit">
            <v-card-title>
              <span class="headline">Add Product</span>
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
                    <v-textarea
                      label="Description"
                      prepend-icon="fa-info-circle"
                      name="description"
                      :rules="rules.description"
                      v-model="description"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                  <v-flex xs10>
                    <v-text-field
                      label="Price"
                      prepend-icon="fa-coins"
                      name="price"
                      type="number"
                      :rules="rules.price"
                      v-model="price"
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
        description: [
          value => !!value || "Description is required",
          value =>
            (value && value.length <= 400) ||
            "Description needs to have maximum 400 characters"
        ],
        price: [value => !!value || "Price is required"]
      },
      price: null,
      title: null,
      description: null,
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
      this.price = null;
      this.title = null;
      this.description = null;
    },
    submit(event) {
      event.preventDefault();
      var newProduct = {
        title: this.title,
        description: this.description,
        price: this.price
      };
      this.addProduct({ product: newProduct, retailerId: this.user.id }).then(
        () => {
          this.reset();
        }
      );
    },
    ...mapActions(retailer.namespace, {
      addProduct: retailer.actions.ADD_NEW_PRODUCT
    })
  }
};
</script>

<style>
</style>

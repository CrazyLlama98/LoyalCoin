<template>
  <v-container fluid text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="display-1">{{retailer.username}} Products</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="(product, key) in products" :key="key" xs12 sm4 lg3>
        <v-card class="my-3 mx-1">
          <v-card-title>
            <span class="title">{{ product.title }}</span>
            <v-spacer></v-spacer>
            <v-chip color="green" small text-color="white">
              <v-avatar class="green darken-4">{{ product.price }}</v-avatar>LC
            </v-chip>
          </v-card-title>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" fab small @click="addProductToBasket(product)">
              <v-icon>fas fa-cart-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-snackbar
          v-model="hasAddedToBasket"
          :timeout="2000"
          fixed
          bottom
          left
        >The product was added in the basket</v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { retailer, authentication, basket } from "../store/types";
import store from "../store";

export default {
  props: {
    retailerId: String
  },
  data() {
    return {
      hasAddedToBasket: false
    }
  },
  computed: {
    ...mapGetters(retailer.namespace, {
      products: retailer.getters.GET_PRODUCTS,
      retailer: retailer.getters.GET_SELECTED_RETAILER
    })
  },
  methods: {
    ...mapMutations(basket.namespace, {
      addToBasket: basket.mutations.ADD_TO_BASKET
    }),
    addProductToBasket(product) {
      this.addToBasket(product);
      this.hasAddedToBasket = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    var retailerPromise = store.dispatch(
      `${retailer.namespace}/${retailer.actions.FECTH_RETAILER}`,
      to.params.retailerId
    );
    var productsPromise = store.dispatch(
      `${retailer.namespace}/${retailer.actions.FETCH_PRODUCTS}`,
      to.params.retailerId
    );

    Promise.all([retailerPromise, productsPromise])
      .then(() => {
        next();
      })
      .catch(() => {
        store
          .dispatch(
            `${authentication.namespace}/${authentication.actions.LOG_OUT}`
          )
          .then(() => {
            next("/auth/login");
          });
      });
  }
};
</script>

<style>
</style>

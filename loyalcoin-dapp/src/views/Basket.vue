<template>
  <v-container fluid text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="display-1">Shopping Cart</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="my-3" v-if="basket">
      <v-flex class="mx-2" v-for="(retailerId, index) in Object.keys(basket)" :key="index" xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title>
            <span class="title">{{ getRetailer(retailerId).username }} basket</span>
          </v-card-title>
          <v-card-text>
            <div v-for="(product, productKey) in basket[retailerId]" :key="productKey">
              <span>{{ product.title }}</span>
              <span class="ml-2">Price: {{ product.price }} LC</span>
              <v-btn color="red" small fab flat @click="removeProduct(product.retailerId, productKey)">
                <v-icon>fa-times</v-icon>
              </v-btn>
            </div>
            <div class="mt-2">
              <span class="title">Total: {{ totalBasket(basket[retailerId]) }} LC</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="pay(retailerId)">Pay</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-content-around v-if="Object.keys(this.basket) && Object.keys(this.basket).length">
      <v-flex xs12 md8 lg6>
        <v-card>
          <v-card-title>
            <span class="headline">Total for all</span>
          </v-card-title>
          <v-card-text>
            <div v-for="(retailerId, index) in Object.keys(basket)" :key="index">
              <span>{{ getRetailer(retailerId).username }}: {{ totalBasket(basket[retailerId]) }} LC</span>
            </div>
            <div>
              <span class="title">{{ total() }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="payAll()" :disabled="total() > balance">Pay</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="paymentSucceded"
      :timeout="2000"
      fixed
      bottom
      left
    >The payment succeded</v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { admin, authentication, basket, transactions } from "../store/types";
import store from "../store";

export default {
  data() {
    return {
      paymentSucceded: false
    };
  },
  computed: {
    ...mapGetters(admin.namespace, {
      retailers: admin.getters.GET_RETAILERS
    }),
    ...mapGetters(basket.namespace, {
      basket: basket.getters.GET_BASKET
    }),
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    }),
    ...mapGetters(transactions.namespace, {
      balance: transactions.getters.GET_BALANCE
    })
  },
  methods: {
    ...mapMutations(basket.namespace, {
      deleteProduct: basket.mutations.REMOVE_FROM_BASKET,
      resetRetailerBasket: basket.mutations.RESET_BASKET_FOR_RETAILER
    }),
    ...mapActions(transactions.namespace, {
      transfer: transactions.actions.TRANSFER_COINS
    }),
    getRetailer(id) {
      return this.retailers.filter(retailer => retailer.id === id)[0];
    },
    totalBasket(basket) {
      if (basket) {
        return basket.reduce((prev, product) => prev + product.price, 0);
      }
      return 0;
    },
    removeProduct(retailerId, index) {
      this.deleteProduct({ retailerId, productIndex: index });
    },
    pay(retailerId) {
      var retailer = this.getRetailer(retailerId);
      var amount = this.totalBasket(this.basket[retailerId]);
      this.transfer({
        fromKey: this.user.publicKey,
        toKey: retailer.publicKey,
        amount
      }).then(() => {
        this.paymentSucceded = true;
        this.resetRetailerBasket(retailerId);
      });
    },
    payAll() {
      var amount = this.total();
      if (amount <= this.balance) {
        Object.keys(this.basket).forEach(this.pay);
      }
    },
    total() {
      var retailersId = Object.keys(this.basket);
      if (retailersId && retailersId.length) {
        return retailersId.reduce((prev, retailerId) => prev + this.totalBasket(this.basket[retailerId]), 0);
      }
      return 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch(`${admin.namespace}/${admin.actions.FETCH_ALL_RETAILERS}`)
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

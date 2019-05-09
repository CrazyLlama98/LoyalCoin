<template>
  <v-container fluid grid-list-md>
    <AddProductForm class="my-2"/>
    <v-data-iterator :items="products" content-tag="v-layout" row wrap justify-content-center>
      <template v-slot:item="props">
        <v-flex xs10>
          <v-card class="my-3">
            <v-card-title>
              <span class="title">{{ props.item.title }}</span>
              <v-spacer></v-spacer>
              <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">{{ props.item.price }}</v-avatar>LC
              </v-chip>
              <v-chip
                close
                color="red"
                @input="removeSelectedProduct(props.item.id)"
                text-color="white"
              >Remove</v-chip>
            </v-card-title>
            <v-card-text>{{props.item.description}}</v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { retailer, authentication } from "../store/types";
import store from "../store";
import AddProductForm from "@/components/AddProductForm";

export default {
  components: {
    AddProductForm
  },
  computed: {
    ...mapGetters(retailer.namespace, {
      products: retailer.getters.GET_PRODUCTS
    }),
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    })
  },
  methods: {
    ...mapActions(retailer.namespace, {
      removeProduct: retailer.actions.REMOVE_PRODUCT
    }),
    removeSelectedProduct(productId) {
      this.removeProduct({ retailerId: this.user.id, productId });
    }
  },
  beforeRouteEnter(to, from, next) {
    var retailerId =
      store.getters[
        `${authentication.namespace}/${authentication.getters.GET_CURRENT_USER}`
      ].id;
    store
      .dispatch(
        `${retailer.namespace}/${retailer.actions.FETCH_PRODUCTS}`,
        retailerId
      )
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

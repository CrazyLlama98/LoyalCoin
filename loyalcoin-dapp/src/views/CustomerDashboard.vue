<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout row wrap justify-content-center>
      <v-flex xs12>
        <div class="display-1">Choose the store you want to buy</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="(retailer, key) in retailers" :key="key">
        <v-card :to="`/retailers/${retailer.id}/store`" color="purple" dark class="my-3">
          <v-card-title>
            <span class="headline">{{ retailer.username }}</span>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import { admin, authentication } from "../store/types";

export default {
  computed: {
    ...mapGetters(admin.namespace, {
      retailers: admin.getters.GET_RETAILERS
    })
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

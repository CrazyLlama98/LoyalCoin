<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <NavigationMenu :role="user.roles ? user.roles[0] : null"/>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>LoyalCoin Network</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="mr-2"
        to="/shopping-trips"
        flat
        fab
        v-if="user.roles && user.roles.includes('Customer')"
      >
        <v-badge right>
          <template v-slot:badge v-if="nrProducts">
            <span>{{ nrProducts }}</span>
          </template>
          <v-icon>fas fa-shopping-cart</v-icon>
        </v-badge>
      </v-btn>
      <UserActionsMenu/>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { authentication, transactions, basket } from "../store/types";
import store from "../store";
import UserActionsMenu from "@/components/UserActionsMenu";
import NavigationMenu from "@/components/NavigationMenu";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false
  }),
  components: {
    UserActionsMenu,
    NavigationMenu
  },
  computed: {
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    }),
    ...mapGetters(basket.namespace, {
      nrProducts: basket.getters.GET_NR_PRODUCTS
    })
  },
  beforeRouteEnter(to, from, next) {
    if (
      store.getters[
        `${authentication.namespace}/${authentication.getters.IS_LOGGED_IN}`
      ]
    ) {
      store
        .dispatch(
          `${authentication.namespace}/${
            authentication.actions.FETCH_CURRENT_USER
          }`
        )
        .then(user => {
          if (user.publicKey) {
            store
              .dispatch(
                `${transactions.namespace}/${
                  transactions.actions.FETCH_BALANCE
                }`,
                user.publicKey
              )
              .then(() => next())
              .catch(err => {
                // eslint-disable-next-line
                console.log("Error: " + err);
                next();
              });
          }
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
    } else {
      next("/auth/login");
    }
  }
};
</script>

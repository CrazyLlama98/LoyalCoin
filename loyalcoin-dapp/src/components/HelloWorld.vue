<template>
  <div></div>
</template>

<script>
import { authentication } from "../store/types";
import store from "../store";

export default {
  data: () => ({}),
  beforeRouteEnter(to, from, next) {
    var userRoles = store.getters[`${authentication.namespace}/${authentication.getters.GET_CURRENT_USER}`].roles;

    if (userRoles && userRoles.includes("Admin")) {
      next('/retailers');
    } else if (userRoles && userRoles.includes("Retailer")) {
      next('/awards');
    } else if (userRoles && userRoles.includes("Customer")) {
      next('/dashboard');
    } else {
      next();
    }
  }
};
</script>

<style>
</style>

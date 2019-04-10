<template>
  <div class="metamask-info">
    <p>Network: {{ web3.version.network }}</p>
    <p>Account: {{ web3.eth.coinbase }}</p>
    <p>Balance: {{ web3.eth.balance }}</p>
  </div>
</template>

<script>
import { web3 } from "../store/types";
import store from "../store";
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(web3.namespace, {
      web3: web3.getters.GET_WEB3
    })
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${web3.namespace}/${web3.actions.REGISTER_WEB3}`)
      .then(() => {
        next();
      })
      .catch(() => {});
  }
};
</script>

<style>
</style>

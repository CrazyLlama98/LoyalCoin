<template>
  <v-menu offset-y>
    <v-btn slot="activator" flat>Hello, {{ user.username }}</v-btn>
    <v-list>
      <v-list-tile v-if="user.roles && !user.roles.includes('Admin')">You have {{balance}} LC</v-list-tile>
      <v-list-tile @click="logoff">Logout</v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { authentication, transactions } from "../store/types";

export default {
  data() {
    return {
      polling: null
    };
  },
  computed: {
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    }),
    ...mapGetters(transactions.namespace, {
      balance: transactions.getters.GET_BALANCE
    })
  },
  methods: {
    ...mapActions(authentication.namespace, {
      logout: authentication.actions.LOG_OUT
    }),
    ...mapActions(transactions.namespace, {
      getBalance: transactions.actions.FETCH_BALANCE
    }),
    logoff() {
      this.logout().then(() => this.$router.push("/auth/login"));
    },
    pollBalance() {
      this.polling = setInterval(() => this.getBalance(this.user.publicKey), 500);
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.pollBalance();
  }
};
</script>

<style>
</style>

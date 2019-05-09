<template>
  <v-container fluid grid-list-md>
    <AddRetailerForm class="my-2"/>
    <v-data-iterator :items="retailers" content-tag="v-layout" row wrap justify-content-center>
      <template v-slot:item="props">
        <v-flex xs10>
          <v-card class="my-3">
            <v-card-title>
              <span class="title">{{ props.item.username }}</span>
              <span class="ml-3">{{ props.item.email }}</span>
            </v-card-title>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { admin, authentication } from "../store/types";
import store from "../store";
import AddRetailerForm from "@/components/AddRetailerForm";

export default {
  components: {
    AddRetailerForm
  },
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

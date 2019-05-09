<template>
  <v-container fluid grid-list-md>
    <AddAwardForm class="my-2" />
    <v-data-iterator :items="awards" content-tag="v-layout" row wrap justify-content-center>
      <template v-slot:item="props">
        <v-flex xs10>
          <v-card class="my-3">
            <v-card-title>
              <span class="title">{{ props.item.title }}</span>
              <v-spacer></v-spacer>
              <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">{{ props.item.amount }}</v-avatar>LC
              </v-chip>
              <v-chip
                close
                color="red"
                @input="removeAward(props.item.id)"
                text-color="white"
              >Remove</v-chip>
            </v-card-title>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    <AddAwardToUserForm />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { retailer, authentication } from "../store/types";
import store from "../store";
import AddAwardForm from "@/components/AddAwardForm";
import AddAwardToUserForm from "@/components/AddAwardToUserForm";

export default {
  components: {
    AddAwardForm,
    AddAwardToUserForm
  },
  computed: {
    ...mapGetters(retailer.namespace, {
      awards: retailer.getters.GET_AWARDS
    }),
    ...mapGetters(authentication.namespace, {
      user: authentication.getters.GET_CURRENT_USER
    })
  },
  methods: {
    ...mapActions(retailer.namespace, {
      removeRetailerAward: retailer.actions.REMOVE_RETAILER_AWARD
    }),
    removeAward(awardId) {
      this.removeRetailerAward({ retailerId: this.user.id, awardId });
    }
  },
  beforeRouteEnter(to, from, next) {
    var retailerId =
      store.getters[
        `${authentication.namespace}/${authentication.getters.GET_CURRENT_USER}`
      ].id;
    store.dispatch(`${retailer.namespace}/${retailer.actions.FETCH_USERS}`);
    store
      .dispatch(
        `${retailer.namespace}/${retailer.actions.FECTH_RETAILER_AWARDS}`,
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

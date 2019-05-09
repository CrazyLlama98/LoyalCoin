<template>
  <div class="wrapper blue-grey lighten-5">
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md7 lg5>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.wrapper
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
</style>

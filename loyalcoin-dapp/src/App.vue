<template>
  <v-app light>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<style lang="stylus">
.fade-enter-active
  transition: opacity 1s;

.fade-leave-active
  transition: opacity .1s;

.fade-enter, .fade-leave-to 
  opacity: 0;

.fade-leave, .fade-enter-to
  opacity: 1;

.preserve-text
  white-space: pre;
  text-align: left;
</style>

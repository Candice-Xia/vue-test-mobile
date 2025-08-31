<script setup>
import ExpenseManager from './components/ExpenseManager.vue'
</script>

<template>
  <v-app class="app-container">
    <router-view />
  </v-app>
</template>

<style>
.app-container {
  height: 100%;
  overflow: hidden;
}

/* 确保vuetify应用容器不产生滚动条 */
.v-application__wrap {
  overflow: hidden !important;
}
</style>

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
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden !important;
}

/* 确保vuetify应用容器不产生滚动条 */
.v-application__wrap {
  overflow: hidden !important;
}

/* 禁止所有可能的滚动 */
:deep(html),
:deep(body),
:deep(#app),
:deep(.v-application) {
  overflow: hidden !important;
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
}
</style>

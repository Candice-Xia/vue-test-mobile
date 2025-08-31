<template>
  <div class="new-expense-item">
    <v-app-bar color="#0059b1" elevation="1">
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left" color="white" variant="text" density="comfortable" @click="goBack"></v-btn>
      </template>
      <v-app-bar-title class="text-white font-weight-medium">
        New Expense Item
      </v-app-bar-title>
    </v-app-bar>

    <v-container class="pa-0">
      <v-form @submit.prevent="submitForm" ref="form">
            <!-- Cost Center Label -->
            <div class="text-subtitle-2 text-medium-emphasis px-4 pt-8 pb-2"></div>
            
            <!-- Cost Center Field -->
              <v-autocomplete
                v-model="formData.costCenter"
                :items="costCenters"
                item-title="Text"
                item-value="ID"
                density="default"
                height="60"
                variant="underlined"
                color="primary"
                bg-color="white"
                menu-icon="mdi-menu-down"
                :return-object="false"
                auto-select-first
                clearable
                :filter="customFilter"
                :no-filter="false"
                hide-details
                class="mb-4"
                label="Cost Center"
                attach="body"
                :menu-props="{
                  maxHeight: 220,
                  contentClass: 'custom-menu',
                  openOnClick: false,
                  closeOnContentClick: true,
                  position: 'top'
                }"
              ></v-autocomplete>

            <!-- Expense Type Label -->
            <div class="text-subtitle-2 text-medium-emphasis px-4 pt-4 pb-2"></div>
            
            <!-- Expense Type Field -->
             <v-autocomplete
                v-model="formData.expenseType"
                :items="expenseTypes"
                item-title="Text"
                item-value="ID"
                density="default"
                height="60"
                variant="underlined"
                color="primary"
                bg-color="white"
                menu-icon="mdi-menu-down"
                :return-object="false"
                auto-select-first
                clearable
                :filter="customFilter"
                :no-filter="false"
                hide-details
                label="Expense Type"
                attach="body"
                :menu-props="{
                  maxHeight: 220,
                  contentClass: 'custom-menu',
                  openOnClick: false,
                  closeOnContentClick: true,
                  position: 'top'
                }"
              ></v-autocomplete>

          <div class="d-flex justify-center mt-12 mb-8">
            <v-btn 
              color="#0059b1" 
              width="140"
              height="45" 
              class="text-white text-body-1 font-weight-medium"
              type="submit"
              variant="elevated"
            >
              Next 
              <v-icon icon="mdi-chevron-right" class="ml-1"></v-icon>
            </v-btn>
          </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import costCenterData from '../data/costCenter.json';
import expenseTypeData from '../data/expenseType.json';

const router = useRouter();

const formData = ref({
  costCenter: 216, // A/R Channel RMA-18135
  expenseType: null // 初始为空
});

const costCenters = costCenterData;
const expenseTypes = expenseTypeData;

const form = ref(null);

const submitForm = () => {
  // 简单提交表单
  console.log('Form submitted:', formData.value);
  // In a real app, you would send this data to an API
  // Then navigate to the next step
};

const goBack = () => {
  router.push('/');
};

// 自定义过滤函数，用于在任何位置匹配文本
const customFilter = (item, queryText, itemText) => {
  if (queryText.trim() === '') return true;
  
  const searchText = queryText.toLowerCase();
  const text = itemText.toLowerCase();
  
  return text.includes(searchText);
};
</script>

<style scoped>
.new-expense-item {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 添加自定义样式使菜单显示在键盘底层 */
:deep(.custom-menu) {
  z-index: 5 !important; /* 降低z-index使其低于键盘 */
}
</style>

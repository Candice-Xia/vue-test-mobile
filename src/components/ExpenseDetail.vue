<template>
  <div class="expense-detail">
    <!-- App Bar -->
    <v-app-bar color="#0059b1" elevation="1">
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left" color="white" variant="text" density="comfortable" @click="goBack"></v-btn>
      </template>
      <v-app-bar-title class="text-white font-weight-medium">
        Expense Detail
      </v-app-bar-title>
    </v-app-bar>

    <v-container class="pt-16 px-0 pb-0 content-container">
      <v-form @submit.prevent="submitForm" ref="form">
        <!-- Cost Center Autocomplete -->
        <div class="costCenter">
        <v-autocomplete
          v-model="formData.costCenter"
          :items="costCenters"
          item-title="Text"
          item-value="ID"
          variant="underlined"
          density="default"
          class="mb-4"
          label="Cost Center"
          :menu-props="{
            maxHeight: 300,
            closeOnContentClick: true
          }"
        ></v-autocomplete>
        </div>
        <!-- Expense Type Autocomplete -->
        <div class="expenseType">
        <v-autocomplete
          v-model="formData.expenseType"
          :items="expenseTypes"
          item-title="Text"
          item-value="ID"
          variant="underlined"
          density="default"
          label="Expense Type44"
          :menu-props="{
            maxHeight: 300,
            closeOnContentClick: true,
            offsetY: true
          }"
        ></v-autocomplete>
        </div>

        <div class="d-flex justify-center mt-12 mb-8">
          <v-btn 
            color="#0059b1" 
            width="140"
            height="45" 
            class="text-white text-body-1 font-weight-medium"
            type="submit"
            variant="elevated"
          >
            Submit 
            <v-icon icon="mdi-check" class="ml-1"></v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import costCenterData from '../data/costCenter.json';
import expenseTypeData from '../data/expenseType.json';

const router = useRouter();

const formData = ref({
  costCenter: null,
  expenseType: null
});

const costCenters = costCenterData;
const expenseTypes = expenseTypeData;

const form = ref(null);

const submitForm = () => {
  // 简单提交表单
  console.log('Form submitted:', formData.value);
  // 在实际应用中，您会将此数据发送到API
  // 然后导航到下一步
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.expense-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-container {
  overflow-y: auto;
  flex: 1;
  padding-bottom: 40px; /* 确保内容底部有足够空间 */
  -webkit-overflow-scrolling: touch; /* 为iOS设备添加平滑滚动 */
}

.costCenter, .expenseType {
  position: relative;
}

/* 防止v-menu跟随页面滚动 */
:deep(.v-menu__content) {
  position: fixed !important;
}

/* 确保自动完成菜单显示在其他元素上方 */
:deep(.v-autocomplete__content) {
  z-index: 200 !important;
}

/* 防止iOS Safari上出现弹性滚动效果 */
:deep(body) {
  position: fixed;
  width: 100%;
}
</style>

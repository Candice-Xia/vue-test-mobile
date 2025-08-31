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
                variant="underlined"
                clearable
                :filter="customFilter"
                label="Cost Center"
                attach="body"
                @click:menu="adjustMenuHeight($event, 'costCenter')"
                :menu-props="{
                  contentClass: 'custom-menu',
                  closeOnContentClick: true,
                  activator: 'parent'
                }"
                ref="costCenterAutocomplete"
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
                variant="underlined"
                clearable
                :filter="customFilter"
                label="Expense Type*"
                attach="body"
                @click:menu="adjustMenuHeight($event, 'expenseType')"
                :menu-props="{
                  contentClass: 'custom-menu',
                  closeOnContentClick: true,
                  activator: 'parent'
                }"
                ref="expenseTypeAutocomplete"
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

const costCenterAutocomplete = ref(null);
const expenseTypeAutocomplete = ref(null);
const isKeyboardOpen = ref(false);
const keyboardHeight = ref(0);
const windowHeight = ref(window.innerHeight);

const adjustMenuHeight = (event, fieldName) => {
  // 获取当前窗口高度，用于检测键盘是否弹出
  const currentHeight = window.innerHeight;
  
  // 如果当前高度小于记录的窗口高度，说明键盘弹出
  if (currentHeight < windowHeight.value) {
    isKeyboardOpen.value = true;
    keyboardHeight.value = windowHeight.value - currentHeight;
  } else {
    isKeyboardOpen.value = false;
    keyboardHeight.value = 0;
  }

  // 获取输入框元素
  const autocompleteEl = fieldName === 'costCenter' 
    ? costCenterAutocomplete.value?.$el 
    : expenseTypeAutocomplete.value?.$el;
  
  if (!autocompleteEl) return;
  
  // 获取输入框位置
  const rect = autocompleteEl.getBoundingClientRect();
  
  // 计算输入框到键盘顶部的距离
  const distanceToKeyboard = currentHeight - rect.bottom - 20; // 20px的额外间距
  
  // 计算输入框到顶部的距离
  const distanceToTop = rect.top - 64; // 减去app-bar的高度
  
  // 确定菜单的位置和高度
  let position, maxHeight;
  
  if (isKeyboardOpen.value) {
    // 键盘弹出时
    if (distanceToKeyboard > 200) {
      // 如果下方空间足够，显示在下方
      position = 'bottom';
      maxHeight = Math.min(distanceToKeyboard, 300);
    } else {
      // 否则显示在上方
      position = 'top';
      maxHeight = Math.min(distanceToTop, 300);
    }
  } else {
    // 键盘未弹出时
    position = 'bottom';
    maxHeight = 300;
  }
  
  // 应用样式
  const menuElement = autocompleteEl.querySelector('.v-menu__content');
  if (menuElement) {
    menuElement.style.maxHeight = `${maxHeight}px`;
    
    if (position === 'top') {
      menuElement.style.top = 'auto';
      menuElement.style.bottom = '100%';
    } else {
      menuElement.style.top = '100%';
      menuElement.style.bottom = 'auto';
    }
  }
};

// 监听窗口大小变化
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    // 当窗口大小恢复到接近原始高度时，更新记录的窗口高度
    if (Math.abs(window.innerHeight - windowHeight.value) < 100) {
      windowHeight.value = window.innerHeight;
    }
  });
}

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

/* 自定义下拉菜单样式 */
:deep(.custom-menu) {
  position: absolute !important;
  overflow-y: auto;
  transition: max-height 0.3s ease;
  transform: none !important;
  margin: 0 !important;
  width: 100% !important;
}
</style>

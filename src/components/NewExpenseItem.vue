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
            <div class="text-subtitle-2 text-medium-emphasis px-4 pt-8 pb-2">Cost Center</div>
            
            <!-- Cost Center Select Field (Clickable) -->
            <v-text-field
              :value="getSelectedText(formData.costCenter, costCenters)"
              readonly
              variant="underlined"
              density="default"
              class="mb-4"
              append-inner-icon="mdi-menu-down"
              @click="showSelector('costCenter')"
            ></v-text-field>

            <!-- Expense Type Label -->
            <div class="text-subtitle-2 text-medium-emphasis px-4 pt-4 pb-2">Expense Type<span class="text-error">*</span></div>
            
            <!-- Expense Type Select Field (Clickable) -->
            <v-text-field
              :value="getSelectedText(formData.expenseType, expenseTypes)"
              readonly
              variant="underlined"
              density="default"
              append-inner-icon="mdi-menu-down"
              @click="showSelector('expenseType')"
            ></v-text-field>

            <!-- Full Screen Selector Dialog -->
            <v-dialog
              v-model="dialog.show"
              fullscreen
              transition="dialog-bottom-transition"
              :scrim="false"
            >
              <v-card>
                <!-- Dialog Toolbar -->
                <v-toolbar color="#0059b1" dark>
                  <v-btn icon @click="dialog.show = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ dialog.title }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                
                <!-- Search Field -->
                <v-text-field
                  v-model="dialog.search"
                  clearable
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="pa-4"
                  autofocus
                ></v-text-field>
                
                <!-- Options List -->
                <v-list lines="two" class="overflow-y-auto" style="height: calc(100vh - 180px)">
                  <v-list-item
                    v-for="item in filteredItems"
                    :key="item.ID"
                    :title="item.Text"
                    @click="selectItem(item.ID)"
                  ></v-list-item>
                </v-list>
              </v-card>
            </v-dialog>

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
import { ref, computed } from 'vue';
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

// 对话框状态
const dialog = ref({
  show: false,
  type: null, // 'costCenter' or 'expenseType'
  title: '',
  search: '',
});

// 获取当前选中项目的显示文本
const getSelectedText = (id, items) => {
  if (id === null) return '';
  const item = items.find(item => item.ID === id);
  return item ? item.Text : '';
};

// 打开选择器对话框
const showSelector = (type) => {
  dialog.value.type = type;
  dialog.value.title = type === 'costCenter' ? 'Select Cost Center' : 'Select Expense Type';
  dialog.value.search = '';
  dialog.value.show = true;
};

// 过滤后的选项列表
const filteredItems = computed(() => {
  const items = dialog.value.type === 'costCenter' ? costCenters : expenseTypes;
  if (!dialog.value.search) return items;
  
  const search = dialog.value.search.toLowerCase();
  return items.filter(item => item.Text.toLowerCase().includes(search));
});

// 选择项目
const selectItem = (id) => {
  if (dialog.value.type === 'costCenter') {
    formData.value.costCenter = id;
  } else {
    formData.value.expenseType = id;
  }
  dialog.value.show = false;
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

//这部分逻辑已经移到 filteredItems computed 属性中
</script>

<style scoped>
.new-expense-item {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 对话框转场动画 */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.3s ease-in-out;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  transform: translateY(100%);
}

/* 只读输入框样式 */
:deep(.v-field--variant-underlined.v-field--focused) {
  color: #0059b1 !important;
}

:deep(.v-field__append-inner) {
  color: rgba(0, 0, 0, 0.54);
}
</style>

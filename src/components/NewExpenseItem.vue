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
              <div class="autocomplete-container">
                <v-text-field
                  v-model="costCenterText"
                  @click="toggleCostCenterMenu"
                  @focus="toggleCostCenterMenu"
                  @input="filterCostCenters"
                  label="Cost Center11"
                  density="default"
                  height="60"
                  variant="underlined"
                  color="primary"
                  bg-color="white"
                  append-inner-icon="mdi-menu-down"
                  @click:append-inner="toggleCostCenterMenu"
                  clearable
                  @click:clear="clearCostCenter"
                  hide-details
                  class="mb-4"
                ></v-text-field>
                
                <v-menu
                  v-model="costCenterMenu"
                  :close-on-content-click="true"
                  location="bottom"
                  origin="center top"
                  transition="scale-y-transition"
                  :max-height="300"
                  :offset="10"
                  content-class="position-top-menu"
                  attach
                >
                  <v-card>
                    <v-list density="compact">
                      <v-list-item
                        v-for="item in filteredCostCenters"
                        :key="item.ID"
                        :value="item.ID"
                        @click="selectCostCenter(item)"
                      >
                        <v-list-item-title>{{ item.Text }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </div>

            <!-- Expense Type Label -->
            <div class="text-subtitle-2 text-medium-emphasis px-4 pt-4 pb-2"></div>
            
            <!-- Expense Type Field -->
              <div class="autocomplete-container">
                <v-text-field
                  v-model="expenseTypeText"
                  @click="toggleExpenseTypeMenu"
                  @focus="toggleExpenseTypeMenu"
                  @input="filterExpenseTypes"
                  label="Expense Type"
                  density="default"
                  height="60"
                  variant="underlined"
                  color="primary"
                  bg-color="white"
                  append-inner-icon="mdi-menu-down"
                  @click:append-inner="toggleExpenseTypeMenu"
                  clearable
                  @click:clear="clearExpenseType"
                  hide-details
                  required
                ></v-text-field>
                
                <v-menu
                  v-model="expenseTypeMenu"
                  :close-on-content-click="true"
                  location="bottom"
                  origin="center top"
                  transition="scale-y-transition"
                  :max-height="300"
                  :offset="10"
                  content-class="position-top-menu"
                  attach
                >
                  <v-card>
                    <v-list density="compact">
                      <v-list-item
                        v-for="item in filteredExpenseTypes"
                        :key="item.ID"
                        :value="item.ID"
                        @click="selectExpenseType(item)"
                      >
                        <v-list-item-title>{{ item.Text }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
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
              Next 
              <v-icon icon="mdi-chevron-right" class="ml-1"></v-icon>
            </v-btn>
          </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import costCenterData from '../data/costCenter.json';
import expenseTypeData from '../data/expenseType.json';

const router = useRouter();

const formData = ref({
  costCenter: 216, // A/R Channel RMA-18135
  expenseType: null // 初始为空
});

// 初始化自动完成下拉菜单状态
const costCenterMenu = ref(false);
const expenseTypeMenu = ref(false);

// 文本字段的值
const costCenterText = ref('');
const expenseTypeText = ref('');

// 过滤后的选项
const filteredCostCenters = ref([]);
const filteredExpenseTypes = ref([]);

const costCenters = costCenterData;
const expenseTypes = expenseTypeData;

const form = ref(null);

// 初始化时填充字段显示文本
onMounted(() => {
  if (formData.value.costCenter) {
    const selectedCC = costCenters.find(cc => cc.ID === formData.value.costCenter);
    if (selectedCC) {
      costCenterText.value = selectedCC.Text;
    }
  }
  
  // 初始加载所有选项
  filteredCostCenters.value = [...costCenters];
  filteredExpenseTypes.value = [...expenseTypes];
});

// 切换成本中心菜单
const toggleCostCenterMenu = () => {
  costCenterMenu.value = !costCenterMenu.value;
  // 重新加载过滤列表
  filterCostCenters();
};

// 切换费用类型菜单
const toggleExpenseTypeMenu = () => {
  expenseTypeMenu.value = !expenseTypeMenu.value;
  // 重新加载过滤列表
  filterExpenseTypes();
};

// 过滤成本中心选项
const filterCostCenters = () => {
  if (!costCenterText.value) {
    filteredCostCenters.value = [...costCenters];
    return;
  }
  
  const query = costCenterText.value.toLowerCase();
  filteredCostCenters.value = costCenters.filter(
    item => item.Text.toLowerCase().includes(query)
  );
};

// 过滤费用类型选项
const filterExpenseTypes = () => {
  if (!expenseTypeText.value) {
    filteredExpenseTypes.value = [...expenseTypes];
    return;
  }
  
  const query = expenseTypeText.value.toLowerCase();
  filteredExpenseTypes.value = expenseTypes.filter(
    item => item.Text.toLowerCase().includes(query)
  );
};

// 选择成本中心
const selectCostCenter = (item) => {
  formData.value.costCenter = item.ID;
  costCenterText.value = item.Text;
  costCenterMenu.value = false;
};

// 选择费用类型
const selectExpenseType = (item) => {
  formData.value.expenseType = item.ID;
  expenseTypeText.value = item.Text;
  expenseTypeMenu.value = false;
};

// 清除成本中心
const clearCostCenter = () => {
  formData.value.costCenter = null;
  costCenterText.value = '';
};

// 清除费用类型
const clearExpenseType = () => {
  formData.value.expenseType = null;
  expenseTypeText.value = '';
};

const submitForm = () => {
  // 检查表单是否完整
  if (!formData.value.costCenter || !formData.value.expenseType) {
    alert('请填写所有必填项');
    return;
  }
  
  // 提交表单
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

/* 自动完成容器相对定位 */
.autocomplete-container {
  position: relative;
  width: 100%;
}

/* 将菜单放在输入框上方 */
:deep(.position-top-menu) {
  margin-top: -300px !important;
  z-index: 1000;
}

/* 防止输入时键盘遮挡 */
.v-overlay__content {
  position: fixed !important;
  top: 0 !important;
  transform: translateY(0) !important;
}
</style>

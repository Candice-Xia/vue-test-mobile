<template>
  <div class="expense-manager">
    <!-- App Bar -->
    <v-app-bar color="#0059b1" elevation="2">
      <template v-slot:prepend>
        <v-icon color="white" icon="mdi-wallet-outline"></v-icon>
      </template>
      <v-app-bar-title class="text-white">
        <span>Expense Manager</span>
        <span class="text-caption ms-2">Ver 2.1 QAS</span>
      </v-app-bar-title>
      <template v-slot:append>
        <v-avatar size="32" color="white" class="text-blue-darken-3">AM</v-avatar>
      </template>
    </v-app-bar>

    <!-- Expense List -->
    <v-container class="pa-0">
      <v-list class="expense-list">
        <v-list-item
          v-for="expense in expenses"
          :key="expense.id"
          :ripple="false"
          class="expense-item py-2"
        >
          <div class="d-flex flex-column justify-start">
            <div class="text-subtitle-1 font-weight-medium">{{ expense.title }}</div>
            <div class="text-caption" :class="getStatusColor(expense.status)">{{ expense.status }}</div>
          </div>
          <template v-slot:append>
            <div class="text-right">
              <div class="text-caption">{{ expense.date }}</div>
              <div :class="[expense.amount < 0 ? 'text-error' : 'text-primary']">
                {{ formatAmount(expense.amount) }}
              </div>
            </div>
            <v-icon
              v-if="expense.flagged"
              color="error"
              icon="mdi-flag"
              size="small"
              class="ml-2"
            ></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-container>

    <!-- Bottom Navigation -->
    <v-bottom-navigation bg-color="#0059b1" color="white" grow>
      <v-btn @click="goToNewExpense">
        <v-icon icon="mdi-home"></v-icon>
        <span>New</span>
      </v-btn>
      <v-btn @click="goToExpense">
        <v-icon icon="mdi-currency-usd"></v-icon>
        <span>Expense</span>
      </v-btn>
      <v-btn>
        <v-icon icon="mdi-check-circle"></v-icon>
        <span>Approval</span>
      </v-btn>
      <v-btn>
        <v-icon icon="mdi-dots-vertical"></v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToNewExpense = () => {
  router.push('/new-expense');
};

const goToExpense = () => {
  router.push('/expense-detail');
};

// Sample expense data
const expenses = ref([
  {
    id: 1,
    title: 'Test083003',
    status: 'Not submitted',
    date: '8/30/2025',
    amount: 0.00,
    flagged: false
  },
  {
    id: 2,
    title: 'Test083002',
    status: 'Not submitted',
    date: '8/30/2025',
    amount: 0.00,
    flagged: false
  },
  {
    id: 3,
    title: 'test083001',
    status: 'Not submitted',
    date: '8/30/2025',
    amount: 0.00,
    flagged: false
  },
  {
    id: 4,
    title: 'demo by jimmy 2',
    status: 'Not submitted',
    date: '8/19/2025',
    amount: -48.33,
    flagged: true
  },
  {
    id: 5,
    title: 'demo by jm',
    status: 'Under Accounts Payable Review',
    date: '8/19/2025',
    amount: 165.00,
    flagged: true
  },
  {
    id: 6,
    title: 'GO TO BJ',
    status: 'Not submitted',
    date: '8/18/2025',
    amount: 389.00,
    flagged: false
  },
  {
    id: 7,
    title: 'testadddddd',
    status: 'Not submitted',
    date: '8/14/2025',
    amount: 50.00,
    flagged: false
  },
  {
    id: 8,
    title: 'Go to SH',
    status: 'Not submitted',
    date: '6/16/2025',
    amount: 470.00,
    flagged: true
  },
  {
    id: 9,
    title: 'JM TEST 522',
    status: 'Under Manager\'s Review',
    date: '5/22/2025',
    amount: 170.00,
    flagged: false
  },
  {
    id: 10,
    title: 'Jimmy Test 320',
    status: 'Not submitted',
    date: '3/20/2025',
    amount: 45.00,
    flagged: false
  },
  {
    id: 11,
    title: 'Test 1 By JM',
    status: 'Under Accounts Payable Review',
    date: '2/10/2025',
    amount: -160.00,
    flagged: false
  },
  {
    id: 12,
    title: 'test',
    status: 'Under Manager\'s Review',
    date: '1/13/2025',
    amount: 55.00,
    flagged: true
  }
]);

// Format amount with currency sign
const formatAmount = (amount) => {
  return amount.toFixed(2);
};

// Get status color based on status text
const getStatusColor = (status) => {
  if (status === 'Under Accounts Payable Review' || status === 'Under Manager\'s Review') {
    return 'text-grey';
  }
  return 'text-green';
};
</script>

<style scoped>
.expense-manager {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.expense-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0;
  -webkit-overflow-scrolling: touch; /* 为iOS设备添加平滑滚动 */
}

.expense-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>

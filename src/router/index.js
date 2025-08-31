import { createRouter, createWebHistory } from 'vue-router'
import ExpenseManager from '../components/ExpenseManager.vue'
import NewExpenseItem from '../components/NewExpenseItem.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ExpenseManager
    },
    {
      path: '/new-expense',
      name: 'newExpense',
      component: NewExpenseItem
    }
  ]
})

export default router

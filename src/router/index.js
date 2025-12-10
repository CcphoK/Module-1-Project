// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import AttendanceTracker from "@/views/AttendanceTracker.vue";
//import Payroll from "@/views/Payroll.vue";
import AnalyticsCharts from "@/views/AnalyticsCharts.vue";
//import Leave from "@/views/Leave.vue";
import DashboardLayout from "@/components/DashboardLayout.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "employees", component: EmployeeList },
      { path: "attendance", component: AttendanceTracker},
      
      { path: "analytics", component: AnalyticsCharts },
      
    ],
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (to.meta.requiresAuth && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
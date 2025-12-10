<!-- src/layouts/DashboardLayout.vue -->
<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <h2>HR System</h2>
      <ul>
        <li @click="$router.push('/dashboard')" :class="{ active: $route.path === '/dashboard' }">🏠 Dashboard</li>
        <li @click="$router.push('/employees')" :class="{ active: $route.path === '/employees' }">👥 Employees</li>
        <li @click="$router.push('/attendance')" :class="{ active: $route.path === '/attendance' }">⏱ Attendance</li>
        <li @click="$router.push('/payroll')" :class="{ active: $route.path === '/payroll' }">💰 Payroll</li>
        <li @click="$router.push('/analytics')" :class="{ active: $route.path === '/analytics' }">📊 Analytics</li>
        <li @click="$router.push('/leave')" :class="{ active: $route.path === '/leave' }">📝 Leave</li>
        <li @click="logout" class="logout-button">🚪 Logout</li>
      </ul>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userRole");
  router.push("/login");
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
}

.sidebar {
  width: 280px;
  padding: 30px 20px;
  background: white;
  border-right: 1px solid #e5e7eb;
}
.sidebar h2 {
  font-size: 24px;
  margin-bottom: 30px;
  color: #2d3748;
  text-align: center;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 14px 20px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.sidebar li:hover,
.sidebar li.active {
  background: #f0fdf4;
  color: #48bb78;
  font-weight: 600;
}
.logout-button {
  margin-top: 40px;
  color: #dc2626 !important;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 40px;
}
</style>
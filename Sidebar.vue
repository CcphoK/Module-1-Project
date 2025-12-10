<template>
  <aside class="sidebar">
    <h2>HR System</h2>
    <ul>
      <li @click="$emit('change-tab','Dashboard')" :class="{ active: activeTab === 'Dashboard' }">🏠 Dashboard</li>
      <li @click="$emit('change-tab','Employees')" :class="{ active: activeTab === 'Employees' }">👥 Employees</li>
      <li @click="$emit('change-tab','Attendance')" :class="{ active: activeTab === 'Attendance' }">⏱ Attendance</li>
      <li @click="$emit('change-tab','Payroll')" :class="{ active: activeTab === 'Payroll' }">💰 Payroll</li>
      <li @click="$emit('change-tab','Analytics')" :class="{ active: activeTab === 'Analytics' }">📊 Analytics</li>
      <li @click="$emit('change-tab','Leave')" :class="{ active: activeTab === 'Leave' }">📝 Leave</li>
      <li @click="$emit('logout')" class="logout-button">🚪 Logout</li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  activeTab: String
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: white;
  padding: 25px 18px;
  border-right: 1px solid #e5e7eb;
}

.sidebar h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #3a7afe;
  font-weight: bold;
}

.sidebar li {
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.25s;
}

.sidebar li:hover,
.sidebar li.active {
  background: #eef3ff;
  color: #3a7afe;
  transform: translateX(4px);
}

.logout-button {
  margin-top: 30px;
  color: #dc2626 !important;
  font-weight: 700;
}
</style>

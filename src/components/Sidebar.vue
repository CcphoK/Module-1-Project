<template>
  <aside class="sidebar">
    <h2>HR System</h2>
    <ul>
      <li v-for="tab in tabs" :key="tab.name" 
          :class="{active: activeTab===tab.name}" 
          @click="$emit('changeTab', tab.name)">
        {{ tab.icon }} {{ tab.name }}
      </li>
      <li class="logout-button" @click="$emit('logout')">🚪 Logout</li>
    </ul>
  </aside>
</template>

<script setup>
const props = defineProps({ activeTab: String });
const tabs = [
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Employees', icon: '👥' },
  { name: 'Attendance', icon: '⏱' },
  { name: 'Payroll', icon: '💰' },
  { name: 'Analytics', icon: '📊' },
  { name: 'Leave', icon: '📝' },
];
</script>

<style scoped>
/* Paste your sidebar CSS here */
</style>

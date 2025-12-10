<template>
  <div class="widget">
    <h3>Attendance</h3>
    <ul>
      <li v-for="att in attendanceData" :key="att.name">
        {{ att.name }} - {{ att.status }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ attendanceData: Array });
</script>

<style scoped>
.widget {
  border: 1px solid #ccc;
  padding: 15px;
  width: 200px;
}
</style>

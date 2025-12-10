<template>
  <div class="widget">
    <h3>Payroll Summary</h3>
    <ul>
      <li v-for="pay in payrollData" :key="pay.employeeId">
        Employee {{ pay.employeeId }}: ${{ pay.finalSalary }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ payrollData: Array });
</script>

<style scoped>
.widget {
  border: 1px solid #ccc;
  padding: 15px;
  width: 200px;
}
</style>

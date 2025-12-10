<template>
  <div class="charts-container">
    <h2>Analytics Overview</h2>

    <div class="chart-row">
      <canvas ref="departmentChart"></canvas>
      <canvas ref="attendanceChart"></canvas>
    </div>

    <div class="chart-row">
      <canvas ref="salaryChart"></canvas>
      <canvas ref="tenureChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import Chart from 'chart.js/auto';

const props = defineProps({ analyticsData: Object });

const departmentChart = ref(null);
const attendanceChart = ref(null);
const salaryChart = ref(null);
const tenureChart = ref(null);

onMounted(() => {
  // Department Distribution
  new Chart(departmentChart.value, {
    type: 'bar',
    data: {
      labels: Object.keys(props.analyticsData.departmentDistribution),
      datasets: [{
        label: 'Employees',
        data: Object.values(props.analyticsData.departmentDistribution),
        backgroundColor: '#4e79a7',
      }]
    }
  });

  // Monthly Attendance
  new Chart(attendanceChart.value, {
    type: 'line',
    data: {
      labels: props.analyticsData.monthlyAttendance.map(a => a.month),
      datasets: [
        { label: 'Present', data: props.analyticsData.monthlyAttendance.map(a => a.present), borderColor: '#59a14f', fill: false },
        { label: 'Absent', data: props.analyticsData.monthlyAttendance.map(a => a.absent), borderColor: '#e15759', fill: false }
      ]
    }
  });

  // Salary Distribution
  new Chart(salaryChart.value, {
    type: 'pie',
    data: {
      labels: props.analyticsData.salaryDistribution.map((_, i) => `Emp ${i + 1}`),
      datasets: [{ data: props.analyticsData.salaryDistribution, backgroundColor: ['#76b7b2', '#59a14f', '#edc949', '#e15759', '#4e79a7'] }]
    }
  });

  // Employee Tenure
  new Chart(tenureChart.value, {
    type: 'bar',
    data: {
      labels: props.analyticsData.employeeTenure.map((_, i) => `Emp ${i + 1}`),
      datasets: [{ label: 'Years of Tenure', data: props.analyticsData.employeeTenure, backgroundColor: '#f28e2b' }]
    }
  });
});
</script>

<style scoped>
.charts-container { margin-top: 30px; }
.chart-row { display: flex; gap: 30px; margin-bottom: 40px; }
canvas { max-width: 400px; max-height: 300px; }
</style>

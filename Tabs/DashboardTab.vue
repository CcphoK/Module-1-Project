<template>
  <div>
    <h1>Employee Dashboard</h1>
    <div class="widgets-section">
      <EmployeeCountWidget :count="employeeData.length" />
      <DepartmentStatsWidget :departments="departmentStats" />
      <PayrollSummaryWidget :payrollData="payrollData" />
      <AttendanceWidget :attendanceData="attendanceData" />
    </div>
  </div>
</template>

<script setup>
import EmployeeCountWidget from "../Widgets/EmployeeCountWidget.vue";
import DepartmentStatsWidget from "../Widgets/DepartmentStatsWidget.vue";
import PayrollSummaryWidget from "../Widgets/PayrollSummaryWidget.vue";
import AttendanceWidget from "../Widgets/AttendanceWidget.vue";

// Sample data
const employeeData = [
  { employeeId: 1, name: "Sibongile Nkosi", position: "Software Engineer", department: "Development", salary: 70000 },
  { employeeId: 2, name: "Lungile Moyo", position: "HR Manager", department: "HR", salary: 80000 },
];

const departmentStats = {
  HR: 1, Development: 1, QA: 1, Sales: 1, Marketing: 2, Design: 1, IT: 1, Finance: 1, Support: 1
};

const payrollData = [
  { employeeId: 1, hoursWorked: 160, leaveDeductions: 8, finalSalary: 69500 },
  { employeeId: 2, hoursWorked: 150, leaveDeductions: 10, finalSalary: 79000 },
];

const attendanceData = employeeData.map(emp => ({
  name: emp.name,
  status: "Present"
}));
</script>

<style scoped>
.widgets-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
  margin-top: 20px;
}
</style>

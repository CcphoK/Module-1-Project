<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <h2>HR System</h2>
      <ul>
        <li @click="activeTab = 'Dashboard'" :class="{ active: activeTab === 'Dashboard' }">🏠 Dashboard</li>
        <li @click="activeTab = 'Employees'" :class="{ active: activeTab === 'Employees' }">👥 Employees</li>
        <li @click="activeTab = 'Attendance'" :class="{ active: activeTab === 'Attendance' }">⏱ Attendance</li>
        <li @click="activeTab = 'Payroll'" :class="{ active: activeTab === 'Payroll' }">💰 Payroll</li>
        <li @click="activeTab = 'Analytics'" :class="{ active: activeTab === 'Analytics' }">📊 Analytics</li>
        <li @click="activeTab = 'Leave'" :class="{ active: activeTab === 'Leave' }">📝 Leave</li>
        <li @click="logout" class="logout-button">🚪 Logout</li>
      </ul>
    </aside>

    <div class="main-content">
      <div v-show="activeTab === 'Dashboard'">
        <header class="top-nav">
          <h1>Employee Dashboard</h1>
        </header>
        <section class="widgets-section">
          <div class="widget">Employee Count: {{ employeeData.length }}</div>
          <div class="widget">Departments: {{ Object.keys(departmentStats).length }}</div>
          <div class="widget">Payroll Records: {{ payrollData.length }}</div>
          <div class="widget">Attendance: All Present</div>
        </section>
      </div>

      <div v-show="activeTab === 'Leave'">
        <section class="leave-form">
          <h2 class="leave-title">Request Time Off</h2>
          <p class="leave-sub">Fill in the details below to submit your leave request</p>

          <div class="leave-input-group">
            <input v-model="leaveForm.employee" required placeholder=" " />
            <label>Employee Name</label>
          </div>

          <div class="leave-row">
            <div class="leave-input-group">
              <input v-model="leaveForm.startDate" type="date" required placeholder=" " />
              <label>Start Date</label>
            </div>
            <div class="leave-input-group">
              <input v-model="leaveForm.endDate" type="date" required placeholder=" " />
              <label>End Date</label>
            </div>
          </div>

          <div class="leave-input-group">
            <textarea v-model="leaveForm.reason" required placeholder=" "></textarea>
            <label>Reason for Leave</label>
          </div>

          <button class="leave-btn" @click="submitLeave">Submit Request</button>

          <div v-if="leaveRequests.length" class="leave-history">
            <h3>Recent Leave Requests</h3>
            <ul>
              <li v-for="(req, index) in leaveRequests" :key="index">
                <strong>{{ req.employee }}</strong>:
                {{ req.startDate }} → {{ req.endDate }}
                <span>| {{ req.reason }}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div v-show="activeTab !== 'Dashboard' && activeTab !== 'Leave'" class="blank-section">
        <p>This section is coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("Dashboard");

// Sample data
const employeeData = ref([
  { employeeId: 1, name: "Sibongile Nkosi", position: "Software Engineer", department: "Development", salary: 70000 },
  { employeeId: 2, name: "Lungile Moyo", position: "HR Manager", department: "HR", salary: 80000 },
]);

const departmentStats = ref({
  HR: 1,
  Development: 1,
  QA: 1,
});

const payrollData = ref([
  { employeeId: 1, hoursWorked: 160, leaveDeductions: 8, finalSalary: 69500 },
  { employeeId: 2, hoursWorked: 150, leaveDeductions: 10, finalSalary: 79000 },
]);

const attendanceData = computed(() =>
  employeeData.value.map(emp => ({ name: emp.name, status: "Present" }))
);

const leaveForm = ref({ employee: "", startDate: "", endDate: "", reason: "" });
const leaveRequests = ref([]);

function submitLeave() {
  if (leaveForm.value.employee && leaveForm.value.startDate && leaveForm.value.endDate) {
    leaveRequests.value.push({ ...leaveForm.value });
    leaveForm.value = { employee: "", startDate: "", endDate: "", reason: "" };
    alert("Leave request submitted.");
  } else {
    alert("Please fill all required fields.");
  }
}

// ✅ Proper logout
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

.top-nav h1 {
  font-size: 28px;
  color: #1a202c;
  margin-bottom: 24px;
}

.widgets-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
.widget {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  font-weight: 600;
  color: #2d3748;
}

/* Leave Form */
.leave-form {
  max-width: 700px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.leave-title {
  font-size: 24px;
  color: #2d3748;
  margin-bottom: 10px;
}
.leave-sub {
  color: #6b7280;
  margin-bottom: 24px;
}
.leave-input-group {
  position: relative;
  margin-bottom: 20px;
}
.leave-input-group input,
.leave-input-group textarea {
  width: 100%;
  padding: 12px 12px 12px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}
.leave-input-group textarea {
  min-height: 100px;
  resize: vertical;
}
.leave-input-group label {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #6b7280;
  pointer-events: none;
  background: white;
  padding: 0 4px;
}
.leave-input-group input:focus + label,
.leave-input-group textarea:focus + label {
  top: -10px;
  left: 8px;
  font-size: 14px;
  color: #48bb78;
  font-weight: 600;
}
.leave-row {
  display: flex;
  gap: 16px;
}
.leave-btn {
  width: 100%;
  padding: 12px;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}
.leave-btn:hover {
  background: #3fb16e;
}

.leave-history {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}
.leave-history h3 {
  margin-bottom: 16px;
  color: #2d3748;
}
.leave-history li {
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 10px;
}
.leave-history li span {
  color: #6b7280;
}

.blank-section {
  padding: 60px;
  text-align: center;
  color: #6b7280;
  font-size: 18px;
}
</style>
<template>
  <div>
   
    <div v-if="!isLoggedIn" class="login-wrapper">
      <div class="login-box">
        <h2>Welcome Back</h2>
        <p class="subtitle">Sign in to continue to the HR System</p>

        <div class="input-group">
          <input v-model="loginEmail" type="email" required placeholder=" " />
          <label>Email</label>
        </div>

        <div class="input-group">
          <input v-model="loginPassword" type="password" required placeholder=" " />
          <label>Password</label>
        </div>

        <button class="login-btn" @click="login">Log In</button>
        <p class="footer-text">© 2025 HR Management System</p>
      </div>
    </div>

   
    <div v-else class="dashboard">

     
      <aside class="sidebar">
        <h2>HR System</h2>
        <ul>
          <li @click="activeTab='Dashboard'" :class="{ active: activeTab === 'Dashboard' }">🏠 Dashboard</li>
          <li @click="activeTab='Employees'" :class="{ active: activeTab === 'Employees' }">👥 Employees</li>
          <li @click="activeTab='Attendance'" :class="{ active: activeTab === 'Attendance' }">⏱ Attendance</li>
          <li @click="activeTab='Payroll'" :class="{ active: activeTab === 'Payroll' }">💰 Payroll</li>
          <li @click="activeTab='Analytics'" :class="{ active: activeTab === 'Analytics' }">📊 Analytics</li>
          <li @click="activeTab='Leave'" :class="{ active: activeTab === 'Leave' }">📝 Leave</li>
          <li @click="logout" class="logout-button">🚪 Logout</li>
        </ul>
      </aside>

     
      <div class="main-content">

      
        <div v-show="activeTab === 'Dashboard'">
          <header class="top-nav">
            <h1>Employee Dashboard</h1>
          </header>

          
          <section class="widgets-section">
            <EmployeeCountWidget :count="employeeData.length" />
            <DepartmentStatsWidget :departments="departmentStats" />
            <PayrollSummaryWidget :payrollData="payrollData" />
            <AttendanceWidget :attendanceData="attendanceData" />
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

        
        <div v-show="activeTab !== 'Dashboard' && activeTab !== 'Leave'">
          <p class="blank-section">This section is coming soon...</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


import EmployeeCountWidget from "./Widgets/EmployeeCountWidget.vue";
import DepartmentStatsWidget from "./Widgets/DepartmentStatsWidget.vue";
import PayrollSummaryWidget from "./Widgets/PayrollSummaryWidget.vue";
import AttendanceWidget from "./Widgets/AttendanceWidget.vue";


const loginEmail = ref("");
const loginPassword = ref("");
const isLoggedIn = ref(false);

function login() {
  if (loginEmail.value && loginPassword.value) {
    isLoggedIn.value = true;
  } else {
    alert("Please enter email and password.");
  }
}

function logout() {
  isLoggedIn.value = false;
  loginEmail.value = "";
  loginPassword.value = "";
  activeTab.value = "Dashboard";
}


const activeTab = ref("Dashboard");


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
</script>

<style scoped>

</style>

<style scoped>

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-box {
  width: 450px;
  padding: 55px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  text-align: center;
  color: white;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  animation: fadeIn 0.6s ease;
}

.login-box h2 {
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 700;
}
.subtitle {
  opacity: 0.9;
  margin-bottom: 35px;
  font-size: 17px;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}
.input-group input {
  width: 100%; 
  padding: 18px 14px; 
  border-radius: 15px;
  border: none; 
  color: white; 
  background: rgba(255,255,255,0.25); 
  outline: none;
  font-size: 16px;
  transition: all 0.3s ease;
}
.input-group input:focus { background: rgba(255,255,255,0.35); }
.input-group label {
  position: absolute; 
  left: 14px; 
  top: 18px; 
  color: #f1f1f1;
  pointer-events: none; 
  transition: 0.3s ease;
}
.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -10px; 
  left: 10px; 
  font-size: 12px;
  background: rgba(255,255,255,0.3); 
  padding: 2px 6px; 
  border-radius: 6px;
}

.login-btn {
  width: 100%; 
  padding: 18px; 
  border-radius: 15px;
  background: white; 
  color: #4f46e5; 
  border: none; 
  font-weight: 700;
  font-size: 18px; 
  cursor: pointer; 
  transition: all 0.3s ease;
}
.login-btn:hover { 
  background: #eef2ff; 
  transform: translateY(-3px);
}
.footer-text { margin-top: 15px; opacity: 0.85; font-size: 13px; }


.dashboard { display: flex; min-height: 100vh; background: #f3f4f6; }


.sidebar {
  width: 300px; 
  padding: 35px 25px; 
  background: white; 
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar h2 {
  font-size: 28px; 
  margin-bottom: 35px; 
  color: #4f46e5;
  text-align: center;
}
.sidebar ul { padding: 0; list-style: none; }
.sidebar li {
  font-size: 18px;
  padding: 18px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}
.sidebar li:hover,
.sidebar li.active {
  background: #eef2ff;
  color: #4f46e5;
  transform: translateX(6px);
  font-weight: 600;
}
.logout-button {
  margin-top: 40px;
  font-weight: 700;
  color: #ef4444 !important;
}

.main-content { flex: 1; padding: 50px; }


.top-nav h1 { font-size: 34px; font-weight: 700; margin-bottom: 30px; color: #1f2937; }


.widgets-section {
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 30px;
}
.widgets-section > * {
  background: white; 
  padding: 30px; 
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0,0,0,0.08); 
  transition: all 0.3s ease;
}
.widgets-section > *:hover { 
  transform: translateY(-5px); 
  box-shadow: 0px 15px 35px rgba(0,0,0,0.15); 
}


.leave-form {
  background: rgba(255,255,255,0.85); 
  backdrop-filter: blur(15px);
  padding: 45px; 
  border-radius: 25px; 
  box-shadow: 0px 12px 40px rgba(0,0,0,0.1);
  max-width: 850px;
  margin: auto;
}
.leave-title { font-size: 32px; font-weight: 700; color: #4f46e5; margin-bottom: 15px; }
.leave-sub { font-size: 16px; color: #6b7280; margin-bottom: 35px; }

.leave-input-group { position: relative; margin-bottom: 25px; }
.leave-input-group input,
.leave-input-group textarea {
  width: 100%; padding: 16px; padding-top: 22px; background: rgba(255,255,255,0.4);
  border: 1px solid #d1d5db; border-radius: 15px; outline: none; font-size: 16px; transition: 0.3s; resize: none;
}
.leave-input-group textarea { min-height: 130px; }
.leave-input-group input:focus,
.leave-input-group textarea:focus {
  border-color: #4f46e5; background: rgba(255,255,255,0.55);
  box-shadow: 0px 5px 15px rgba(79,70,229,0.2);
}
.leave-input-group label {
  position: absolute; top: 16px; left: 18px; background: transparent; padding: 0 4px;
  font-size: 15px; color: #6b7280; pointer-events: none; transition: 0.25s ease;
}
.leave-input-group input:focus + label,
.leave-input-group textarea:focus + label,
.leave-input-group input:not(:placeholder-shown) + label,
.leave-input-group textarea:not(:placeholder-shown) + label {
  top: -10px; left: 12px; background: rgba(255,255,255,0.8);
  padding: 2px 6px; border-radius: 6px; font-size: 13px; color: #4f46e5;
}
.leave-row { display: flex; gap: 25px; }
.leave-btn {
  width: 100%; background: #4f46e5; padding: 18px; margin-top: 12px;
  border: none; color: white; border-radius: 18px; font-size: 18px;
  font-weight: 700; cursor: pointer; transition: 0.3s ease; box-shadow: 0px 8px 20px rgba(79,70,229,0.3);
}
.leave-btn:hover { background: #3730a3; transform: translateY(-3px); }
.leave-btn:active { transform: scale(0.97); }

.leave-history { margin-top: 45px; padding-top: 25px; border-top: 1px solid #e5e7eb; }
.leave-history h3 { font-size: 24px; margin-bottom: 18px; }
.leave-history li {
  margin-bottom: 15px; background: white; border-radius: 15px;
  padding: 16px 18px; box-shadow: 0 5px 18px rgba(0,0,0,0.07);
}
.leave-history li span { color: #6b7280; font-size: 15px; }

.blank-section { padding: 60px; font-size: 20px; text-align: center; color: #6b7280; }
</style>

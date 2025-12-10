<!-- src/views/EmployeeProfile.vue -->
<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-avatar">
        {{ employee.name ? employee.name.charAt(0) : '?' }}
      </div>
      <h1>{{ employee.name || 'Employee Not Found' }}</h1>
      <p class="subtitle">{{ employee.position }} • {{ employee.department }}</p>
    </div>

    <div class="profile-section">
      <h3>Personal Information</h3>
      <div class="info-grid">
        <div class="info-item">
          <strong>Employee ID:</strong>
          <span>{{ employee.employeeId }}</span>
        </div>
        <div class="info-item">
          <strong>Department:</strong>
          <span>{{ employee.department }}</span>
        </div>
        <div class="info-item">
          <strong>Position:</strong>
          <span>{{ employee.position }}</span>
        </div>
        <div class="info-item">
          <strong>Salary:</strong>
          <span>R{{ employee.salary ? employee.salary.toLocaleString() : 'N/A' }}</span>
        </div>
        <div class="info-item">
          <strong>Contact:</strong>
          <span>{{ employee.contact }}</span>
        </div>
        <div class="info-item">
          <strong>Employment History:</strong>
          <span>{{ employee.employmentHistory }}</span>
        </div>
      </div>
    </div>

    <div class="profile-actions">
      <button @click="$router.push('/employees')" class="btn btn-secondary">
        ← Back to List
      </button>
      <button 
        @click="$router.push(`/employee/${employee.employeeId}/edit`)" 
        class="btn btn-primary"
        :disabled="!employee.employeeId"
      >
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script>
import { employeeInformation as employeeData } from "../data/employee.js";

export default {
  name: "EmployeeProfile",
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    employee() {
      const id = parseInt(this.id);
      return employeeData.find(emp => emp.employeeId === id) || {};
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0eaff;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #c3b3ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 16px;
}

.profile-header h1 {
  margin: 0 0 8px;
  color: #2c3e50;
  font-size: 28px;
}

.subtitle {
  color: #7f8c8d;
  margin: 0;
  font-size: 18px;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-section h3 {
  color: #2c3e50;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0eaff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  background: #f9f5ff;
  padding: 14px;
  border-radius: 8px;
}

.info-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

.info-item span {
  color: #34495e;
  word-break: break-word;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: opacity 0.2s;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}
.btn-secondary:hover:not(:disabled) {
  background: #7f8c8d;
}

.btn-primary {
  background: #3498db;
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

@media (max-width: 768px) {
  .profile-container {
    margin: 15px;
    padding: 20px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .profile-actions {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
}
</style>
<template>
  <div class="operations-page">
    <h1>HR Operations Dashboard</h1>
    
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.id"
              :class="['tab-button', { 'active': activeTab === tab.id }]"
              @click="activeTab = tab.id">
        {{ tab.label }}
      </button>
    </div>
    
    <div class="tab-content">
      <div v-if="activeTab === 'payroll'">
        <PayrollCalculator />
      </div>
      
      <div v-else-if="activeTab === 'timeoff'">
        <TimeOffManager :timeOffRequests="timeOffRequests" />
      </div>
      
      <div v-else-if="activeTab === 'attendance'">
        <AttendanceTracker :attendanceRecords="attendanceRecords" />
      </div>
      
      <div v-else-if="activeTab === 'reports'">
        <ReportsGenerator :timeOffRequests="timeOffRequests" :attendanceRecords="attendanceRecords" />
      </div>
    </div>
  </div>
</template>

<script>
import PayrollCalculator from '@/components/PayrollCalculator.vue';
import TimeOffManager from '@/components/TimeOffManager.vue';
import AttendanceTracker from '@/components/AttendanceTracker.vue';
import ReportsGenerator from '@/components/ReportsGenerator.vue';

export default {
  name: 'Operations',
  components: {
    PayrollCalculator,
    TimeOffManager,
    AttendanceTracker,
    ReportsGenerator
  },
  data() {
    return {
      activeTab: 'payroll',
      tabs: [
        { id: 'payroll', label: 'Payroll' },
        { id: 'timeoff', label: 'Time Off' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'reports', label: 'Reports' }
      ],
      timeOffRequests: [],
      attendanceRecords: []
    };
  }
}
</script>

<style scoped>
.operations-page {
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.tab-button {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.tab-button:hover {
  color: #3498db;
}

.tab-button.active {
  color: #3498db;
  border-bottom: 3px solid #3498db;
}

.tab-content {
  min-height: 500px;
}
</style>
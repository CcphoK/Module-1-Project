<template>
  <div class="reports-generator">
    <h2>Reports Generator</h2>
    
    <div class="report-selection">
      <div class="report-card" 
           :class="{ 'selected': selectedReport === 'payroll' }"
           @click="selectReport('payroll')">
        <h3>Payroll Report</h3>
        <p>Salary analysis and payroll breakdown</p>
      </div>
      
      <div class="report-card"
           :class="{ 'selected': selectedReport === 'attendance' }"
           @click="selectReport('attendance')">
        <h3>Attendance Report</h3>
        <p>Attendance patterns and trends</p>
      </div>
      
      <div class="report-card"
           :class="{ 'selected': selectedReport === 'leave' }"
           @click="selectReport('leave')">
        <h3>Leave Report</h3>
        <p>Leave usage and patterns</p>
      </div>
    </div>
    
    <div v-if="selectedReport" class="report-content">
      <div class="report-header">
        <h3>{{ reportTitle }} Report</h3>
        <div class="report-actions">
          <button @click="generateReport" class="btn-primary">Generate</button>
          <button @click="exportReport" class="btn-secondary">Export PDF</button>
        </div>
      </div>
      
      <div class="report-options">
        <select v-model="reportPeriod">
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
        
        <select v-model="departmentFilter">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept">{{ dept }}</option>
        </select>
      </div>
      
      <div v-if="selectedReport === 'payroll'" class="report-data">
        <h4>Payroll Summary</h4>
        <div class="summary-stats">
          <div class="stat">
            <span class="stat-label">Total Payroll</span>
            <span class="stat-value">R{{ totalPayroll.toLocaleString() }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Average Salary</span>
            <span class="stat-value">R{{ avgSalary.toLocaleString() }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Employees</span>
            <span class="stat-value">{{ payrollData.length }}</span>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Hours Worked</th>
              <th>Final Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredPayroll" :key="item.employeeId">
              <td>{{ getEmployeeName(item.employeeId) }}</td>
              <td>{{ getEmployeeDepartment(item.employeeId) }}</td>
              <td>{{ item.hoursWorked }}</td>
              <td>R{{ item.finalSalary.toLocaleString() }}</td>
              <td>
                <span :class="['status', item.hoursWorked >= 160 ? 'good' : 'warning']">
                  {{ item.hoursWorked >= 160 ? 'Good' : 'Low Hours' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="selectedReport === 'attendance'" class="report-data">
        <h4>Attendance Summary</h4>
        <div class="summary-stats">
          <div class="stat">
            <span class="stat-label">Attendance Rate</span>
            <span class="stat-value">{{ attendanceRate }}%</span>
          </div>
          <div class="stat">
            <span class="stat-label">Present Days</span>
            <span class="stat-value">{{ presentCount }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Absent Days</span>
            <span class="stat-value">{{ absentCount }}</span>
          </div>
        </div>
        
        <div class="chart-placeholder">
          <p>Attendance chart would appear here</p>
        </div>
      </div>
      
      <div v-if="selectedReport === 'leave'" class="report-data">
        <h4>Leave Analysis</h4>
        <div class="summary-stats">
          <div class="stat">
            <span class="stat-label">Total Leave Days</span>
            <span class="stat-value">{{ totalLeaveDays }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Average Leave</span>
            <span class="stat-value">{{ avgLeaveDays }} days</span>
          </div>
          <div class="stat">
            <span class="stat-label">Most Leave Type</span>
            <span class="stat-value">{{ mostCommonLeave }}</span>
          </div>
        </div>
        
        <div class="chart-placeholder">
          <p>Leave distribution chart would appear here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { employeeInformation, payrollData } from '@/data/dummyData.js';

export default {
  name: 'ReportsGenerator',
  props: {
    timeOffRequests: {
      type: Array,
      default: () => []
    },
    attendanceRecords: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      employeeInformation,
      payrollData,
      selectedReport: 'payroll',
      reportPeriod: 'monthly',
      departmentFilter: ''
    };
  },
  computed: {
    reportTitle() {
      const titles = {
        payroll: 'Payroll',
        attendance: 'Attendance',
        leave: 'Leave'
      };
      return titles[this.selectedReport] || 'Report';
    },
    departments() {
      const depts = new Set();
      this.employeeInformation.forEach(emp => depts.add(emp.department));
      return Array.from(depts);
    },
    totalPayroll() {
      return this.payrollData.reduce((sum, item) => sum + item.finalSalary, 0);
    },
    avgSalary() {
      return this.totalPayroll / this.payrollData.length;
    },
    filteredPayroll() {
      let filtered = [...this.payrollData];
      
      if (this.departmentFilter) {
        filtered = filtered.filter(item => {
          const emp = this.getEmployeeInfo(item.employeeId);
          return emp && emp.department === this.departmentFilter;
        });
      }
      
      return filtered;
    },
    attendanceRate() {
      const present = this.attendanceRecords.filter(r => r.status === 'Present').length;
      const total = this.attendanceRecords.length;
      return total > 0 ? Math.round((present / total) * 100) : 0;
    },
    presentCount() {
      return this.attendanceRecords.filter(r => r.status === 'Present').length;
    },
    absentCount() {
      return this.attendanceRecords.filter(r => r.status === 'Absent').length;
    },
    totalLeaveDays() {
      return this.timeOffRequests
        .filter(r => r.status === 'Approved')
        .reduce((sum, r) => sum + (r.totalDays || 0), 0);
    },
    avgLeaveDays() {
      const approved = this.timeOffRequests.filter(r => r.status === 'Approved');
      return approved.length > 0 
        ? Math.round(this.totalLeaveDays / approved.length)
        : 0;
    },
    mostCommonLeave() {
      const types = {};
      this.timeOffRequests.forEach(r => {
        types[r.type] = (types[r.type] || 0) + 1;
      });
      
      let mostCommon = '';
      let maxCount = 0;
      
      Object.keys(types).forEach(type => {
        if (types[type] > maxCount) {
          maxCount = types[type];
          mostCommon = type;
        }
      });
      
      return mostCommon || 'None';
    }
  },
  methods: {
    selectReport(report) {
      this.selectedReport = report;
    },
    getEmployeeInfo(employeeId) {
      return this.employeeInformation.find(emp => emp.employeeId === employeeId);
    },
    getEmployeeName(employeeId) {
      const emp = this.getEmployeeInfo(employeeId);
      return emp ? emp.name : 'Unknown';
    },
    getEmployeeDepartment(employeeId) {
      const emp = this.getEmployeeInfo(employeeId);
      return emp ? emp.department : 'Unknown';
    },
    generateReport() {
      alert(`Generating ${this.reportTitle} report for ${this.reportPeriod} period...`);
    },
    exportReport() {
      alert(`Exporting ${this.reportTitle} report as PDF...`);
    }
  }
}
</script>

<style scoped>
.reports-generator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.report-selection {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.report-card {
  flex: 1;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.report-card:hover {
  border-color: #3498db;
  background-color: #f8f9fa;
}

.report-card.selected {
  border-color: #3498db;
  background-color: #e8f4fd;
}

.report-card h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.report-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.report-content {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.report-header h3 {
  margin: 0;
}

.report-actions {
  display: flex;
  gap: 10px;
}

.report-options {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.report-options select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.report-data h4 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.summary-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  flex: 1;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #3498db;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

table th {
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.status {
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

.status.good {
  background-color: #2ecc71;
  color: white;
}

.status.warning {
  background-color: #f1c40f;
  color: #333;
}

.chart-placeholder {
  height: 200px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #e74c3c;
  color: white;
}
</style>
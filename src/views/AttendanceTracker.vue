<template>
  <div class="attendance-tracker">
    <h2>Attendance Tracker</h2>
    
    <div class="controls">
      <div class="control-group">
        <label>Select Employee:</label>
        <select v-model="selectedEmployeeId">
          <option value="">All Employees</option>
          <option v-for="emp in employeeInformation" :key="emp.employeeId" :value="emp.employeeId">
            {{ emp.name }}
          </option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Month:</label>
        <select v-model="currentMonth">
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="summary-cards">
      <div class="summary-card">
        <h4>{{ presentCount }}</h4>
        <p>Present Days</p>
      </div>
      <div class="summary-card">
        <h4>{{ absentCount }}</h4>
        <p>Absent Days</p>
      </div>
      <div class="summary-card">
        <h4>{{ attendanceRate }}%</h4>
        <p>Attendance Rate</p>
      </div>
    </div>
    
    <div class="calendar">
      <div class="calendar-header">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="day-header">
          {{ day }}
        </div>
      </div>
      <div class="calendar-body">
        <div v-for="day in calendarDays" :key="day.date" 
             :class="['calendar-day', { 'today': day.isToday, 'weekend': day.isWeekend }]"
             @click="toggleAttendance(day)">
          <div class="day-number">{{ day.day }}</div>
          <div v-if="day.attendance" class="attendance-status">
            <span :class="['status-dot', day.attendance.status.toLowerCase()]"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="attendance-list">
      <h3>Recent Records</h3>
      <div v-for="record in recentRecords" :key="record.id" class="record-item">
        <div class="record-date">{{ formatDate(record.date) }}</div>
        <div class="record-details">
          <span class="employee-name">{{ getEmployeeName(record.employeeId) }}</span>
          <span :class="['status-badge', record.status.toLowerCase()]">{{ record.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { employeeInformation } from '@/data/employee.js';

export default {
  name: 'AttendanceTracker',
  data() {
    const today = new Date();
    return {
      employeeInformation,
      selectedEmployeeId: '',
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      attendanceRecords: [
        { id: 1, employeeId: 1, date: '2024-12-01', status: 'Present' },
        { id: 2, employeeId: 1, date: '2024-12-02', status: 'Present' },
        { id: 3, employeeId: 2, date: '2024-12-01', status: 'Present' },
        { id: 4, employeeId: 3, date: '2024-12-01', status: 'Absent' }
      ]
    };
  },
  computed: {
    calendarDays() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const today = new Date();
      
      // Previous month days
      const firstDayOfWeek = firstDay.getDay();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(firstDay);
        date.setDate(date.getDate() - (i + 1));
        days.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          isCurrentMonth: false
        });
      }
      
      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i);
        const dateStr = date.toISOString().split('T')[0];
        const isToday = date.toDateString() === today.toDateString();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        
        // Find attendance for this date
        let attendance = null;
        if (this.selectedEmployeeId) {
          attendance = this.attendanceRecords.find(r => 
            r.employeeId === parseInt(this.selectedEmployeeId) && r.date === dateStr
          );
        }
        
        days.push({
          date: dateStr,
          day: i,
          isCurrentMonth: true,
          isToday: isToday,
          isWeekend: isWeekend,
          attendance: attendance
        });
      }
      
      return days;
    },
    recentRecords() {
      return this.attendanceRecords
        .filter(r => !this.selectedEmployeeId || r.employeeId === parseInt(this.selectedEmployeeId))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);
    },
    presentCount() {
      return this.attendanceRecords.filter(r => r.status === 'Present').length;
    },
    absentCount() {
      return this.attendanceRecords.filter(r => r.status === 'Absent').length;
    },
    attendanceRate() {
      const total = this.presentCount + this.absentCount;
      return total > 0 ? Math.round((this.presentCount / total) * 100) : 0;
    }
  },
  methods: {
    getEmployeeName(employeeId) {
      const emp = this.employeeInformation.find(e => e.employeeId === employeeId);
      return emp ? emp.name : 'Unknown';
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    },
    toggleAttendance(day) {
      if (day.isCurrentMonth && this.selectedEmployeeId) {
        const existingIndex = this.attendanceRecords.findIndex(r => 
          r.employeeId === parseInt(this.selectedEmployeeId) && r.date === day.date
        );
        
        if (existingIndex >= 0) {
          // Toggle status
          const current = this.attendanceRecords[existingIndex];
          current.status = current.status === 'Present' ? 'Absent' : 'Present';
        } else {
          // Add new record
          this.attendanceRecords.push({
            id: this.attendanceRecords.length + 1,
            employeeId: parseInt(this.selectedEmployeeId),
            date: day.date,
            status: 'Present'
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.attendance-tracker {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.control-group {
  flex: 1;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.control-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.summary-cards {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.summary-card {
  flex: 1;
  padding: 15px;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  text-align: center;
}

.summary-card h4 {
  margin: 0;
  font-size: 24px;
}

.summary-card p {
  margin: 5px 0 0;
  font-size: 14px;
}

.calendar {
  margin-bottom: 20px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f2f2f2;
  border-radius: 4px 4px 0 0;
}

.day-header {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #ddd;
}

.day-header:last-child {
  border-right: none;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.calendar-day {
  min-height: 60px;
  padding: 5px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  position: relative;
  cursor: pointer;
}

.calendar-day:hover {
  background-color: #f9f9f9;
}

.calendar-day.today {
  background-color: #e8f4fd;
}

.calendar-day.weekend {
  background-color: #f8f8f8;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

.day-number {
  font-size: 12px;
  color: #666;
}

.attendance-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot.present {
  background-color: #2ecc71;
}

.status-dot.absent {
  background-color: #e74c3c;
}

.attendance-list {
  margin-top: 20px;
}

.record-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-item:last-child {
  border-bottom: none;
}

.record-date {
  font-weight: bold;
  color: #666;
}

.record-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.employee-name {
  font-weight: bold;
}

.status-badge {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.present {
  background-color: #2ecc71;
  color: white;
}

.status-badge.absent {
  background-color: #e74c3c;
  color: white;
}
</style>
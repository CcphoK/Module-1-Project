<template>
  <div class="payroll-calculator">
    <h2>Payroll Calculator</h2>
    
    <div class="employee-selector">
      <label>Select Employee:</label>
      <select v-model="selectedEmployeeId" @change="loadEmployeeData">
        <option value="">Choose employee...</option>
        <option v-for="emp in employeeInformation" :key="emp.employeeId" :value="emp.employeeId">
          {{ emp.name }} ({{ emp.department }})
        </option>
      </select>
    </div>

    <div v-if="selectedEmployee" class="calculator-form">
      <h3>{{ selectedEmployee.name }}</h3>
      <p>Position: {{ selectedEmployee.position }}</p>
      
      <div class="input-group">
        <label>Base Salary (R):</label>
        <input type="number" v-model.number="baseSalary" @input="calculatePayroll">
      </div>
      
      <div class="input-group">
        <label>Hours Worked:</label>
        <input type="number" v-model.number="hoursWorked" @input="calculatePayroll">
      </div>
      
      <div class="input-group">
        <label>Leave Hours:</label>
        <input type="number" v-model.number="leaveDeductions" @input="calculatePayroll">
      </div>
      
      <div class="results">
        <h4>Payroll Results</h4>
        <div class="result-item">
          <span>Gross Salary:</span>
          <span class="value">R{{ grossSalary.toFixed(2) }}</span>
        </div>
        <div class="result-item">
          <span>Tax ({{ taxRate }}%):</span>
          <span class="value">-R{{ taxAmount.toFixed(2) }}</span>
        </div>
        <div class="result-item">
          <span>Other Deductions:</span>
          <span class="value">-R{{ otherDeductions.toFixed(2) }}</span>
        </div>
        <div class="result-item total">
          <span>Net Salary:</span>
          <span class="value blue-text">R{{ netSalary.toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="buttons">
        <button @click="generatePayslip" class="btn-primary">Generate Payslip</button>
        <button @click="updatePayroll" class="btn-secondary">Update Record</button>
      </div>
    </div>
    
    <div v-else class="no-selection">
      <p>Please select an employee to calculate payroll.</p>
    </div>
  </div>
</template>

<script>
import { employeeInformation, payrollData } from '@/data/dummyData.js';

export default {
  name: 'PayrollCalculator',
  data() {
    return {
      employeeInformation,
      selectedEmployeeId: '',
      selectedEmployee: null,
      baseSalary: 0,
      hoursWorked: 160,
      leaveDeductions: 0,
      taxRate: 15,
      otherDeductions: 1200,
      grossSalary: 0,
      taxAmount: 0,
      netSalary: 0
    };
  },
  methods: {
    loadEmployeeData() {
      this.selectedEmployee = employeeInformation.find(
        emp => emp.employeeId === parseInt(this.selectedEmployeeId)
      );
      
      if (this.selectedEmployee) {
        this.baseSalary = this.selectedEmployee.salary;
        
        const payrollRecord = payrollData.find(
          p => p.employeeId === parseInt(this.selectedEmployeeId)
        );
        
        if (payrollRecord) {
          this.hoursWorked = payrollRecord.hoursWorked;
          this.leaveDeductions = payrollRecord.leaveDeductions;
        }
        
        this.calculatePayroll();
      }
    },
    calculatePayroll() {
      // Simple calculation
      const hourlyRate = this.baseSalary / 160;
      const leaveDeductionAmount = this.leaveDeductions * hourlyRate;
      this.grossSalary = (this.hoursWorked * hourlyRate) - leaveDeductionAmount;
      this.taxAmount = (this.grossSalary * this.taxRate) / 100;
      this.netSalary = this.grossSalary - this.taxAmount - this.otherDeductions;
      
      if (this.netSalary < 0) this.netSalary = 0;
    },
    generatePayslip() {
      alert(`Payslip Generated!\nEmployee: ${this.selectedEmployee.name}\nNet Salary: R${this.netSalary.toFixed(2)}`);
    },
    updatePayroll() {
      alert('Payroll record updated!');
    }
  }
}
</script>

<style scoped>
.payroll-calculator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

h2, h3, h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.employee-selector {
  margin-bottom: 20px;
}

.employee-selector label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.employee-selector select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.results {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.result-item.total {
  border-bottom: none;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 2px solid #3498db;
}

.value {
  font-weight: bold;
}

.blue-text {
  color: #3498db;
}

.red-text {
  color: #e74c3c;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
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

.no-selection {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
}
</style>
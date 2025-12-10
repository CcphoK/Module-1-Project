<!-- src/views/EmployeeList.vue -->
<template>
  <!-- ✅ SINGLE ROOT ELEMENT -->
  <div class="employee-list-page">
    <div class="app-container">
      <!-- Header with title and search -->
      <header class="header">
        <h1>Employees</h1>
        <div class="search-bar">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search employees by name..."
          />
          <i class="icon-search"></i>
        </div>
      </header>

      <!-- Employee Table -->
      <main class="table-container">
        <table class="employee-table">
          <thead>
            <tr>
              <th>Employees Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emp, index) in paginatedEmployees" :key="emp.employeeId">
              <td>{{ emp.name }}</td>
              <td>{{ emp.position }}</td>
              <td>{{ emp.department }}</td>
              <td>R{{ emp.salary.toLocaleString() }}</td>
              <td class="actions">
                <RouterLink :to="`/employee/${emp.employeeId}`" class="btn-view">View</RouterLink>
                <button @click="deleteEmployee(emp.employeeId)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <!-- Footer with pagination -->
      <footer class="footer">
        <p>Showing {{ paginatedEmployees.length }} of {{ totalEmployees }} employees</p>
        <div class="pagination">
          <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </div>
      </footer>
    </div>

    <!-- Floating Add Button -->
    <RouterLink to="/employee/new" class="floating-add-btn">
      +
    </RouterLink>
  </div>
</template>

<script>
import { employee } from "../data/employee.js";
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  data() {
    return {
      employeeList: [...employee],
      searchTerm: "",
      currentPage: 1,
      pageSize: 5
    };
  },
  computed: {
    totalEmployees() {
      return this.employeeList.length;
    },
    filteredEmployees() {
      if (!this.searchTerm) return this.employeeList;
      const term = this.searchTerm.toLowerCase();
      return this.employeeList.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term) ||
        emp.department.toLowerCase().includes(term)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.pageSize);
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredEmployees.slice(start, start + this.pageSize);
    }
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
    }
  },
  methods: {
    deleteEmployee(id) {
      if (confirm("Are you sure you want to delete this employee?")) {
        this.employeeList = this.employeeList.filter(emp => emp.employeeId !== id);
      }
    }
  }
};
</script>

<style scoped>
/* ✅ Wrap page in a container that matches your background */
.employee-list-page {
  background-color: #c3b3ff;
  min-height: 100vh;
  padding-top: 12px; /* Leave space for navbar if fixed */
}

/* Keep your existing styles */
.app-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f5ff;
  border-radius: 8px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  gap: 15px;
  flex-wrap: wrap;
}
.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

/* Search Bar */
.search-bar {
  position: relative;
  width: 280px;
}
.search-bar input {
  width: 100%;
  padding: 10px 14px 10px 36px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
}
.search-bar::before {
  content: "🔍";
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

/* Table */
.table-container {
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  overflow: hidden;
}
.employee-table {
  width: 100%;
  border-collapse: collapse;
}
.employee-table th,
.employee-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #f0eaff;
}
.employee-table th {
  background-color: #f0eaff;
  color: #2c3e50;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.employee-table tbody tr:hover {
  background-color: #fcf9ff;
}

/* Actions */
.actions {
  display: flex;
  gap: 8px;
}
.btn-view,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
.btn-view {
  background-color: #3498db;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
.btn-view:hover {
  background-color: #2980b9;
}
.btn-delete {
  background-color: #e74c3c;
  color: white;
}
.btn-delete:hover {
  background-color: #c0392b;
}

/* Floating Add Button */
.floating-add-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #2ecc71;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
  z-index: 1000;
  transition: transform 0.2s, background 0.2s;
}
.floating-add-btn:hover {
  background: #27ae60;
  transform: scale(1.05);
}

/* Footer */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px 0;
  color: #7f8c8d;
  font-size: 14px;
}
.footer p {
  margin: 0;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pagination button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination button:hover:not(:disabled) {
  background: #f0eaff;
  border-color: #c3b3ff;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  .search-bar {
    width: 100%;
  }
  .employee-table th,
  .employee-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
  .actions {
    flex-direction: column;
    gap: 4px;
  }
  .footer {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
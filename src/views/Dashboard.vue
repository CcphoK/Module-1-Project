<template>
  <div class="dashboard">
    <h1>HR Dashboard</h1>
    <p>Welcome to ModernTech HR System</p>
    <div class="quick-links">
      <router-link to="/operations" class="btn-primary">Go to Operations</router-link>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  padding: 50px 20px;
}

.quick-links {
  margin-top: 30px;
}

.btn-primary {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
</style>
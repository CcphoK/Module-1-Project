<template>
  <div id="app">
    <nav class="main-nav">
      <h2>ModernTech HR System</h2>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/operations">Operations</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.main-nav {
  background-color: #3498db;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-nav h2 {
  margin: 0;
}

.main-nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.main-nav a:hover {
  text-decoration: underline;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>

<!-- src/components/TopNavbar.vue -->
<template>
  <nav class="top-navbar">
    <div class="navbar-left">
      <button class="hamburger-btn" @click="toggleSidebar">
        <i class="bi bi-list"></i>
      </button>
      <RouterLink to="/employees" class="logo-mobile">
        ModernTech HR
      </RouterLink>
    </div>
    <div class="navbar-right">
      <div class="user-initial">HR</div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<style scoped>
.top-navbar {
  height: 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.hamburger-btn {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #264653;
  cursor: pointer;
  margin-right: 16px;
}

.logo-mobile {
  font-weight: 700;
  font-size: 18px;
  color: #264653;
  text-decoration: none;
}

.user-initial {
  width: 36px;
  height: 36px;
  background: #2a9d8f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@media (min-width: 769px) {
  .logo-mobile {
    display: none;
  }
}
</style>
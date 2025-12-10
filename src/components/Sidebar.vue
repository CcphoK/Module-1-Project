<!-- src/components/Sidebar.vue -->
<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <RouterLink to="/employees" class="logo">
        <img src="@/assets/logo.png" alt="ModernTech HR" class="logo-img" />
        <span>ModernTech HR</span>
      </RouterLink>
    </div>

    <nav class="menu-section">
      <h3>MAIN</h3>
      <ul class="menu-list">
        <li
          v-for="item in mainMenu"
          :key="item.name"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <i class="bi" :class="item.icon"></i>
          <span>{{ item.name }}</span>
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </li>
      </ul>
    </nav>

    <nav class="menu-section pinned">
      <h3>PINNED</h3>
      <ul class="menu-list">
        <li
          v-for="item in pinnedMenu"
          :key="item.name"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <i class="bi" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <div class="user-avatar">
        <i class="bi bi-person-circle"></i>
      </div>
      <RouterLink to="/employee/new" class="add-btn">
        <i class="bi bi-plus"></i>
      </RouterLink>
    </div>
  </aside>

  <div v-if="isOpen" class="sidebar-overlay" @click="closeSidebar"></div>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router';

const props = defineProps({
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const router = useRouter();
const route = useRoute();

const mainMenu = [
  { name: "Employees", path: "/employees", icon: "bi-people", badge: "10" },
  { name: "Calendar", path: "/calendar", icon: "bi-calendar" },
  { name: "Time-off", path: "/time-off", icon: "bi-clock" },
  { name: "Projects", path: "/projects", icon: "bi-folder" },
  { name: "Team", path: "/team", icon: "bi-people-fill" },
  { name: "Notes", path: "/notes", icon: "bi-journal-text" },
  { name: "Documents", path: "/documents", icon: "bi-file-earmark" },
  { name: "Pay-roll", path: "/payroll", icon: "bi-cash" },
  { name: "Settings", path: "/settings", icon: "bi-gear" }
];

const pinnedMenu = [
  { name: "Quick Add", path: "/employee/new", icon: "bi-plus-square" }
];

const navigate = (path) => {
  router.push(path);
  closeSidebar();
};

const closeSidebar = () => {
  emit('close');
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  position: fixed;
  top: 0;
  left: -250px;
  transition: left 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid #dee2e6;
  background: white;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #264653;
  font-weight: 700;
  font-size: 18px;
}
.logo-img {
  height: 28px;
}

.menu-section {
  padding: 20px 0;
  flex-grow: 1;
  overflow-y: auto;
}
.menu-section h3 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #6c757d;
  margin: 0 20px 12px;
  font-weight: 600;
}
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-list li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
  color: #264653;
  font-weight: 500;
}
.menu-list li:hover {
  background: #e9ecef;
  color: #2a9d8f;
}
.menu-list li.active {
  background: #2a9d8f;
  color: white;
  border-left-color: #ffffff;
}
.menu-list i {
  margin-right: 12px;
  font-size: 18px;
}
.menu-list .badge {
  margin-left: auto;
  background: #e76f51;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
}

.pinned {
  border-top: 1px solid #dee2e6;
  padding-top: 16px;
}

.sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #dee2e6;
  background: white;
}
.user-avatar {
  width: 32px;
  height: 32px;
  background: #2a9d8f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.add-btn {
  background: #e76f51;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
}

.bi {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  fill: currentColor;
}
</style>
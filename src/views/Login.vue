<template>
  <div class="login-wrapper">
    <div class="background-elements">
      <div class="element" style="--x: 10%; --y: 20%; --size: 60px; --delay: 0s;"></div>
      <div class="element" style="--x: 80%; --y: 70%; --size: 40px; --delay: 2s;"></div>
      <div class="element" style="--x: 50%; --y: 40%; --size: 30px; --delay: 4s;"></div>
    </div>

    <div class="login-box">
      <div class="logo-container">
        <!-- 🖼️ Replace with your actual logo -->
        <img src="@/assets/logo.png" alt="HR System Logo" class="logo" />
      </div>

      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to continue to the HR Management System</p>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="input-group">
        <input
          v-model="username"
          type="text"
          id="username"
          required
          autocomplete="username"
        />
        <label for="username">Username</label>
      </div>

      <div class="input-group">
        <input
          v-model="password"
          type="password"
          id="password"
          required
          autocomplete="current-password"
        />
        <label for="password">Password</label>
      </div>

      <button @click="login" class="login-btn" :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <p class="footer-text">© {{ new Date().getFullYear() }} HR Management System</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

// 🔒 Clear any leftover auth state when visiting login
onMounted(() => {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userRole");
});

const users = [
  { username: "admin", password: "admin123", role: "Admin" },
  { username: "hr", password: "hr123", role: "HR" },
  { username: "employee", password: "emp123", role: "Employee" }
];

async function login() {
  if (!username.value || !password.value) {
    error.value = "Please enter both username and password.";
    return;
  }

  isLoading.value = true;
  error.value = "";

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const user = users.find(
    (u) => u.username === username.value && u.password === password.value
  );

  if (!user) {
    error.value = "Invalid username or password";
    isLoading.value = false;
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userRole", user.role);
  router.push("/dashboard");
}
</script>

<style scoped>
.login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  overflow: hidden;
}

.background-elements .element {
  position: absolute;
  width: var(--size, 40px);
  height: var(--size, 40px);
  background: rgba(72, 187, 120, 0.06);
  border-radius: 50%;
  animation: float 12s infinite ease-in-out;
  animation-delay: var(--delay, 0s);
  left: var(--x, 50%);
  top: var(--y, 50%);
  transform: translate(-50%, -50%);
  z-index: 0;
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
  50% { transform: translate(-50%, -50%) translate(10px, -15px); }
}

.login-box {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.logo-container {
  margin-bottom: 1.8rem;
}
.logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #4b5563;
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
}

.input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.875rem 0.875rem;
  font-size: 1rem;
  color: #1a202c;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #48bb78;
  box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.15);
}

.input-group label {
  position: absolute;
  top: 50%;
  left: 0.875rem;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
  transition: 0.3s ease;
  background: white;
  padding: 0 0.25rem;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -0.625rem;
  left: 0.75rem;
  font-size: 0.875rem;
  color: #48bb78;
  font-weight: 600;
}

.login-btn {
  width: 100%;
  padding: 0.875rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  background: #3fb16e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.login-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.footer-text {
  margin-top: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
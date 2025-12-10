<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to continue to the HR System</p>

      <div class="input-group">
        <input v-model="email" type="email" placeholder=" " />
        <label>Email</label>
      </div>
      <div class="input-group">
        <input v-model="password" type="password" placeholder=" " />
        <label>Password</label>
      </div>
      <button class="login-btn" @click="login">Log In</button>
      <p class="footer-text">© 2025 HR Management System</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['login']);
const email = ref('');
const password = ref('');

function login() {
  if(email.value && password.value) emit('login');
  else alert("Enter email & password");
}
</script>

<style scoped>
/* Paste your login CSS here */
</style>

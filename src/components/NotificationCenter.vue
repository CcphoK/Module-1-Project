<template>
  <div class="notifications">
    <h3>Notifications</h3>
    <ul>
      <li v-for="note in notifications" :key="note.id">
        [{{ note.type }}] {{ note.message }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ notifications: Array });
</script>

<style scoped>
.notifications {
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 20px;
  width: 300px;
}
</style>

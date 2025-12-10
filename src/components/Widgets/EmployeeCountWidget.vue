<template>
  <div class="widget">
    <h3>Total Employees</h3>
    <p>{{ count }}</p>
  </div>
</template>

<script setup>
defineProps({ count: Number });
</script>

<style scoped>
.widget {
  border: 1px solid #ccc;
  padding: 15px;
  width: 150px;
  text-align: center;
}
</style>

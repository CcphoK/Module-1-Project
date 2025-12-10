<template>
  <div class="widget">
    <h3>Department Stats</h3>
    <ul>
      <li v-for="(num, dept) in departments" :key="dept">
        {{ dept }}: {{ num }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ departments: Object });
</script>

<style scoped>
.widget {
  border: 1px solid #ccc;
  padding: 15px;
  width: 200px;
}
</style>

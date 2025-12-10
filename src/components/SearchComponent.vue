<template>
  <div class="search">
    <input v-model="query" placeholder="Search employees..." />
    <ul v-if="filteredResults.length">
      <li v-for="emp in filteredResults" :key="emp.employeeId">
        {{ emp.name }} - {{ emp.department }} - {{ emp.position }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ employees: Array });

const query = ref('');
const filteredResults = ref([]);

watch(query, () => {
  filteredResults.value = props.employees.filter(emp =>
    emp.name.toLowerCase().includes(query.value.toLowerCase()) ||
    emp.department.toLowerCase().includes(query.value.toLowerCase()) ||
    emp.position.toLowerCase().includes(query.value.toLowerCase())
  );
});
</script>

<style scoped>
.search input { padding: 5px; width: 250px; margin-bottom: 10px; }
</style>

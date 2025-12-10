<template>
  <div class="leave-form">
    <h2>Request Time Off</h2>

    <div class="leave-input-group">
      <input v-model="leaveForm.employee" placeholder=" " />
      <label>Employee Name</label>
    </div>

    <div class="leave-row">
      <div class="leave-input-group">
        <input type="date" v-model="leaveForm.startDate" />
        <label>Start Date</label>
      </div>
      <div class="leave-input-group">
        <input type="date" v-model="leaveForm.endDate" />
        <label>End Date</label>
      </div>
    </div>

    <div class="leave-input-group">
      <textarea v-model="leaveForm.reason" placeholder=" "></textarea>
      <label>Reason for Leave</label>
    </div>

    <button class="leave-btn" @click="submitLeave">Submit Request</button>

    <div v-if="leaveRequests.length" class="leave-history">
      <h3>Recent Leave Requests</h3>
      <ul>
        <li v-for="(req, index) in leaveRequests" :key="index">
          <strong>{{ req.employee }}</strong>:
          {{ req.startDate }} → {{ req.endDate }}
          <span>| {{ req.reason }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const leaveForm = ref({ employee: "", startDate: "", endDate: "", reason: "" });
const leaveRequests = ref([]);

function submitLeave() {
  if (leaveForm.value.employee && leaveForm.value.startDate && leaveForm.value.endDate) {
    leaveRequests.value.push({ ...leaveForm.value });
    leaveForm.value = { employee: "", startDate: "", endDate: "", reason: "" };
    alert("Leave request submitted.");
  } else {
    alert("Please fill all fields.");
  }
}
</script>

<style scoped>
.leave-form {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 20px;
  max-width: 700px;
}

.leave-input-group {
  position: relative;
  margin-bottom: 20px;
}

.leave-input-group input,
.leave-input-group textarea {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
}

.leave-btn {
  background: #3a7afe;
  color: white;
  padding: 14px;
  border-radius: 14px;
  width: 100%;
  margin-top: 10px;
}

.leave-history {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
}
</style>

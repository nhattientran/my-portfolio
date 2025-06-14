<script setup lang="ts">
// define auth middleware
// definePageMeta({
//   middleware: ['auth']
// })
</script>

<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <div class="dashboard-content">
      <!-- Dashboard widgets or content will go here -->
      <p>Welcome to your dashboard!</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 2rem;
}

.dashboard-content {
  margin-top: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 200px;
}
</style>
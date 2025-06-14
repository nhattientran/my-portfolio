<template>
  <NuxtLayout>
    <Suspense>
      <template #default>
        <NuxtPage />
      </template>
      <template #fallback>
        <LoadingSpinner size="lg" />
      </template>
    </Suspense>
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingSpinner from "~/components/ui/LoadingSpinner.vue";
</script>


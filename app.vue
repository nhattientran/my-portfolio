<template>
  <NuxtLayout>
    <Suspense>
      <template #default>
        <LoadingSpinner size="md" />
        <NuxtPage />
      </template>
    </Suspense>
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
</script>


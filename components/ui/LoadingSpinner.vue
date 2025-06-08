<template>
  <div 
    :class="[
      'animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
      size === 'sm' ? 'h-4 w-4 border-2' : '',
      size === 'md' ? 'h-6 w-6 border-2' : '',
      size === 'lg' ? 'h-8 w-8 border-4' : '',
      color ? `text-${color}` : 'text-blue-500',
      className
    ]"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
  color: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div 
    :class="[
      'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden',
      hoverable && 'transition-transform hover:-translate-y-1 hover:shadow-lg',
      className
    ]"
  >
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <slot name="header"></slot>
    </div>
    <div class="p-6">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hoverable: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
})
</script>

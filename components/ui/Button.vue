<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
      size === 'sm' && 'text-sm py-1 px-3',
      size === 'lg' && 'text-lg py-3 px-6',
      fullWidth && 'w-full',
      className
    ]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => 'primary' | 'secondary' | 'outline',
    default: 'primary',
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])
</script>

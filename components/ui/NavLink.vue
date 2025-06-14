<template>
  <NuxtLink
      :class="[
      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
      'focus:outline-none transition-colors duration-150',
      isActive
        ? 'border-blue-500 text-white dark:text-white'
        : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white',
      $attrs.class
    ]"
      :to="to"
      v-bind="$attrs"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  exact: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute() // Nuxt auto-imports this composable

const isActive = computed(() => {
  if (typeof props.to === 'string') {
    return props.exact
        ? route.path === props.to
        : route.path.startsWith(props.to)
  } else if (props.to && typeof props.to === 'object') {
    return props.exact
        ? route.path === props.to.path
        : route.path.startsWith(props.to.path || '')
  }
  return false
})
</script>

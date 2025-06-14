<template>
  <nav class="bg-white dark:bg-gray-900 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex w-full justify-between items-center">
          <div class="flex-shrink-0 flex items-center">
            <slot name="brand">
              <span class="text-xl font-bold text-gray-900 dark:text-white">Portfolio</span>
            </slot>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8 flex-end">
            <NavLink v-for="(item, index) in navItems" :key="index" :to="item.to" class="text-white cursor-pointer">
              {{ item.label }}
            </NavLink>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
          <slot name="actions"></slot>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              @click="isOpen = !isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
                aria-hidden="true"
                class="block h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <NavLink
            v-for="(item, index) in navItems"
            :key="`mobile-${index}`"
            :to="item.to"
            active-class="border-blue-500 text-blue-700 bg-blue-50"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
            inactive-class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
        >
          {{ item.label }}
        </NavLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import NavLink from "~/components/ui/NavLink.vue";

const isOpen = ref(false)

const navItems: { to: string, label: string }[] = [
  {to: '/', label: 'Home'},
  {to: '/dashboard', label: 'Dashboard'},
  {to: '/about', label: 'About'},
  {to: '/projects', label: 'Projects'},
  {to: '/blog', label: 'Blog'},
  {to: '/contact', label: 'Contact'},
]
</script>

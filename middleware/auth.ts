import {useUserStore} from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {
    // Check if we're on client-side using Nuxt 3's recommended approach
    if (import.meta.client) {
        try {
            const userStore = useUserStore()
            const token = useCookie('auth_token')

            // Initialize auth from cookies if available
            if (!userStore.isAuthenticated && token.value) {
                userStore.initAuth()
            }

            // Protected routes require authentication
            if (!userStore.isAuthenticated && to.path !== '/login') {
                return navigateTo('/login')
            }

            // Redirect logged-in users away from login page
            if (userStore.isAuthenticated && to.path === '/login') {
                return navigateTo('/dashboard')
            }
        } catch (error) {
            console.error('Error in auth middleware:', error)
            // Fallback behavior if store access fails
            const token = useCookie('auth_token')
            if (!token.value && to.path !== '/login') {
                return navigateTo('/login')
            }
        }
    }
})

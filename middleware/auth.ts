import {useUserStore} from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {
    // Use getCurrentInstance to check if we're in component setup context
    // Only try to use the store if we're in a proper Vue context
    if (process.client) {
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

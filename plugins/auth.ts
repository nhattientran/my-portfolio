import {useUserStore} from '~/stores/user'

export default defineNuxtPlugin({
    name: 'auth-plugin',
    enforce: 'post', // this ensures the plugin runs after Pinia is initialized
    async setup(nuxtApp) {
        // Wait for Pinia to be fully initialized
        await nuxtApp.hook('app:created', () => {
            // Only run on client-side to avoid SSR issues
            if (process.client) {
                try {
                    const userStore = useUserStore()
                    userStore.initAuth()
                } catch (error) {
                    console.error('Failed to initialize auth:', error)
                }
            }
        })
    }
})

import {defineStore} from 'pinia'

interface User {
    id: string;
    email: string;
    name: string;
    role?: string;

    [key: string]: any;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        isLoggedIn: false,
        token: null as string | null,
        loading: false
    }),

    getters: {
        isAuthenticated: (state) => state.isLoggedIn && !!state.user,
        userRole: (state) => state.user?.role || 'guest',
        userName: (state) => state.user?.name || ''
    },

    actions: {
        setUser(user: User) {
            this.user = user
            this.isLoggedIn = true
        },

        setToken(token: string) {
            this.token = token
        },

        async login(email: string, password: string) {
            this.loading = true

            try {
                const {fetchApi} = useApi()
                const response = await fetchApi('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                })

                this.setUser(response.user)
                this.setToken(response.token)

                // Set cookies
                const token = useCookie('auth_token', {maxAge: 60 * 60 * 24 * 7}) // 1 week
                token.value = response.token

                const userCookie = useCookie('user', {maxAge: 60 * 60 * 24 * 7})
                userCookie.value = JSON.stringify(response.user)

                return {success: true, user: response.user}
            } catch (error: any) {
                return {success: false, error: error.message || 'Login failed'}
            } finally {
                this.loading = false
            }
        },

        logout() {
            // Clear state
            this.user = null
            this.isLoggedIn = false
            this.token = null

            // Clear cookies
            const token = useCookie('auth_token')
            token.value = null

            const userCookie = useCookie('user')
            userCookie.value = null

            // Redirect to login page
            navigateTo('/login')
        },

        initAuth() {
            // Check if we have a token in cookie
            const token = useCookie('auth_token')
            const userCookie = useCookie('user')

            if (token.value && userCookie.value) {
                try {
                    const userData = JSON.parse(userCookie.value as string)
                    this.setUser(userData)
                    this.setToken(token.value as string)
                } catch (error) {
                    this.logout()
                }
            }
        }
    }
})

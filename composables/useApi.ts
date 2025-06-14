import {useUserStore} from "~/stores/user";

export const useApi = () => {
    const config = useRuntimeConfig()

    const baseUrl = config.public.apiBase || 'http://localhost:3000'

    const fetchApi = async (endpoint: string, options: any = {}) => {
        // Prepare headers
        const headers = options.headers || {}

        // Add Content-Type if not provided
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json'
        }

        // Add Authorization header if token exists
        const token = useCookie('auth_token')
        if (token.value) {
            headers['Authorization'] = `Bearer ${token.value}`
        }

        // Prepare the request options
        const requestOptions = {
            ...options,
            headers
        }

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, requestOptions)

            // Handle unauthorized error
            if (response.status === 401) {
                // Get userStore inside the function call to ensure Pinia is initialized
                const userStore = useUserStore()
                userStore.logout()
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized. Please log in again.'
                })
            }

            // Handle other errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw createError({
                    statusCode: response.status,
                    statusMessage: errorData.message || response.statusText || 'An error occurred'
                })
            }

            // Parse and return JSON response
            return await response.json()
        } catch (error: any) {
            if (error.statusCode) {
                throw error
            }
            throw createError({
                statusCode: 500,
                statusMessage: error.message || 'Network or server error'
            })
        }
    }

    return {
        fetchApi,
        get: (endpoint: string, options = {}) => fetchApi(endpoint, {method: 'GET', ...options}),
        post: (endpoint: string, data: any, options = {}) => fetchApi(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        }),
        put: (endpoint: string, data: any, options = {}) => fetchApi(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options
        }),
        delete: (endpoint: string, options = {}) => fetchApi(endpoint, {method: 'DELETE', ...options})
    }
}

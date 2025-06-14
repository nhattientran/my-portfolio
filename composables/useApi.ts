import axios from 'axios';
import {useUserStore} from "~/stores/user";

export const useApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase || 'http://localhost:3000'

    // Create axios instance with default config
    const api = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Request interceptor
    api.interceptors.request.use(config => {
        // Only access cookies when on client-side
        if (import.meta.client) {
            const token = useCookie('auth_token')
            if (token.value) {
                config.headers['Authorization'] = `Bearer ${token.value}`
            }
        }
        return config
    });

    // Response interceptor
    api.interceptors.response.use(
        response => response.data,
        error => {
            // Handle 401 unauthorized errors
            if (error.response?.status === 401 && import.meta.client) {
                try {
                    const userStore = useUserStore()
                    userStore.logout()
                } catch (e) {
                    console.error('Failed to logout:', e)
                }
            }

            // Format error for Nuxt error handling
            const statusCode = error.response?.status || 500
            const statusMessage =
                error.response?.data?.message ||
                error.message ||
                'Network or server error'

            return Promise.reject(createError({
                statusCode,
                statusMessage
            }))
        }
    );

    return {
        // Basic API methods
        get: (endpoint: string, params = {}) =>
            api.get(endpoint, {params}),

        post: (endpoint: string, data: any, options = {}) =>
            api.post(endpoint, data, options),

        put: (endpoint: string, data: any, options = {}) =>
            api.put(endpoint, data, options),

        delete: (endpoint: string, options = {}) =>
            api.delete(endpoint, options),

        // Original fetchApi method renamed to apiRequest for backward compatibility
        fetchApi: async (endpoint: string, options: any = {}) => {
            const {method = 'GET', body, headers = {}, ...rest} = options

            try {
                const response = await api.request({
                    url: endpoint,
                    method,
                    data: body ? JSON.parse(body) : undefined,
                    headers,
                    ...rest
                })

                return response
            } catch (error: any) {
                throw error
            }
        }
    }
}

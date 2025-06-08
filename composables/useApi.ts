export const useApi = () => {
  const config = useRuntimeConfig()
  
  const baseUrl = config.public.apiBase || 'http://localhost:3000'
  
  const fetchApi = async (endpoint: string, options = {}) => {
    const response = await fetch(`${baseUrl}${endpoint}`, options)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText
      })
    }
    return response.json()
  }

  return {
    fetchApi
  }
}

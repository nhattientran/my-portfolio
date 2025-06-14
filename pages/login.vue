<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
      <div class="bg-indigo-600 px-6 py-4">
        <h1 class="text-2xl font-bold text-white">Login</h1>
      </div>

      <div class="p-6">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="email">Email Address</label>
            <input
                id="email"
                v-model="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="your@email.com"
                required
                type="email"
            />
          </div>

          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="password">Password</label>
            <input
                id="password"
                v-model="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                required
                type="password"
            />
          </div>

          <div v-if="error" class="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {{ error }}
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                     type="checkbox">
              <label class="ml-2 block text-sm text-gray-700" for="remember-me">Remember me</label>
            </div>

            <div class="text-sm">
              <a class="font-medium text-indigo-600 hover:text-indigo-500" href="#">Forgot password?</a>
            </div>
          </div>

          <div>
            <button
                :class="{ 'opacity-75 cursor-not-allowed': loading }"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                type="submit"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"></path>
              </svg>
              {{ loading ? 'Logging in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useUserStore} from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()
const {fetchApi} = useApi()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    // Option 1: Using the store's login method
    const result = await userStore.login(email.value, password.value)

    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.error || 'Login failed. Please check your credentials.'
    }

    /* Option 2: Direct API call
    const response = await fetchApi('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    // Store user data and token
    userStore.setUser(response.user)

    // Set auth cookie
    const token = useCookie('auth_token')
    token.value = response.token

    const userCookie = useCookie('user')
    userCookie.value = JSON.stringify(response.user)

    // Redirect to dashboard
    router.push('/dashboard')
    */
  } catch (err: any) {
    error.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* No additional CSS needed as we're using Tailwind classes */
</style>
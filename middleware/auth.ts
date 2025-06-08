export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie('user')

  // If the user is not logged in and is not on the login page
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

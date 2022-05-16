export default function ({ store, redirect, route }) {
  console.log(process.client)
  if (process.client && route.name !== 'login') {
    if (!store.$auth.$state.loggedIn || !store.$auth.$state.user) {
      return redirect('/login')
    }
  }
}

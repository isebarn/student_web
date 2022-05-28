export default function ({ store, redirect, route }) {
  if (!(route.name === 'login' || route.name === 'signUp')) {
    if (!store.$auth.$state.loggedIn || !store.$auth.$state.user) {
      return redirect('/login')
    }
  }
}

export default function ({ store, redirect, route }) {
  if (!(route.name === 'login' || route.name === 'signUp')) {
    if (!store.$auth.$state.loggedIn || !store.$auth.$state.user) {
      if (route.name === 'application' && !route.query && !route.query.id) {
        return redirect('/login')
      }
    }
  }
}

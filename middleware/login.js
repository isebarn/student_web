export default function ({ store, redirect, route }) {
  if (route.name !== 'login') {
    if (!store.$auth.$state.loggedIn || !store.$auth.$state.user) {
      return redirect('/')
    }
  }
}

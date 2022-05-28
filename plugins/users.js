export default function ({ app }, inject) {
  inject('applicant', () => app.$auth.user.groups.find(x => x.precedence === 5))
  inject('student', () => app.$auth.user.groups.find(x => x.precedence === 4))
  inject('assistant', () => app.$auth.user.groups.find(x => x.precedence < 4))
  inject('manager', () => app.$auth.user.groups.find(x => x.precedence < 3))
  inject('admin', () => app.$auth.user.groups.find(x => x.precedence < 2))
}

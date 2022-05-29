import Vue from 'vue'
import moment from 'moment'

function exists (date) {
  return date !== '' && date !== null && date !== undefined
}

function date (date) {
  return exists(date) ? moment(date).format('LL') : null
}

function weekly (date) {
  return exists(date) ? moment(date).format('MMMM Do') : ''
}

Vue.filter('date', date)
Vue.filter('weekly', weekly)

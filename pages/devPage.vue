<template>
  <v-container>
    <datePick path="test" item="Test" label="asd" />
  </v-container>
</template>

<script>
import datePick from '../components/datePick2'
export default {
  name: 'DevPage',

  components: { datePick },

  data () {
    return {
      name: '0'
    }
  }
}
</script>

<style scoped>

.completed >>> fieldset {
  border-color: green;
  border-width: 2px;
  color:  green;
}

.working >>> fieldset {}
</style>

<template>
  <v-container>
    <axios />
    <v-text-field v-model="asd" />
  </v-container>
</template>

<script>
import axios from '../components/axios'
export default {
  name: 'DevPage',

  components: { axios },

  data () {
    return {
      asd: ''
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

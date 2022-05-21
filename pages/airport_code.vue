<template>
  <v-form>
    <v-container>
      <v-text-field v-model="airport" label="Airport" />
      <v-text-field v-model="code" label="Airport Code" />
      <v-btn @click="submit">
        Submit
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'AirportCode',

  data () {
    return {
      airport: '',
      code: ''
    }
  },

  methods: {
    async submit () {
      await this.$axios.$post('api/airport', {
        airport: this.airport,
        code: this.code
      })

      this.clear()
    },

    clear () {
      this.airport = ''
      this.code = ''
    }
  }
}
</script>

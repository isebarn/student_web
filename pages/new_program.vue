<template>
  <v-form>
    <v-container>
      <v-text-field v-model="country" label="Country" />
      <v-text-field v-model="description" label="Description" />
      <v-text-field v-model="code" label="Program Code" />
      <v-text-field v-model="program_price" label="Program Price" />
      <v-text-field v-model="price" label="Price" />
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
  name: 'NewProgram',

  data () {
    return {
      country: '',
      description: '',
      code: '',
      program_price: '',
      price: ''
    }
  },

  methods: {
    async submit () {
      await this.$axios.$post('api/program', {
        country: this.country,
        description: this.description,
        code: this.code,
        program_price: this.program_price,
        price: this.price
      })

      this.clear()
    },

    clear () {
      this.country = ''
      this.description = ''
      this.code = ''
      this.program_price = ''
      this.price = ''
    }
  }
}
</script>

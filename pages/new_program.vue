<template>
  <v-form>
    <v-container>
      <v-text-field v-model="country" label="Country" />
      <v-text-field v-model="description" label="Description" />
      <v-text-field v-model="code" label="Program Code" />
      <money ref="program_price" v-model="program_price" label="Program Price" />
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
import money from '../components/money'
export default {
  name: 'NewProgram',
  components: { money },
  data () {
    return {
      country: '',
      description: '',
      code: '',
      program_price: null,
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
      this.$ref.program_price.money = ''
      this.price = ''
    }
  }
}
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="country" label="Country" maxlength="12" />
        </v-col>
        <v-col>
          <v-text-field v-model="code" label="Program Code" maxlength="4" />
        </v-col>
        <v-col>
          <v-text-field v-model="price" label="Price" maxlength="10" />
        </v-col>
      </v-row>
      <v-row>
        <v-col><money ref="program_price" v-model="program_price" label="Program Price" /></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="description" label="Description" />
        </v-col>
      </v-row>
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

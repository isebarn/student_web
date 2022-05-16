<template>
  <v-autocomplete v-model="airport" :filter="onFilterAirport" :items="airports" label="Airport" @change="handleChange">
    <template #selection="{item}">
      {{ item.code }} - {{ item.airport }}
    </template>
    <template #item="{item}">
      <v-list>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.code }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.airport }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'AirportAutocomplete',
  prop: ['value'],
  data () {
    return {
      airport: null,
      airports: []
    }
  },

  async fetch () {
    this.airports = await this.$axios.$get('api/airport_code')
  },

  methods: {

    handleChange () {
      this.$emit('input', this.airport)
    },

    onFilterAirport (item, queryText, itemText) {
      return item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.airport.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    }

  }
}
</script>

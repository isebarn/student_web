<template>
  <v-autocomplete v-model="program" :filter="onFilter" :items="programmes" label="Program" @change="handleChange">
    <template #selection="{item}">
      {{ item.code }} - {{ item.description }} - {{ item.country }}
    </template>
    <template #item="{item}">
      <v-list>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.code }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.description }} - € {{ item.price }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.country }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'ProgramSelect',
  prop: ['value'],

  data () {
    return {
      program: null,
      programmes: []
    }
  },

  async fetch () {
    this.programmes = await this.$axios.$get('api/program')
  },
  methods: {
    handleChange () {
      this.$emit('input', this.program)
    },

    onFilter (item, queryText, itemText) {
      return item.country.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.description.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    }
  }
}
</script>

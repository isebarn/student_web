<template>
  <v-autocomplete v-model="program" :filter="onFilter" :items="programs" label="Program">
    <template #selection="{item}">
      {{ item.code }} - {{ item.description }} - € {{ item.price }} - {{ item.country }}
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
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  name: 'ProgramAutocomplete',

  async fetch () {
    await this.populate()
  },

  computed: {
    ...mapFields('program', ['programs', 'program'])
  },

  methods: {
    ...mapActions('program', ['populate']),

    onFilter (item, queryText, itemText) {
      return item.country.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.description.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    }
  }
}
</script>

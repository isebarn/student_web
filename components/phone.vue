<template>
  <v-autocomplete v-model="code" :items="countries" :filter="onFilter" item-value="dial_code" @change="handleChange">
    <template #selection="{item}">
      {{ item.flag }} ({{ item.dial_code }})
    </template>
    <template #item="{item}">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.flag }} ({{ item.dial_code }})</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'InternationalPhone',
  props: ['value'],
  data () {
    return {
      countries: this.$getCountries(),
      code: null
    }
  },

  created () {
    if (this.value) {
      this.code = this.countries.find(x => x.dial_code === this.value)
    } else {
      this.findCountry()
    }
  },

  methods: {
    findCountry () {
      this.$axios.get('http://ip-api.com/json').then((res) => {
        this.code = this.countries.find(x => x.code === res.data.countryCode)
      })
    },

    handleChange () {
      this.$emit('input', this.code)
    },

    onFilter (item, queryText, itemText) {
      return item.name.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.dial_code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    }
  }
}
</script>

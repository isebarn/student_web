<template>
  <v-autocomplete
    v-model="code"
    return-object
    :items="countries"
    :filter="onFilter"
    item-value="dial_code"
    @change="handleChange"
  >
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
  props: ['path'],
  data () {
    return {
      countries: this.$getCountries(),
      code: null
    }
  },

  created () {
    const value = this.$store.getters[`${this.path}/getPhone`]
    if (value) {
      const code = this.countries.find(x => x.dial_code === value)
      this.$set(this, 'code', code)
    } else {
      this.findCountry()
    }
  },

  methods: {
    findCountry () {
      this.$axios.get('http://ip-api.com/json').then((res) => {
        this.code = this.countries.find(x => x.code === res.data.countryCode)
        this.handleChange()
      })
    },

    handleChange () {
      this.$store.dispatch(`${this.path}/setPhone`, this.code.dial_code)
    },

    onFilter (item, queryText, itemText) {
      return item.name.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.dial_code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    }
  }
}
</script>

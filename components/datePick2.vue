<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      />
    </v-menu>
  </div>
</template>

<script>

export default {
  props: ['path', 'item', 'label'],

  data: () => ({
    activePicker: null,
    date: null,
    menu: false
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },

  created () {
    this.date = this.$store.getters[`${this.path}/get${this.item}`]
  },

  methods: {
    save (date) {
      this.menu = false
      this.$store.dispatch(`${this.path}/set${this.item}`, this.date)
    }
  }
}
</script>

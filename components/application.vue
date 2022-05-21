<template>
  <v-card
    outlined
    @click="openApplication()"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ application.email }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ application.first_name }} {{ application.last_name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'ApplicationCard',
  props: { application: { type: Object, default: () => { return {} } } },
  methods: {
    openApplication () {
      this.$router.push(`application?id=${this.application.id}`)
    }
  }
}
</script>

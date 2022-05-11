<template>
  <v-card
    outlined
    @click="openUser()"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ user.email }} {{ user.inactive === 'Yes' ? "- (Disabled)" : "" }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ user.first_name }} {{ user.last_name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: { user: { type: Object, default: () => { return {} } } },
  methods: {
    openUser () {
      this.$router.push(`user?user=${this.user.sub}`)
    }
  }
}
</script>

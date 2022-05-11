<template>
  <v-container fluid>
    <v-data-iterator
      :items="users"
      :search="search"
    >
      <template #header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          />
        </v-toolbar>
      </template>

      <template #default="props">
        <v-container
          v-for="user in props.items"
          :key="user.sub"
        >
          <user-card :user="user" />
        </v-container>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import userCard from '../components/user'

export default {
  name: 'DevPage',
  components: {
    userCard
  },

  data () {
    return { search: '', users: [] }
  },

  async fetch () {
    this.users = await this.$axios.$get('aws_cognito/management/users')
  }
}
</script>

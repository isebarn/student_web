<template>
  <v-container fluid>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider />

      <v-tab>
        Users
        <v-icon>mdi-account-details-outline</v-icon>
      </v-tab>

      <v-tab>
        Create user
        <v-icon>mdi-account-plus</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
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
      </v-tab-item>
      <v-tab-item>
        <v-form>
          <v-container>
            <v-text-field v-model="email" label="Email" />
            <v-btn block color="#5DD099" @click="submit">
              Add user
            </v-btn>
          </v-container>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
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
    return { search: '', users: [], tab: null, email: '' }
  },

  async fetch () {
    this.users = await this.$axios.$get('aws_cognito/management/users')
  },

  methods: {
    async submit () {
      await this.$axios.$post('aws_cognito/management/users', {
        email: this.email
      })
      this.$router.push('login')
    }
  }
}
</script>

<template>
  <v-container>
    <v-data-iterator
      :items="applications"
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
          v-for="application in props.items"
          :key="application._id"
        >
          <application-card :application="application" />
        </v-container>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import applicationCard from '../components/application'

export default {
  name: 'ApplicationsList',
  components: { applicationCard },

  data () {
    return { search: '', applications: [] }
  },

  async fetch () {
    this.applications = await this.$axios.$get('api/student_profile')
  }
}
</script>

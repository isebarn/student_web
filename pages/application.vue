<template>
  <v-container>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider />

      <v-tab>
        Student Form
        <v-icon>mdi-account-details-outline</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item><studentPersonalData /></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import studentPersonalData from '../components/forms/studentPersonalData'
export default {
  name: 'ApplicationPage',
  components: { studentPersonalData },
  data () {
    return {
      tab: null
    }
  }
}
</script>

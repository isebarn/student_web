<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" label="Airport Name" maxlength="30" />
        </v-col>
        <v-col><v-text-field v-model="code" label="Airport Code" maxlength="3" counter="3" /></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="save">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  name: 'HostAirport',

  computed: {
    ...mapFields('studentPersonalData', [
      'data.host_airport.name',
      'data.host_airport.code'
    ])
  },

  methods: {
    ...mapActions('studentPersonalData', ['save'])
  }
}
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" label="Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="contact" label="Contact" />
        </v-col>
        <v-col>
          <v-text-field v-model="email" label="Email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="country" label="Country" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="save">
            Submit
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
  name: 'SchoolInfo',

  computed: {
    ...mapFields('studentPersonalData', [
      'data.host_school.name',
      'data.host_school.contact',
      'data.host_school.email',
      'data.host_school.address.line_1',
      'data.host_school.address.line_2',
      'data.host_school.address.city',
      'data.host_school.address.postal_code',
      'data.host_school.address.country'
    ])
  },

  methods: {
    ...mapActions('studentPersonalData', ['save'])
  }
}
</script>

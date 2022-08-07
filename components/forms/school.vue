<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" label="Name" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="contact" label="Contact" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="email" label="Email" maxlength="40" counter="40" />
        </v-col>
        <v-col>
          <v-text-field v-model="tel" label="Telephone" maxlength="15" counter="15" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="line_1" label="Address line 1" maxlength="30" counter="30" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="city" label="City" maxlength="30" counter="30" />
        </v-col>
        <v-col>
          <v-text-field v-model="postal_code" label="Postal code" maxlength="8" counter="8" />
        </v-col>
        <v-col>
          <v-text-field v-model="country" label="Country" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="web_link" label="Web link" />
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
      'data.host_school.tel',
      'data.host_school.address.line_1',
      'data.host_school.address.city',
      'data.host_school.address.postal_code',
      'data.host_school.web_link',
      'data.host_school.address.country'
    ])
  },

  methods: {
    ...mapActions('studentPersonalData', ['save'])
  }
}
</script>

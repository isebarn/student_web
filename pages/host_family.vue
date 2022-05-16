<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="number" label="Host Family Number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="first_name" label="First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="last_name" label="Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="address_line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="address_line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="address_city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="address_postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="address_country" label="Country" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="email" label="Email" append-icon="mdi-email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="phone_extension" label="Extension" />
        </v-col>
        <v-col>
          <v-text-field v-model="phone_number" label="Phone Number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <airport v-model="airport" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="profile_link" label="Profile link" />
        </v-col>
      </v-row>
      <v-btn @click="submit">
        Submit
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import airport from '../components/airport'
export default {
  name: 'HostFamily',
  components: { airport },
  data () {
    return {
      number: '',
      first_name: '',
      last_name: '',
      address_line_1: '',
      address_line_2: '',
      address_city: '',
      address_postal_code: '',
      address_country: '',
      email: '',
      airport: null,
      phone_extension: '',
      phone_number: '',
      airport_code: '',
      profile_link: '',
      airports: []
    }
  },

  async fetch () {
    this.airports = await this.$axios.$get('api/airport_code')
  },

  methods: {
    async submit () {
      await this.$axios.$post('api/host_family', {
        number: this.number,
        first_name: this.first_name,
        last_name: this.last_name,
        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2,
        address_city: this.address_city,
        address_postal_code: this.address_postal_code,
        address_country: this.address_country,
        email: this.email,
        phone_extension: this.phone_extension,
        phone_number: this.phone_number,
        airport_code: this.airport_code,
        profile_link: this.profile_link,
        airport: this.airport
      })

      this.clear()
    },

    clear () {
      this.number = ''
      this.first_name = ''
      this.last_name = ''
      this.address_line_1 = ''
      this.address_line_2 = ''
      this.address_city = ''
      this.address_postal_code = ''
      this.address_country = ''
      this.email = ''
      this.airport = null
      this.phone_extension = ''
      this.phone_number = ''
      this.airport_code = ''
      this.profile_link = ''
    }
  }
}
</script>

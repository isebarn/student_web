<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <airport v-model="airport" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick ref="depart_date_picker" label="Depart date" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="depart_time" label="Depart Time" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="depart_flight_number" label="Depart Flight Number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="depart_airline" label="Depart Airline" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick ref="return_date_picker" label="Return date" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="return_time" label="Return Time" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="return_flight_number" label="Return Flight Number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="return_airline" label="Return Airline" />
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
import datePick from '../components/datePick'
import airport from '../components/airport'
export default {
  name: 'FlightInfo',

  components: { datePick, airport },

  data () {
    return {
      airport: null,
      depart_date: '',
      depart_time: '',
      depart_flight_number: '',
      depart_airline: '',
      return_date: '',
      return_time: '',
      return_flight_number: '',
      return_airline: '',
      airports: []
    }
  },

  async fetch () {
    this.airports = await this.$axios.$get('api/airport')
  },

  methods: {

    onFilterAirport (item, queryText, itemText) {
      return item.code.toLocaleLowerCase().includes(queryText.toLocaleLowerCase()) || item.airport.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
    },

    async submit () {
      await this.$axios.$post('api/flight_info', {
        airport: this.airport,
        depart_date: this.$refs.depart_date_picker.date,
        depart_time: this.depart_time,
        depart_flight_number: this.depart_flight_number,
        depart_airline: this.depart_airline,
        return_date: this.$refs.return_date_picker.date,
        return_time: this.return_time,
        return_flight_number: this.return_flight_number,
        return_airline: this.return_airline
      })

      this.clear()
    },

    clear () {
      this.airport = null
      this.depart_date = ''
      this.depart_time = ''
      this.depart_flight_number = ''
      this.depart_airline = ''
      this.return_date = ''
      this.return_time = ''
      this.return_flight_number = ''
      this.return_airline = ''
    }
  }
}
</script>

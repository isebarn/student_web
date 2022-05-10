<template>
  <v-form v-model="valid">
    <v-container>
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
          <v-text-field v-model="gender" label="Gender" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select v-model="program" :items="programmes" label="Program">
            <template #selection="{item}">
              {{ item.code }} - {{ item.description }} - {{ item.country }}
            </template>
            <template #item="{item}">
              <v-list>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.code }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }} - {{ item.price }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{ item.country }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick ref="application_date_picker" label="Date of Application " />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick ref="dob_picker" label="Date of birth" />
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
          <v-text-field v-model="phone_extension" label="Extension" />
        </v-col>
        <v-col>
          <v-text-field v-model="phone_number" label="Phone Number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="nationality" label="Nationality" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="school_name" label="School name" />
        </v-col>
        <v-col>
          <v-text-field v-model="school_type" label="School type" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="average_grades" label="Average grades" />
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

export default {
  name: 'DevPage',
  components: { datePick },

  data () {
    return {
      first_name: '',
      last_name: '',
      gender: '',
      program: '',
      address_line_1: '',
      address_line_2: '',
      address_city: '',
      address_postal_code: '',
      address_country: '',
      phone_extension: '',
      phone_number: '',
      nationality: '',
      school_name: '',
      school_type: '',
      average_grades: '',
      programmes: []
    }
  },

  async fetch () {
    this.programmes = await this.$axios.$get('api/program')
  },

  methods: {
    async submit () {
      console.log(this.$refs.application_date_picker.date)
      await this.$axios.$post('api/student_personal_data', {
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        program: this.program,
        date_of_application: this.$refs.application_date_picker.date,
        date_of_birth: this.$refs.dob_picker.date,
        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2,
        address_city: this.address_city,
        address_postal_code: this.address_postal_code,
        address_country: this.address_country,
        phone_extension: this.phone_extension,
        phone_number: this.phone_number,
        nationality: this.nationality,
        school_name: this.school_name,
        school_type: this.school_type,
        average_grades: this.average_grades
      })

      this.clear()
    },

    clear () {
      this.first_name = ''
      this.last_name = ''
      this.gender = ''
      this.program = ''
      this.address_line_1 = ''
      this.address_line_2 = ''
      this.address_city = ''
      this.address_postal_code = ''
      this.address_country = ''
      this.phone_extension = ''
      this.phone_number = ''
      this.$refs.application_date_picker.date = null
      this.$refs.dob_picker.date = null
      this.nationality = ''
      this.school_name = ''
      this.school_type = ''
      this.average_grades = ''
    }
  }
}
</script>

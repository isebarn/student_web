<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="data.first_name" label="First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.last_name" label="Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.gender" label="Gender" />
        </v-col>
        <v-col>
          <datePick ref="date_of_birth" v-model="data.date_of_birth" label="Date of birth" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.nationality" label="Nationality" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <program ref="program" v-model="data.program" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select ref="host_family" v-model="data.host_family" :items="host_family_list" label="Host Family">
            <template #selection="{item}">
              {{ item.number }} - {{ item.father_first_name }} {{ item.father_last_name }} / {{ item.mother_first_name }} {{ item.mother_last_name }}
            </template>
            <template #item="{item}">
              <v-list>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.number }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.father_first_name }} {{ item.father_last_name }} ({{ item.father_email }})
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{ item.mother_first_name }} {{ item.mother_last_name }} ({{ item.mother_email }})
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
          <airport ref="airport" v-model="data.airport" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick ref="date_of_application" v-model="data.date_of_application" label="Date of Application " />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.address_postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.address_country" label="Country" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <phone ref="phone_extension" v-model="data.phone_extension" />
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="data.phone_number" />
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="data.email" label="Email" append-icon="mdi-email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.school_name" label="School name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.school_type" label="School type" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.average_grades" label="Average grades" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field vmodel="data.allergies" label="Allergies" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-datetime-picker v-model="data.interview" label="Interview time">
            <template slot="dateIcon">
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template slot="timeIcon">
              <v-icon>mdi-clock</v-icon>
            </template>
          </v-datetime-picker>
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Father
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.father_first_name" label="Father First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.father_last_name" label="Father Last Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.father_email" label="Father Email" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Mother
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.mother_first_name" label="Mother First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.mother_last_name" label="Mother Last Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.mother_email" label="Mother Email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h5 mb-1 py-5 ">
            Father Address
          </div>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="data.father_address_line_1" label="Address line 1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="data.father_address_line_2" label="Address line 2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="data.father_address_city" label="City" />
            </v-col>
            <v-col>
              <v-text-field v-model="data.father_address_postal_code" label="Postal code" />
            </v-col>
            <v-col>
              <v-text-field v-model="data.father_address_country" label="Country" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <div class="text-h5 mb-1 py-5 ">
            Mother Address
          </div>
          <v-row>
            <v-col>
              <v-text-field v-model="data.mother_address_line_1" label="Address line 1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="data.mother_address_line_2" label="Address line 2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="data.mother_address_city" label="City" />
            </v-col>
            <v-col>
              <v-text-field v-model="data.mother_address_postal_code" label="Postal code" />
            </v-col>
            <v-col>
              <v-text-field v-model="data.mother_address_country" label="Country" />
            </v-col>
          </v-row>
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

import datePick from '../datePick'
import airport from '../airport'
import program from '../program'
import phone from '../phone'

export default {
  name: 'StudentPersonalDataForm',
  components: { datePick, airport, phone, program },

  data () {
    return {
      schema: {},
      differentAddress: false,
      data: { interview: this.getInterviewDefaultDate() },
      program_list: [],
      airport_list: [],
      host_family_list: []
    }
  },

  async fetch () {
    const swagger = await this.$axios.$get('swagger.json')
    this.schema = swagger.definitions.student_personal_data.properties
    this.clear()

    for (const [key, value] of Object.entries(this.schema)) {
      if (value.$ref) {
        this[`${key}_list`] = await this.$axios.$get(`api/${key}`)
      }
    }

    const checkObjectId = /^[a-f\d]{24}$/i
    if (this.$route.query.id) {
      const data = await this.$axios.$get(`api/student_personal_data/${this.$route.query.id}`)
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof Object && checkObjectId.test(value.id)) {
          const item = this[`${key}_list`].find(x => x.id === value.id)
          this.data[key] = item
          this.$refs[key][key] = item
        } else if (this.schema[key].format === 'date-time') {
          if (key.startsWith('date_')) {
            this.$refs[key].date = value.split('T')[0]
          } else {
            this.data[key] = new Date(value)
          }
        } else {
          this.data[key] = value
        }
      }
    }
  },

  methods: {
    getInterviewDefaultDate () {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      date.setHours(16, 30, 0)

      return date
    },

    async submit () {
      if (this.data.id) {
        await this.$axios.$put('api/student_personal_data', Object.fromEntries(Object.entries(this.data).filter(([_, v]) => v !== null && v !== '')))
      } else {
        await this.$axios.$post('api/student_personal_data', Object.fromEntries(Object.entries(this.data).filter(([_, v]) => v !== null && v !== '')))
        this.clear()
      }
    },

    isIsoDate (str) {
      if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) { return false }
      const d = new Date(str)
      return d.toISOString() === str
    },

    clear () {
      for (const [key, value] of Object.entries(this.schema)) {
        if ('type' in value && key !== 'id') {
          this.$set(this.data, key, '')
        } else if ('$ref' in value && this.$refs[key]) {
          this.$set(this.$refs[key], key, null)
        }
      }
    }
  }
}
</script>

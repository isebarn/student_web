<template>
  <!-- <v-form :readonly="data.submitted && !$assistant()"> -->
  <v-form :readonly="submitted && student">
    <!--     <v-container>
      <v-overlay
        absolute
        :value="overlay"
        opacity="0"
      >
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        />
        <success v-if="success" />
      </v-overlay>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="40%"
      >
        <v-card>
          <v-card-title class="text-h5">
            Ready to submit the application?
          </v-card-title>
          <v-card-text>Once you submit the application you wont be able to make changes.</v-card-text>
          <v-card-text>You will receive an email confirming your submission and an agent will be in touch.</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->

    <v-row>
      <v-col>
        <v-text-field v-model="first_name" label="First Name" />
      </v-col>
      <v-col>
        <v-text-field v-model="last_name" label="Last Name" />
      </v-col>
      <v-col>
        <v-text-field v-model="gender" label="Gender" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="age_on_arrival" label="Age in arrival" />
      </v-col>
      <v-col>
        <v-text-field v-model="length_of_stay" label="Length of stay" />
      </v-col>
      <v-col>
        <v-text-field v-model="language" label="Language" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="passport_country" label="Passport country" />
      </v-col>
      <v-col>
        <v-text-field v-model="passport_number" label="Passport number" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="mother_name" label="Mother name" />
      </v-col>
      <v-col>
        <v-text-field v-model="father_name" label="Father name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="letter" outlined label="Letter" /></v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="description" outlined label="Description" /></v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="imagine" outlined label="Imagine" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <program />
      </v-col>
    </v-row>
    <!--
      <v-row v-if="$assistant()">
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
      <v-row v-if="!data.submitted">
        <v-btn @click="save">
          Save changes
        </v-btn>
        <v-btn @click="dialog = true">
          Submit for review
        </v-btn>
        <v-btn @click="clear">
          Clear
        </v-btn>
      </v-row>
      <v-row v-else-if="$assistant()">
        <v-btn :disabled="studentPersonalData" @click="scheduleInterview">
          Schedule Interview
        </v-btn>
      </v-row>
      <v-row v-else justify="center">
        <v-banner elevation="12" tile style="width: 100%">
          Application is being processed
        </v-banner>
      </v-row>
    </v-container> -->
  </v-form>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import program from '../program'
export default {
  name: 'StudentProfile',
  components: { program },
  props: {
    student: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      dialog: false,
      overlay: false,
      success: false
    }
  },

  async fetch () {
    await this.populate()
  },

  computed: {
    ...mapFields('studentProfile', [
      'data.first_name',
      'data.last_name',
      'data.age_on_arrival',
      'data.gender',
      'data.email',
      'data.length_of_stay',
      'data.passport_country',
      'data.passport_number',
      'data.mother_name',
      'data.father_name',
      'data.language',
      'data.letter',
      'data.description',
      'data.imagine',
      'data.submitted',
      'data.interview'
    ]),
    ...mapFields('program', ['programs'])
  },

  methods: {
    ...mapActions('program', ['populate'])
  }

  /*  async fetch () {
    const swagger = await this.$axios.$get('swagger.json')
    this.schema = swagger.definitions.student_profile.properties
    this.clear()

    this.program_list = await this.$axios.$get('api/program')

    const checkObjectId = /^[a-f\d]{24}$/i
    let data = {}
    if (this.data.email) {
      if (this.$assistant()) {
        data = await this.$axios.$get(`api/student_profile/${this.$route.query.id}`)
        const studentPersonalData = await this.$axios.$get(`api/student_personal_data?student_profile=${data.id}`)
        this.studentPersonalData = studentPersonalData.length > 0
        console.log(this.studentPersonalData)
      } else if (this.$applicant()) {
        data = await this.$axios.$get(`api/student_profile?email=${this.data.email}`)
        data = data.find(x => x.id)
      }

      if (data) {
        for (const [key, value] of Object.entries(data)) {
          this.$set(this.data, key, value)

          if (value instanceof Object && checkObjectId.test(value.id)) {
            const item = this[`${key}_list`].find(x => x.id === value.id)
            this.$refs[key][key] = item
          }
        }
      }
    }
  }, */

/*  methods: {
    getInterviewDefaultDate () {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      date.setHours(16, 30, 0)

      return date
    },

    async scheduleInterview () {
      const data = await this.$axios.$post('api/student_personal_data', {
        student_profile: this.data.id
      })

      this.studentPersonalData = data

      await this.$axios.$post('aws_cognito/management/users/groups', {
        username: this.data.email,
        group: 'student',
        method: 'add'
      })
    },

    async save () {
      this.overlay = true
      if (this.data.id) {
        await this.$axios.$put('api/student_profile', this.data)
      } else {
        await this.$axios.$post('api/student_profile', this.data)
      }
      this.loading = false
      this.success = true
      setTimeout(() => {
        this.success = false
        this.overlay = false
      }, 2000)
    },

    async submit () {
      this.data.submitted = true
      await this.save()
      this.dialog = false
    },

    loading () {
      console.log(1)
    },

    clear () {

    }
  } */
}
</script>

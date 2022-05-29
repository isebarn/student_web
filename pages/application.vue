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
        Profile
        <v-icon>mdi-badge-account-outline</v-icon>
      </v-tab>
      <v-tab :disabled="!id">
        Personal Data
        <v-icon>mdi-account-details-outline</v-icon>
      </v-tab>
      <v-tab :disabled="!id">
        Account
        <v-icon>mdi-account-cash-outline</v-icon>
      </v-tab>
      <v-tab :disabled="!id">
        Host family
        <v-icon>mdi-human-male-female-child</v-icon>
      </v-tab>
      <v-tab :disabled="!id">
        School
        <v-icon>mdi-school</v-icon>
      </v-tab>
      <v-tab :disabled="!id">
        Airport
        <v-icon>mdi-airport</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row>
          <v-col>
            <studentProfile />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-datetime-picker v-model="interviewModel" label="Interview time">
              <template slot="dateIcon">
                <v-icon>mdi-calendar</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>mdi-clock</v-icon>
              </template>
            </v-datetime-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :disabled="interview !== null" @click="scheduleInterview">
              Schedule Interview
            </v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item v-if="id">
        <studentPersonalData />
      </v-tab-item>
      <v-tab-item v-if="id">
        <accountData />
      </v-tab-item>
      <v-tab-item v-if="id">
        <hostFamily />
      </v-tab-item>
      <v-tab-item v-if="id">
        <school />
      </v-tab-item>
      <v-tab-item v-if="id">
        <hostAirport />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import studentPersonalData from '../components/forms/studentPersonalData'
import studentProfile from '../components/forms/studentProfile'
import accountData from '../components/forms/accountData'
import hostFamily from '../components/forms/hostFamily'
import school from '../components/forms/school'
import hostAirport from '../components/forms/hostAirport'
export default {
  name: 'ApplicationPage',
  components: {
    studentProfile,
    studentPersonalData,
    accountData,
    hostFamily,
    school,
    hostAirport
  },
  data () {
    return {
      tab: null,
      interviewTime: this.getInterviewDefaultDate()
    }
  },

  async fetch () {
    await this.loadStudentProfile({ key: 'id', value: this.$route.query.id })
    await this.loadStudentPersonalData(this.profileId)
  },

  computed: {
    ...mapFields('studentPersonalData', ['data.id']),
    ...mapFields('studentProfile', { profileId: 'data.id', interview: 'data.interview', submitted: 'data.submitted' }),

    interviewModel: {
      get () {
        return this.interview ? new Date(this.interview) : this.interviewTime
      },
      set (newValue) {
        this.interviewTime = newValue
      }
    }
  },

  methods: {
    ...mapActions('studentPersonalData', { loadStudentPersonalData: 'load' }),
    ...mapActions('studentProfile', { loadStudentProfile: 'load' }),
    ...mapActions('studentProfile', ['save', 'setInterview']),

    scheduleInterview () {
      this.setInterview(this.interviewModel)
      this.save()
    },

    getInterviewDefaultDate () {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      date.setHours(16, 30, 0)

      return date
    }
  }
}
</script>

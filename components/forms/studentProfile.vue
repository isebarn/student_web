<template>
  <v-form :readonly="submitted && student">
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
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
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
                @click="finalize"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <studentProfile />
      </v-col>
    </v-row>
    <v-row v-if="!submitted">
      <v-col>
        <!--         <v-btn @click="update">
          Save changes
        </v-btn> -->
        <v-btn block text @click="dialog = true">
          Submit for review
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-banner elevation="12" tile style="width: 100%">
        Application is being processed
      </v-banner>
    </v-row>
  </v-container>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import studentProfile from '../components/forms/studentProfile'
import success from '../components/success'

export default {
  name: 'IndexPage',
  components: { studentProfile, success },

  data () {
    return {
      dialog: false,
      overlay: false,
      success: false,
      loading: false
    }
  },

  async fetch () {
    // await this.load({ key: 'email', value: this.$auth.user.attributes.email })
  },

  computed: {
    ...mapFields('studentProfile', ['data.submitted'])
  },

  methods: {
    ...mapActions('studentProfile', ['save', 'submit', 'load']),

    async update () {
      this.overlay = true
      await this.save()
      this.loading = false
      this.success = true
      this.dialog = false
      setTimeout(() => {
        this.success = false
        this.overlay = false
      }, 2000)
    },

    async finalize () {
      this.submit()
      await this.update()
    }
  }
}
</script>

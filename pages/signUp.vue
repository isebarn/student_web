<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card cols="6" style="width: 500px;">
        <v-card-title />
        <v-card-subtitle>Sign up</v-card-subtitle>
        <v-form>
          <v-container>
            <v-text-field v-model="email" label="Email" :rules="emailRules" />
            <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" />
            <v-text-field v-model="confirm" label="Confirm Password" type="password" />
            <v-overlay
              absolute
              :value="overlay"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              />
              <v-icon v-if="success" x-large>
                mdi-check-circle-outline
              </v-icon>
            </v-overlay>
            <v-btn block color="#5DD099" :disabled="!passwordRule" @click="submit">
              Sign up
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      overlay: false,
      loading: false,
      success: false,
      userExists: false,
      email: 'isebarn182@gmail.com',
      password: 'asd123',
      confirm: 'asd123',
      passwordRules: [
        value => !!value || 'Please type password.',
        value => (value && value.length >= 6) || 'minimum 6 characters'
      ],
      confirmRules: [v => !!v || 'Password is required'],
      emailRules: [
        value => !this.userExists || 'User with this email exists'
      ],
      emailRegex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },

  computed: {
    validateEmail () {
      return this.emailRegex.test(this.email)
    },

    passwordConfirmationRule () {
      return () => (this.password === this.confirm) || 'Password must match'
    },

    passwordRule () {
      return (this.password === this.confirm) && this.password.length >= 6 && this.validateEmail
    }
  },

  methods: {
    async submit () {
      this.overlay = true
      this.loading = true
      const result = await this.$axios.$post('aws_cognito/access/user', {
        email: this.email,
        username: this.email,
        password: this.password
      })

      if (result.success) {
        this.loading = false
        this.success = true
        setTimeout(() => {
          this.$router.push('login')
        }, 2000)
      } else if (result.message.includes('UsernameExistsException')) {
        this.userExists = true
      }
      this.overlay = false
      this.email = ''
      this.password = ''
      this.confirm = ''
      this.overlay = false
      this.loading = false
      this.success = false
    }
  }
}
</script>

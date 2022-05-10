<template>
  <v-container pa-0>
    <v-col v-if="session">
      <v-text-field v-model="newPassword" label="Password" />
      <v-text-field v-model="password" label="Confirm Password" />
      <v-btn @click="setNewPassword">
        Set password
      </v-btn>
    </v-col>
    <v-col v-else>
      <v-text-field v-model="username" label="Email" prepend-icon="mdi-email" />
      <v-text-field v-model="password" label="Password" autocomplete="off" type="Password" prepend-icon="mdi-lock" />
      <v-btn block color="#5DD099" @click="login">
        Login
      </v-btn>
      <v-btn block text @click="signUp">
        Sign up
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>

export default {
  name: 'LoginComponent',
  data () {
    return {
      username: '',
      newPassword: '',
      password: '',
      session: null
    }
  },

  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    }
  },

  methods: {
    signUp () {
      this.$router.push('signUp')
    },
    async setNewPassword () {
      await this.$axios.$post('aws_cognito/access/login', {
        username: this.username,
        password: this.newPassword,
        session: this.session
      })

      this.login()
    },

    async login () {
      try {
        const res = await this.$axios.$post('aws_cognito/access/login', {
          username: this.username,
          password: this.password
        })

        if (res.Session) {
          this.session = res.Session
          this.password = ''
        } else {
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
        }
      } catch (e) {
        this.error = e.response
      }
    },
    async logout () {
      try {
        await this.$auth.logout('local')
      } catch (e) {
        this.error = e.response
      }
    }
  }
}
</script>

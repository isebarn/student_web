<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card cols="6" style="width: 500px;">
        <v-card-title>
          You will receive an email
        </v-card-title>
        <v-card-subtitle>The email will contain a temporary password</v-card-subtitle>
        <v-form>
          <v-container>
            <v-text-field v-model="email" label="Email" />
            <v-btn block color="#5DD099" @click="submit">
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
      email: ''
    }
  },

  methods: {
    async submit () {
      await this.$axios.$post('aws_cognito/management/users', {
        email: this.email
      })
      this.$router.push('login')
    }

  }
}
</script>

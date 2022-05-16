<template>
  <v-container>
    <v-card v-if="user">
      <v-card-title>{{ user.attributes.email }}</v-card-title>
      <v-divider />
      <v-card-subtitle class="my-4 text-subtitle-1">
        Password
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="newPassword"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.min]"
          :type="showNewPassword ? 'text' : 'password'"
          label="New password"
          @click:append="showNewPassword = !showNewPassword"
        />
        <v-text-field
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.match]"
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Confirm password"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />
        <v-btn :disabled="newPasswordRequirementsMet" @click="setUserPassword">
          Set new password
        </v-btn>
        <v-btn @click="forgotPassword">
          Send reset link
        </v-btn>
      </v-card-text>
      <v-divider />
      <v-card-subtitle class="my-4 text-subtitle-1">
        User roles
      </v-card-subtitle>
      <v-card-actions>
        <v-chip-group v-model="userGroups" multiple active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="group in groups" :key="group" @click="god(group)">
            {{ group }}
          </v-chip>
        </v-chip-group>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UserPage',

  data () {
    return {
      user: null,
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      rules: {
        min: () => (this.newPassword.length >= 6 || this.newPassword.length === 0) || 'Min 6 characters',
        match: () => this.newPassword === this.confirmPassword || 'Passwords dont match'
      },
      groups: [],
      userGroups: []
    }
  },

  async fetch () {
    this.user = await this.$axios.$get(`aws_cognito/management/users/${this.$route.query.user}`)

    const groups = await this.$axios.$get('aws_cognito/management/groups')
    this.groups = groups.map(x => x.group_name)
    const usrGroups = this.user.groups.map(x => x.group)
    this.userGroups = usrGroups.map(x => this.groups.indexOf(x))
  },

  computed: {
    newPasswordRequirementsMet () {
      return !(this.newPassword.length >= 6 && this.newPassword === this.confirmPassword)
    }
  },

  methods: {
    async god (group) {
      await this.$axios.$post('aws_cognito/management/users/groups', {
        username: this.user.attributes.sub,
        group,
        method: !this.userGroups.includes(this.groups.indexOf(group)) ? 'add' : 'delete'
      })
    },

    setUserPassword () {
      if (this.$route.query.user) {
        this.$axios.post(`aws_cognito/management/users/${this.$route.query.user}/set_password`,
          { password: this.newPassword }).then((r) => {
          this.newPassword = ''
          this.confirmPassword = ''
        })
      }
    },

    forgotPassword () {
      if (this.$route.query.user) {
        this.$axios.$post(`aws_cognito/management/users/${this.$route.query.user}/forgot_password`)
      }
    }
  }

}
</script>

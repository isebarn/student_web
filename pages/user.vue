<template>
  <v-container>
    <v-chip-group v-if="user" v-model="userGroups" multiple active-class="deep-purple accent-4 white--text" column>
      <v-chip v-for="group in groups" :key="group" @click="god(group)">
        {{ group }}
      </v-chip>
    </v-chip-group>
  </v-container>
</template>

<script>
export default {
  name: 'UserPage',

  data () {
    return {
      user: {},
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

  methods: {
    async god (group) {
      await this.$axios.$post('aws_cognito/management/users/groups', {
        username: this.user.attributes.sub,
        group,
        method: !this.userGroups.includes(this.groups.indexOf(group)) ? 'add' : 'delete'
      })
    }
  }

}
</script>

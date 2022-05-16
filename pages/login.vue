<template>
  <v-container v-if="!$auth.loggedIn">
    <v-row align="center" justify="center">
      <v-card cols="6" style="width: 500px;">
        <v-card-title class="headline justify-center">
          Sign in to the portal
        </v-card-title>
        <v-card-text>
          <v-container pa-0>
            <login autocomplete="chrome-off" />
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import login from '~/components/login'
export default {
  name: 'HomePage',
  components: {
    login
  }
}
</script>

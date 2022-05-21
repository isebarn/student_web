<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      clipped
      fixed
      app
      style="background-color: #E8F4EA;"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in available_items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn block style="background-color: #E1EBED" @click="$auth.logout()">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="background-color: #FCFDFC;">
      <v-container style="background-color: #FCFDFC;">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      god: false,
      items: [
        { title: 'Applications', to: 'applications', precedence: 2 },
        { title: 'Account', to: 'account', precedence: 2 },
        { title: 'Airport', to: 'airport_code', precedence: 2 },
        { title: 'Flight Info', to: 'flight_info', precedence: 2 },
        { title: 'Host family', to: 'host_family', precedence: 2 },
        { title: 'Programs', to: 'new_program', precedence: 2 },
        { title: 'Users', to: 'users', precedence: 2 }
      ]
    }
  },

  computed: {
    precedence () {
      return Math.min(...this.$auth.user.groups.map(x => x.precedence))
    },

    available_items () {
      return this.items.filter(x => this.precedence <= x.precedence)
    }
  }
}
</script>

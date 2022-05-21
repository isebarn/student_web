<template>
  <v-container>
    <v-list v-if="fam" dense>
      <v-subheader>asd</v-subheader>
      <v-list-item
        v-for="(item, i) in fam.host_family_child"
        :key="i"
      >
        <v-list-item-icon>
          <v-icon v-text="item.name" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.gender" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row>
      <v-col>
        <v-text-field v-model="name" />
        <v-text-field v-model="gender" />
      </v-col>
    </v-row>
    <v-btn @click="addChild">
      click
    </v-btn>
  </v-container>
</template>

<script>

export default {
  name: 'DevPage',
  data () {
    return {
      fam: null,
      name: '',
      gender: ''
    }
  },

  async fetch () {
    const a = await this.$axios.$get('api/host_family')
    this.fam = a[0]
  },

  methods: {
    async addChild () {
      const child = await this.$axios.$post('api/host_family_child', { name: this.name, gender: this.gender })

      this.fam.host_family_child.push(child)
      await this.$axios.$patch('api/host_family', {
        id: this.fam.id,
        host_family_child: this.fam.host_family_child
      })
    }
  }

}
</script>

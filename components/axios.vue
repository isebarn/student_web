<template>
  <v-container>
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import success from '../components/success'
export default {
  name: 'AxiosLoader',
  components: { success },
  computed: {
    ...mapGetters([
      'overlay',
      'success',
      'loading'
    ])
  },

  methods: {
    ...mapActions([
      'setLoading',
      'setSuccess',
      'setDone'
    ])
  }
}
</script>

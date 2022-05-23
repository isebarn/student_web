<template>
  <v-container>
    <v-text-field v-model="name" outlined :class="name === '0' ? 'completed' : 'working'" label="heh" />
  </v-container>
</template>

<script>

export default {
  name: 'DevPage',
  data () {
    return {
      name: '0'
    }
  }
}
</script>

<style scoped>

.completed >>> fieldset {
  border-color: green;
  border-width: 2px;
  color:  green;
}

.working >>> fieldset {}
</style>

<template>
  <v-text-field-money
    v-model="money"
    :properties="moneyProperties"
    :options="moneyOptions"
    :label="label"
    type="number"
    @change="handleChange"
  />
</template>

<script>
export default {
  name: 'MoneyComponent',
  props: {
    length: {
      type: Number,
      default: 10
    },
    value: Number,
    label: String
  },
  data () {
    return {
      money: null,
      moneyProperties: {
        prefix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: ''
      },
      moneyOptions: {
        locale: 'pt-BR',
        length: this.length,
        precision: 0,
        empty: null

      }
    }
  },

  methods: {
    handleChange () {
      this.$emit('input', parseFloat(this.money))
    }
  }
}
</script>

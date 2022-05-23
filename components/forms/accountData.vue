<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field v-model="program.price" readonly prefix="Program Price:  " filled />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <money ref="diet" v-model="data.diet" label="Diet" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <money ref="region" v-model="data.region" label="Region" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="data.other_reason" label="Other" />
            </v-col>
            <v-col>
              <money ref="other" v-model="data.other" label="Ammount" />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>{{ program.code }}</v-card-title>
              <v-card-subtitle>Country: {{ program.country }}</v-card-subtitle>
              <v-card-text>
                Program Description: {{ program.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money ref="credits" v-model="data.credits" label="Credit Amount" />
            <v-text-field v-model="data.credits_reason" label="Credit Reason" />
            <v-text-field :value="total" prefix="Total:  " readonly outlined />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text--primary" v-text="'Deposit'" />
            <v-list-item-subtitle>{{ (0.20 * total).toFixed(0) }} EUR</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <money ref="deposit" v-model="data.deposit" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text--primary" v-text="'2nd'" />
            <v-list-item-subtitle>{{ (0.30 * total).toFixed(0) }} EUR</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <money ref="second_installment" v-model="data.second_installment" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text--primary" v-text="'3rd'" />
            <v-list-item-subtitle>{{ (0.30 * total).toFixed(0) }} EUR</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <money ref="third_installment" v-model="data.third_installment" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text--primary" v-text="'4th'" />
            <v-list-item-subtitle>{{ (0.20 * total).toFixed(0) }} EUR</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <money ref="final_installment" v-model="data.final_installment" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-text-field
          v-model="owed"
          readonly
          outlined
          label="Balance"
          :class="owed === '0' ? 'completed' : 'working'"
        >
          <template v-if="owed === '0'" #append>
            <v-icon color="green">
              mdi-check-circle-outline
            </v-icon>
          </template>
        </v-text-field>
        </v-list-item>
      </v-list>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="save">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import money from '../money'

export default {
  name: 'AccountData',
  components: { money },
  data () {
    return {
      program: {},
      data: {},
      installments: [
        { obj: 'deposit', description: 'Deposit', ratio: 0.20 },
        { obj: 'second_installment', description: '2nd', ratio: 0.30 },
        { obj: 'third_installment', description: '3rd', ratio: 0.30 },
        { obj: 'final_installment', description: '4th', ratio: 0.20 }

      ]
    }
  },

  async fetch () {
    const swagger = await this.$axios.$get('swagger.json')
    this.schema = swagger.definitions.account.properties

    for (const [key, value] of Object.entries(this.schema)) {
      if (value.$ref) {
        this[`${key}_list`] = await this.$axios.$get(`api/${key}`)
      }
    }

    const checkObjectId = /^[a-f\d]{24}$/i
    if (this.$route.query.id) {
      const studentPersonalData = await this.$axios.$get(`api/student_personal_data/${this.$route.query.id}`)
      this.program = studentPersonalData.program

      if (studentPersonalData.account) {
        const data = await this.$axios.$get(`api/account/${studentPersonalData.account.id}`)
        for (const [key, value] of Object.entries(data)) {
          if (key === 'id') {
            continue
          } else if (value instanceof Object && checkObjectId.test(value.id)) {
            continue
          } else if (this.schema[key].format === 'date-time') {
            if (key.startsWith('date_')) {
              this.$refs[key].date = value.split('T')[0]
            } else {
              this.data[key] = new Date(value)
            }
          } else {
            this.$set(this.data, key, value)
            this.$set(this.$refs[key], 'money', value)
          }
        }
      }
    }
  },

  computed: {
    total () {
      return (this.program.price +
      (this.data.diet ?? 0) +
      (this.data.region ?? 0) +
      (this.data.other ?? 0) -
      (this.data.credits ?? 0)).toFixed(0)
    },
    owed () {
      return (this.total -
      (this.data.deposit ?? 0) -
      (this.data.second_installment ?? 0) -
      (this.data.third_installment ?? 0) -
      (this.data.final_installment ?? 0)).toFixed(0)
    }
  },

  methods: {
    god () {
      const newData = {}
      for (const [key, value] of Object.entries(this.$refs)) {
        newData[key] = value.money
      }
      for (const [key, value] of Object.entries(this.data)) {
        newData[key] = value
      }

      console.log(newData)
    },
    async save () {
      const newData = {}
      for (const [key, value] of Object.entries(this.$refs)) {
        newData[key] = value.money
      }
      for (const [key, value] of Object.entries(this.data)) {
        newData[key] = value
      }

      console.log(newData)
      if (this.data.id) {
        await this.$axios.$put('api/account', {
          ...newData,
          id: this.data.id
        })
      } else {
        const data = await this.$axios.$post('api/account', newData)

        await this.$axios.$patch('api/student_personal_data', {
          id: this.$route.query.id,
          account: data.id
        })
      }
    }
  }
}
</script>
<style scoped>

.completed >>> fieldset {
  border-color: green;
  border-width: 2px;
  label:  green;
}

.working >>> fieldset {}
</style>

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
        <v-btn @click="update">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import money from '../money'
export default {
  name: 'AccountData',
  components: { money },
  data () {
    return {
      data: {

        diet: null,
        region: null,
        other_reason: '',
        other: null,
        credits_reason: '',
        credits: null,
        deposit: null,
        second_installment: null,
        third_installment: null,
        final_installment: null
      },
      installments: [
        { obj: 'deposit', description: 'Deposit', ratio: 0.20 },
        { obj: 'second_installment', description: '2nd', ratio: 0.30 },
        { obj: 'third_installment', description: '3rd', ratio: 0.30 },
        { obj: 'final_installment', description: '4th', ratio: 0.20 }

      ]
    }
  },

  computed: {
    ...mapFields('studentProfile', ['data.program']),
    ...mapFields('studentPersonalData', ['data.account']),

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

  mounted () {
    this.$set(this.$refs.diet, 'money', 2000)
    for (const [key, value] of Object.entries(this.account)) {
      if (value) {
        this.$set(this.data, key, value)

        if (this.$refs[key]) {
          this.$set(this.$refs[key], 'money', value)
        }
      }
    }
  },

  methods: {
    ...mapActions('studentPersonalData', ['updateAccounts', 'save']),

    updateData () {
      this.data = { ...this.account, ...this.data }
    },

    async update () {
      this.updateData()
      this.updateAccounts(this.data)
      await this.save()
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

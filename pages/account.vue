<template>
  <v-form>
    <v-container>
      <v-card flat>
        <v-row>
          <v-col>
            <v-select v-model="program" :items="programmes" label="Program">
              <template #selection="{item}">
                {{ item.code }} - {{ item.description }} - {{ item.country }}
              </template>
              <template #item="{item}">
                <v-list>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.code }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.description }} - {{ item.price }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        {{ item.country }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="deposit_prog" append-icon="mdi-currency-eur" label="Deposit prog" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="second_installment" append-icon="mdi-currency-eur" label="Second Installment" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="third_installment" append-icon="mdi-currency-eur" label="Third Installment" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="final_installment" append-icon="mdi-currency-eur" label="Final Installment" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="total_prog" append-icon="mdi-currency-eur" label="Total Prog" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="credit_1" append-icon="mdi-currency-eur" label="Credit 1" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="credit_2" append-icon="mdi-currency-eur" label="Credit 2" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="formula" label="Formula" />
          </v-col>
        </v-row>
        <div class="text-h5 mb-1 py-5">
          Payments
        </div>

        <v-row>
          <v-col>
            <v-text-field v-model="deposit_paid" append-icon="mdi-currency-eur" label="Deposit Paid" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="second_installment_paid" append-icon="mdi-currency-eur" label="Second Installment Paid" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="third_installment_paid" append-icon="mdi-currency-eur" label="Third Installment Paid" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="final_installment_paid" append-icon="mdi-currency-eur" label="Final Installment Paid" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="balance_owed" append-icon="mdi-currency-eur" label="Balance owed" />
          </v-col>
        </v-row>

        <v-btn @click="submit">
          Submit
        </v-btn>
        <v-btn @click="clear">
          Clear
        </v-btn>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>

export default {
  name: 'AccountData',

  data () {
    return {
      program: null,
      deposit_prog: '',
      second_installment: '',
      third_installment: '',
      final_installment: '',
      total_prog: '',
      credit_1: '',
      credit_2: '',
      formula: '',
      deposit_paid: '',
      second_installment_paid: '',
      third_installment_paid: '',
      final_installment_paid: '',
      balance_owed: '',
      programmes: []
    }
  },

  async fetch () {
    this.programmes = await this.$axios.$get('api/program')
  },

  methods: {
    async submit () {
      console.log(this.$refs.application_date_picker.date)
      await this.$axios.$post('api/account', {
        program: this.program,
        deposit_prog: this.deposit_prog,
        second_installment: this.second_installment,
        third_installment: this.third_installment,
        final_installment: this.final_installment,
        total_prog: this.total_prog,
        credit_1: this.credit_1,
        credit_2: this.credit_2,
        formula: this.formula,
        deposit_paid: this.deposit_paid,
        second_installment_paid: this.second_installment_paid,
        third_installment_paid: this.third_installment_paid,
        final_installment_paid: this.final_installment_paid,
        balance_owed: this.balance_owed
      })

      this.clear()
    },

    clear () {
      this.program = null
      this.deposit_prog = ''
      this.second_installment = ''
      this.third_installment = ''
      this.final_installment = ''
      this.total_prog = ''
      this.credit_1 = ''
      this.credit_2 = ''
      this.formula = ''
      this.deposit_paid = ''
      this.second_installment_paid = ''
      this.third_installment_paid = ''
      this.final_installment_paid = ''
      this.balance_owed = ''
    }
  }
}
</script>

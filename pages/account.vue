<template>
  <v-form>
    <v-container>
      <v-card flat>
        <v-row>
          <v-col>
            <program ref="program" v-model="program" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="deposit_prog"
              v-model="deposit_prog"
              label="Deposit prog"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="second_installment"
              v-model="second_installment"
              label="Second Installment"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="third_installment"
              v-model="third_installment"
              label="Third Installment"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="final_installment"
              v-model="final_installment"
              label="Final Installment"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="total_prog"
              v-model="total_prog"
              label="Total Prog"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="credit_1"
              v-model="credit_1"
              label="Credit 1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="credit_2"
              v-model="credit_2"
              label="Credit 2"
            />
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
            <money
              ref="deposit_paid"
              v-model="deposit_paid"
              label="Deposit Paid"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="second_installment_paid"
              v-model="second_installment_paid"
              label="Second Installment Paid"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="third_installment_paid"
              v-model="third_installment_paid"
              label="Third Installment Paid"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="final_installment_paid"
              v-model="final_installment_paid"
              label="Final Installment Paid"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <money
              ref="balance_owed"
              v-model="balance_owed"
              label="Balance owed"
            />
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
import money from '../components/money'
import program from '../components/program'
export default {
  name: 'AccountData',
  components: { money, program },
  data () {
    return {
      program: null,
      deposit_prog: null,
      second_installment: null,
      third_installment: null,
      final_installment: null,
      total_prog: null,
      credit_1: null,
      credit_2: null,
      formula: '',
      deposit_paid: null,
      second_installment_paid: null,
      third_installment_paid: null,
      final_installment_paid: null,
      balance_owed: null
    }
  },

  methods: {
    async submit () {
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
      this.$refs.program.program = null
      this.$refs.deposit_prog.money = null
      this.$refs.second_installment.money = null
      this.$refs.third_installment.money = null
      this.$refs.final_installment.money = null
      this.$refs.total_prog.money = null
      this.$refs.credit_1.money = null
      this.$refs.credit_2.money = null
      this.formula = ''
      this.$refs.deposit_paid.money = null
      this.$refs.second_installment_paid.money = null
      this.$refs.third_installment_paid.money = null
      this.$refs.final_installment_paid.money = null
      this.$refs.balance_owed.money = null
    }
  }
}
</script>

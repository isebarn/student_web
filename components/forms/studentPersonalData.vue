<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="school_name" label="School name" />
        </v-col>
        <v-col>
          <v-text-field v-model="school_type" label="School type" />
        </v-col>
        <v-col>
          <v-text-field v-model="average_grades" label="Average grades" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="allergies" label="Allergies" />
        </v-col>
        <v-col>
          <v-text-field v-model="nationality" label="Nationality" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <datePick2 path="studentPersonalData" item="DateOfBirth" label="Date of birth" />
        </v-col>
        <v-col>
          <datePick2 path="studentPersonalData" item="DateOfApplication" label="Date of Application" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="student_address_line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="student_address_line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="student_address_city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="student_address_postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="student_address_country" label="Country" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Father
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="father_first_name" label="Father First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_last_name" label="Father Last Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_email" label="Father Email" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_tel" label="Father Telephone" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Mother
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="mother_first_name" label="Mother First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_last_name" label="Mother Last Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_email" label="Mother Email" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_tel" label="Mother Telephone" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h5 mb-1 py-5 ">
            Father Address
          </div>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="father_address_line_1" label="Address line 1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="father_address_line_2" label="Address line 2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="father_address_city" label="City" />
            </v-col>
            <v-col>
              <v-text-field v-model="father_address_postal_code" label="Postal code" />
            </v-col>
            <v-col>
              <v-text-field v-model="father_address_country" label="Country" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <div class="text-h5 mb-1 py-5 ">
            Mother Address
          </div>
          <v-row>
            <v-col>
              <v-text-field v-model="mother_address_line_1" label="Address line 1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="mother_address_line_2" label="Address line 2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="mother_address_city" label="City" />
            </v-col>
            <v-col>
              <v-text-field v-model="mother_address_postal_code" label="Postal code" />
            </v-col>
            <v-col>
              <v-text-field v-model="mother_address_country" label="Country" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="save">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
// import datePick from '../datePick'
import datePick2 from '../datePick2'

export default {
  name: 'StudentPersonalDataForm',
  components: { datePick2 },

  computed: {
    ...mapFields('studentPersonalData', [
      'data.allergies',
      'data.average_grades',
      'data.date_of_application',
      'data.date_of_birth',
      'data.nationality',
      'data.school_name',
      'data.school_type'
    ]),

    ...mapFields('studentPersonalData', {
      student_address_line_1: 'data.address.line_1',
      student_address_line_2: 'data.address.line_2',
      student_address_city: 'data.address.city',
      student_address_postal_code: 'data.address.postal_code',
      student_address_country: 'data.address.country'
    }),

    ...mapFields('studentPersonalData', {
      father_first_name: 'data.father.first_name',
      father_last_name: 'data.father.last_name',
      father_email: 'data.father.email',
      father_tel: 'data.father.tel',
      father_address_line_1: 'data.father.address.line_1',
      father_address_line_2: 'data.father.address.line_2',
      father_address_city: 'data.father.address.city',
      father_address_postal_code: 'data.father.address.postal_code',
      father_address_country: 'data.father.address.country'
    }),

    ...mapFields('studentPersonalData', {
      mother_first_name: 'data.mother.first_name',
      mother_last_name: 'data.mother.last_name',
      mother_email: 'data.mother.email',
      mother_tel: 'data.host_family.mother.tel',
      mother_address_line_1: 'data.mother.address.line_1',
      mother_address_line_2: 'data.mother.address.line_2',
      mother_address_city: 'data.mother.address.city',
      mother_address_postal_code: 'data.mother.address.postal_code',
      mother_address_country: 'data.mother.address.country'
    })
  },

  methods: {
    ...mapActions('studentPersonalData', ['save'])
  }
}
</script>

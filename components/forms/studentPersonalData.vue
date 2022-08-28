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
          <v-text-field v-model="nationality" label="Nationality" maxlength="20" counter="20" />
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
      <v-row>
        <v-col>
          <v-text-field v-model="languages_spoken" label="Languages spoken" maxlength="30" counter="30" />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="age_on_arrival"
            label="Age on arrrival"
            counter="2"
            type="number"
            max="99"
            min="1"
            oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
          />
        </v-col>
        <v-col>
          <v-text-field v-model="region_requested" label="Region requested" maxlength="20" counter="20" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="pls_describe_yourself" label="Please describe yourself" maxlength="120" counter="120" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="imagine_life_with_host" label="How do you imagine life with a host family?" maxlength="120" counter="120" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="can_live_with_animals" label="Can you live with animals in the home?" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
          <v-text-field v-model="animal_no_explain" label="If No, please explain" maxlength="120" counter="120" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="dietary_needs" label="Have you special dietary needs?" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
          <v-text-field v-model="dietary_needs_yes" label="If yes, what?" maxlength="40" counter="40" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5 mb-1 py-5 ">
          School
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="study_subjects" label="Please names subjects you would like to study" maxlength="120" counter="120" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="present_class" label="Present class/year at home" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="when_leave_school" label="What will you do when you leave school?" maxlength="40" counter="40" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5 mb-1 py-5 ">
          Health
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-radio-group v-model="allergies" label="Allergies" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
        <v-col>
          <v-radio-group v-model="allergies_severity" label="If yes" row>
            <v-radio label="Severe" value="Severe" />
            <v-radio label="Mild" value="Mild" />
          </v-radio-group>
        </v-col>
        <v-text-field v-model="allergies_yes_explain" label="If yes, please explain" maxlength="40" counter="40" />
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-radio-group v-model="eating_disorders" label="Have you had eating disorders?" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
        <v-col>
          <v-text-field v-model="eating_disorders_explain" label="If Yes, please explain" maxlength="40" counter="40" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-radio-group v-model="medication" label="Do you take any medication?" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
        <v-col>
          <v-text-field v-model="medication_explain" label="If Yes, what" maxlength="40" counter="40" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-radio-group v-model="medical_issues" label="Are there any medical issues that the family, school or we should know of?" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
        <v-col>
          <v-text-field v-model="medical_issues_explain" label="If Yes, what" maxlength="40" counter="40" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="openAdditionalForm">
            None EU
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5 mb-1 py-5 ">
          Declaration
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_to_exams" label="I understand and agree that I have to study seriously and take any exams for which the school enters me" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_to_bus" label="I understand and agree that I may be placed in a rural or urban home and take a bus to school" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="aree_for_co_student" label="I understand and agree that I may be placed with another student in the home" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_no_school_contact" label="I understand and agree that it is not permitted to contact the school directly prior to arrival until I am told do do so" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_host_family" label="I understand and agree that I cannot change the Host Family without a valid reason" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_region" label="I understand and agree that a change of Host Family may mean a change of region" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_travel_cancellation" label="I understand and agree that I may not leave my town of placement without completing a Travel Release Form and must accept a travel refusal if my plans are considered unsuitable or unsafe" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_no_money_exchange" label="I understand that I shall not borrow or lend money to any person during my programme" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="agree_for_no_visits" label="I understand that unauthorised visits from friends or relatives may cause the programme to be terminated" row>
            <v-radio label="Yes" value="Yes" />
            <v-radio label="No" value="No" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          I and my parents or legal guardians understand and agree that the following actions or behaviour could lead to my programme termination:
          <ul>
            <li>Consumption of alcohol or none prescription drugs</li>
            <li>Unauthorised travel</li>
            <li>Driving a motorised vehicle</li>
            <li>Sexual relations</li>
            <li>Not adhering to Host Family rules such as curfews</li>
            <li>Behaving disrespectfully towards Host Family of into-Personnel</li>
            <li>Failure to maintain at least a C average in all subjects despite a written warning</li>
            <li>Failing to complete homework assignments despite a written warning</li>
            <li>Not attending school regularly despite a written warning</li>
            <li>Excessive use of the internet</li>
            <li>Downloading of material from the internet</li>
            <li>If the above is contravened my parents shall pay and financial loss to the Host Family</li>
          </ul>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5 mb-1 py-5 ">
          Father
        </v-col>
      </v-row>
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
      <v-row>
        <v-col class="text-h5 mb-1 py-5 ">
          Mother
        </v-col>
      </v-row>
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
        <v-col>We the undersigned agree to these rules that are designed to make the programme an enjoyable experience and success:</v-col>
      </v-row>
      <v-row>
        <v-col>
          Student signature
          <v-file-input
            chips
            show-size
            small-chips
            truncate-length="50"
          />
        </v-col>
        <v-col>
          Parent signature
          <v-file-input
            chips
            show-size
            small-chips
            truncate-length="50"
          />
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
      'data.average_grades',
      'data.date_of_application',
      'data.date_of_birth',
      'data.nationality',
      'data.school_name',
      'data.school_type',
      'data.languages_spoken',
      'data.age_on_arrival',
      'data.region_requested',
      'data.pls_describe_yourself',
      'data.imagine_life_with_host',
      'data.can_live_with_animals',
      'data.animal_no_explain',
      'data.dietary_needs',
      'data.dietary_needs_yes'
    ]),

    ...mapFields('studentPersonalData', {
      student_address_line_1: 'data.address.line_1',
      student_address_line_2: 'data.address.line_2',
      student_address_city: 'data.address.city',
      student_address_postal_code: 'data.address.postal_code',
      student_address_country: 'data.address.country'
    }),

    ...mapFields('studentPersonalData', {
      study_subjects: 'data.school.study_subjects',
      present_class: 'data.school.present_class',
      when_leave_school: 'data.school.when_leave_school'
    }),

    ...mapFields('studentPersonalData', {
      allergies: 'data.health.allergies',
      allergies_severity: 'data.health.allergies_severity',
      allergies_yes_explain: 'data.health.allergies_yes_explain',
      eating_disorders: 'data.health.eating_disorders',
      eating_disorders_explain: 'data.health.eating_disorders_explain',
      medication: 'data.health.medication',
      medication_explain: 'data.health.medication_explain',
      medical_issues: 'data.health.medical_issues',
      medical_issues_explain: 'data.health.medical_issues_explain'
    }),

    ...mapFields('studentPersonalData', {
      agree_to_exams: 'data.declaration.agree_to_exams',
      agree_to_bus: 'data.declaration.agree_to_bus',
      aree_for_co_student: 'data.declaration.aree_for_co_student',
      agree_for_no_school_contact: 'data.declaration.agree_for_no_school_contact',
      agree_for_host_family: 'data.declaration.agree_for_host_family',
      agree_for_region: 'data.declaration.agree_for_region',
      agree_for_travel_cancellation: 'data.declaration.agree_for_travel_cancellation',
      agree_for_no_money_exchange: 'data.declaration.agree_for_no_money_exchange',
      agree_for_no_visits: 'data.declaration.agree_for_no_visits'
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
    ...mapActions('studentPersonalData', ['save']),
    openAdditionalForm () {
      // TODO: display additional form modal / fields for USA, Canada, Australia
    }
  }
}
</script>

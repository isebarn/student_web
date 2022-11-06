<template>
  <v-form :readonly="submitted && student">
    <v-row>
      <v-col>
        <v-text-field v-model="first_name" label="First Name" />
      </v-col>
      <v-col>
        <v-text-field v-model="last_name" label="Last Name" />
      </v-col>
      <v-col>
        <v-text-field v-model="gender" label="Gender" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="age_on_arrival" label="Age on arrival" maxlength="2" />
      </v-col>
      <v-col>
        <v-text-field v-model="length_of_stay" label="Length of stay" />
      </v-col>
      <v-col>
        <v-text-field v-model="language" label="Languages spoken" maxlength="30" />
      </v-col>
      <v-col>
        <v-text-field v-model="nationality" label="Nationality" maxlength="20" />
      </v-col>
      <v-col>
        <v-text-field v-model="region_requested" label="Region requested" maxlength="20" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="passport_country" label="Passport country" />
      </v-col>
      <v-col>
        <v-text-field v-model="passport_number" label="Passport number" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="mother_name" label="Mother name" />
      </v-col>
      <v-col>
        <v-text-field v-model="father_name" label="Father name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="letter" outlined label="Letter" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea v-model="description" outlined label="Please describe yourself" maxlength="120" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea v-model="description" outlined label="What are you hobbies and interests" maxlength="120" />
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="imagine" outlined label="How do you imagine life with a host family?" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="can_live_with_animals"
          mandatory
          columns
          label="Can you live with animals in the home?"
        >
          <v-radio
            label="Yes"
            :value="true"
          />
          <v-radio
            label="No"
            :value="false"
          />
        </v-radio-group>
        <v-text-field v-if="!canAnimals" v-model="why_cannot_live_with_animals" label="please explain" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="special_dietary_needs"
          mandatory
          columns
          label="Have you special dietary needs"
        >
          <v-radio
            label="No"
            :value="false"
          />
          <v-radio
            label="Yes"
            :value="true"
          />
        </v-radio-group>
        <v-text-field v-if="!specialDiet" v-model="what_special_dietary_needs" label="If yes, what?" />
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-textarea v-model="subjects" maxlength="120" outlined label="Please names subjects you would like to study" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="present_class" label="Present class/year at home" maxlength="20" />
      </v-col>
      <v-col>
        <v-text-field v-model="what_do_when_leave_school" label="What will you do when you leave school?" maxlength="40" />
      </v-col>
    </v-row>
    <v-row>
      <v-radio-group
        v-model="allergies"
        mandatory
        columns
        label="Allergies"
      >
        <v-radio
          label="No"
          :value="0"
        />
        <v-radio
          label="Mild"
          :value="1"
        />
        <v-radio
          label="Severe"
          :value="2"
        />
      </v-radio-group>
      <v-text-field v-if="severeAllergy" v-model="allergies_explain" label="If yes what please explain?" />
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="eating_disorder"
          mandatory
          columns
          label="Have you had eating disorders?"
        >
          <v-radio
            label="No"
            :value="false"
          />
          <v-radio
            label="Yes"
            :value="true"
          />
        </v-radio-group>
        <v-text-field v-if="!hasEatingDisorder" v-model="what_eating_disorder" label="If yes, what?" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="medication"
          mandatory
          columns
          label="Do you take any medication? "
        >
          <v-radio
            label="No"
            :value="false"
          />
          <v-radio
            label="Yes"
            :value="true"
          />
        </v-radio-group>
        <v-text-field v-if="!hasMedication" v-model="what_medication" label="If yes, what?" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="family_school_medical_issues"
          mandatory
          columns
          label="Are there any medical issues that the family, school or we should know of?"
        >
          <v-radio
            label="No"
            :value="false"
          />
          <v-radio
            label="Yes"
            :value="true"
          />
        </v-radio-group>
        <v-text-field v-if="!environMedicalIssues" v-model="what_family_school_medical_issues" label="If yes, what?" />
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_study"
        class="pa-0 ma-0"
        label="I understand and agree that I have to study seriously and take any exams for which the school enters me"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_rural"
        class="pa-0 ma-0"
        label="I understand and agree that I may be placed in a rural or urban home and take a bus to school"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_another_student"
        class="pa-0 ma-0"
        label="I understand and agree that I may be placed with another student in the home"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_contact_school"
        class="pa-0 ma-0"
        label="I understand and agree that it is not permitted to contact the school directly prior to arrival until I am told do do so"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_cannot_change_family"
        class="pa-0 ma-0"
        label="I understand and agree that I cannot change the Host Family without a valid reason"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_change_family_region"
        class="pa-0 ma-0"
        label="I understand and agree that a change of Host Family may mean a change of region"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_town_of_placement"
        class="pa-0 ma-0"
        label="I understand and agree that I may not leave my town of placement without completing a Travel Release Form and must accept a travel refusal if my plans are considered unsuitable or unsafe"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_borrow_lend_money"
        class="pa-0 ma-0"
        label="I understand that I shall not borrow or lend money to any person during my programme"
      />
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-checkbox
        v-model="agreement_unauthorized_visits"
        class="pa-0 ma-0"
        label="I understand that unauthorised visits from friends or relatives may cause the programme to be terminated"
      />
    </v-row>
    <v-row>
      <p class="text-justify">
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
      </p>
    </v-row>
  </v-form>
</template>

<script>

import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
export default {
  name: 'StudentProfile',
  props: {
    student: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      dialog: false,
      overlay: false,
      success: false
    }
  },

  async fetch () {
    await this.populate()
  },

  computed: {
    ...mapFields('studentProfile', [
      'data.first_name',
      'data.last_name',
      'data.age_on_arrival',
      'data.gender',
      'data.email',
      'data.length_of_stay',
      'data.passport_country',
      'data.passport_number',
      'data.mother_name',
      'data.nationality',
      'data.region_requested',
      'data.father_name',
      'data.subjects',
      'data.present_class',
      'data.what_do_when_leave_school',
      'data.language',
      'data.hobbies_interests',
      'data.letter',
      'data.description',
      'data.can_live_with_animals',
      'data.why_cannot_live_with_animals',
      'data.special_dietary_needs',
      'data.what_special_dietary_needs',
      'data.imagine',
      'data.allergies',
      'data.allergies_explain',
      'data.eating_disorder',
      'data.what_eating_disorder',
      'data.medication',
      'data.what_medication',
      'data.family_school_medical_issues',
      'data.what_family_school_medical_issues',
      'agreement_study',
      'agreement_rural',
      'agreement_another_student',
      'agreement_contact_school',
      'agreement_cannot_change_family',
      'agreement_change_family_region',
      'agreement_town_of_placement',
      'agreement_borrow_lend_money',
      'agreement_unauthorized_visits',
      'data.submitted',
      'data.interview'
    ]),
    ...mapFields('program', ['programs']),

    canAnimals () {
      return this.can_live_with_animals
    },

    specialDiet () {
      return !this.special_dietary_needs
    },

    severeAllergy () {
      return this.allergies === 2
    },

    hasEatingDisorder () {
      return !this.eating_disorder
    },

    hasMedication () {
      return !this.medication
    },

    environMedicalIssues () {
      return !this.family_school_medical_issues
    }
  },

  methods: {
    ...mapActions('program', ['populate'])
  }
}
</script>

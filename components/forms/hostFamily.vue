<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="number" label="Host Family Number" maxlength="10" counter="10" />
        </v-col>
        <v-col>
          <v-text-field v-model="family_name" label="Family Name" maxlength="30" counter="30" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Father
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="father_first_name" label="Father First Name" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_last_name" label="Father Last Name" maxlength="30" counter="30" />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="father_age"
            label="Father Age"
            counter="3"
            type="number"
            max="999"
            min="1"
            oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="father_occupation" label="Father Occupation" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_email" label="Father Email" maxlength="40" counter="40" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_tel" label="Father Telephone" maxlength="15" counter="15" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Mother
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="mother_first_name" label="Mother First Name" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_last_name" label="Mother Last Name" maxlength="30" counter="30" />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="mother_age"
            label="Mother Age"
            counter="3"
            type="number"
            max="999"
            min="1"
            oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mother_occupation" label="Mother Occupation" maxlength="20" counter="20" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_email" label="Mother Email" maxlength="40" counter="40" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_tel" label="Mother Telephone" maxlength="15" counter="15" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Address
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="line_1" label="Address line 1" maxlength="30" counter="30" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="line_2" label="Address line 2" maxlength="30" counter="30" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="city" label="City" maxlength="30" counter="30" />
        </v-col>
        <v-col>
          <v-text-field v-model="postal_code" label="Postal code" maxlength="10" counter="10" />
        </v-col>
        <v-col>
          <v-text-field v-model="country" label="Country" maxlength="30" counter="30" />
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-text-field v-model="profile_link" label="Profile Link" /></v-col>
        <v-col><v-checkbox v-model="smoking" label="Smoking" /></v-col>
      </v-row>
      <v-row>
        <v-col><phone path="studentPersonalData" /></v-col>
        <v-col>
          <v-btn block @click="addChild">
            Bank Details
          </v-btn>
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Children
      </div>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col>
              <v-text-field v-model="childName" label="Name" maxlength="20" counter="20" />
            </v-col>
            <v-col>
              <v-radio-group v-model="childGender" label="Gender" row>
                <v-radio label="Male" value="Male" />
                <v-radio label="Female" value="Female" />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-btn block @click="addChild">
              Add
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-list-item
            v-for="(item, i) in child"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.gender }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row />
      <div class="text-h5 mb-1 pa-5 ">
        Pets
      </div>
      <v-row>
        <v-col cols="6">
          <v-row><v-text-field v-model="petName" label="Pet name" maxlength="10" counter="10" /></v-row>
          <v-row><v-text-field v-model="petType" label="Pet type" /></v-row>
          <v-row><v-text-field v-model="familyHobbies" label="Family hobbies and activities" maxlength="80" counter="80" /></v-row>
          <v-row><v-checkbox v-model="petInside" label="Inside" /></v-row>
          <v-btn block @click="addPet">
            Add
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-list-item
            v-for="(item, i) in pet"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.type }} {{ item.inside ? ' (inside)': '' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="success" block @click="save">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import airportPicker from '../airport'
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import phone from '../phone'
export default {
  name: 'HostFamily',

  components: { phone },

  data () {
    return {
      childName: '',
      childGender: '',
      petName: '',
      petType: '',
      familyHobbies: '',
      petInside: false
    }
  },

  computed: {
    ...mapFields('studentPersonalData', [
      'data.host_family.number',
      'data.host_family.family_name',
      'data.host_family.address.line_1',
      'data.host_family.address.line_2',
      'data.host_family.address.city',
      'data.host_family.address.postal_code',
      'data.host_family.address.country',
      'data.host_family.profile_link',
      'data.host_family.smoking'
    ]),

    ...mapFields('studentPersonalData', {
      father_first_name: 'data.host_family.father.first_name',
      father_last_name: 'data.host_family.father.last_name',
      father_age: 'data.host_family.father.age',
      father_occupation: 'data.host_family.father.occupation',
      father_email: 'data.host_family.father.email',
      father_tel: 'data.host_family.father.tel'
    }),

    ...mapFields('studentPersonalData', {
      mother_first_name: 'data.host_family.mother.first_name',
      mother_last_name: 'data.host_family.mother.last_name',
      mother_age: 'data.host_family.mother.age',
      mother_occupation: 'data.host_family.mother.occupation',
      mother_email: 'data.host_family.mother.email',
      mother_tel: 'data.host_family.mother.tel'
    }),

    ...mapMultiRowFields('studentPersonalData', ['data.host_family.child', 'data.host_family.pet'])

  },

  methods: {
    ...mapActions('studentPersonalData', {
      newChild: 'addChild',
      newPet: 'addPet',
      save: 'save'
    }),

    addChild () {
      this.newChild({ name: this.childName, gender: this.childGender })
      this.childName = ''
      this.childGender = ''
    },

    addPet () {
      this.newPet({ name: this.petName, type: this.petType, familyHobbies: this.familyHobbies, inside: this.petInside })
      this.petName = ''
      this.petType = ''
      this.familyHobbies = ''
      this.petInside = false
    }
  }
}
</script>

<style>
  .row {
    padding: 20px;
  }
</style>

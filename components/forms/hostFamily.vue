<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="number" label="Host Family Number" />
        </v-col>
        <v-col>
          <v-text-field v-model="family_name" label="Family Name" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Father
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="father_first_name" label="Father First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_last_name" label="Father Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="father_age" label="Father Age" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_occupation" label="Father Occupation" />
        </v-col>
        <v-col>
          <v-text-field v-model="father_email" label="Father Email" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Mother
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="mother_first_name" label="Mother First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_last_name" label="Mother Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mother_age" label="Mother Age" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_occupation" label="Mother Occupation" />
        </v-col>
        <v-col>
          <v-text-field v-model="mother_email" label="Mother Email" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Address
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="country" label="Country" />
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-text-field v-model="profile_link" label="Profile Link" /></v-col>
        <v-col><v-checkbox v-model="smoking" label="Smoking" /></v-col>
      </v-row>
      <v-row>
        <v-col><phone path="studentPersonalData" /></v-col>
        <v-col><v-text-field /></v-col>
      </v-row>
      <div class="text-h5 mb-1 pa-5 ">
        Children
      </div>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-text-field v-model="childName" label="Name" />
          </v-row>
          <v-row>
            <v-text-field v-model="childGender" label="Gender" />
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
          <v-row><v-text-field v-model="petName" label="Pet name" /></v-row>
          <v-row><v-text-field v-model="petType" label="Pet type" /></v-row>
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
      father_email: 'data.host_family.father.email'
    }),

    ...mapFields('studentPersonalData', {
      mother_first_name: 'data.host_family.mother.first_name',
      mother_last_name: 'data.host_family.mother.last_name',
      mother_age: 'data.host_family.mother.age',
      mother_occupation: 'data.host_family.mother.occupation',
      mother_email: 'data.host_family.mother.email'
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
      this.newPet({ name: this.petName, type: this.petType, inside: this.petInside })
      this.petName = ''
      this.petType = ''
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

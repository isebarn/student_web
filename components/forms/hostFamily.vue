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
      <div class="text-h5 mb-1 py-5 ">
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
      <div class="text-h5 mb-1 py-5 ">
        Children
      </div>
      <v-row>
        <v-col>
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
      <v-row>
        <v-col>
          <v-text-field v-model="childName" label="Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="childGender" label="Gender" />
        </v-col>
      </v-row>
      <v-btn @click="addChild">
        Add
      </v-btn>
      <div class="text-h5 mb-1 py-5 ">
        Pets
      </div>
      <v-list-item
        v-for="(item, i) in pet"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.type }} {{ item.inside ? ' (inside)': '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-row>
        <v-col>
          <v-text-field v-model="petName" label="Pet name" />
        </v-col>
        <v-col>
          <v-text-field v-model="petType" label="Pet type" />
        </v-col>
        <v-col>
          <v-checkbox v-model="petInside" label="Inside" />
        </v-col>
      </v-row>
      <v-btn @click="addPet">
        Add
      </v-btn>
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

  // components: { airportPicker },

/*  async fetch () {
    const swagger = await this.$axios.$get('swagger.json')
    this.schema = swagger.definitions.student_personal_data.properties
    this.clear()

    for (const [key, value] of Object.entries(this.schema)) {
      if (value.$ref) {
        this[`${key}_list`] = await this.$axios.$get(`api/${key}`)
      }
    }

    const checkObjectId = /^[a-f\d]{24}$/i
    if (this.$route.query.id) {
      const data = await this.$axios.$get(`api/host_family/${this.$route.query.id}`)
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof Object && checkObjectId.test(value.id)) {
          const item = this[`${key}_list`].find(x => x.id === value.id)
          this.data[key] = item
          this.$refs[key][key] = item
        } else if (this.schema[key].format === 'date-time') {
          if (key.startsWith('date_')) {
            this.$refs[key].date = value.split('T')[0]
          } else {
            this.data[key] = new Date(value)
          }
        } else {
          this.data[key] = value
        }
      }
    }
  },

  methods: {
    async submit () {
      if (this.data.id) {
        await this.$axios.$put('api/host_family', Object.fromEntries(Object.entries(this.data).filter(([_, v]) => v !== null && v !== '')))
      } else {
        await this.$axios.$post('api/host_family', Object.fromEntries(Object.entries(this.data).filter(([_, v]) => v !== null && v !== '')))
        this.clear()
      }
    },

    addChild () {
      if (!this.data.host_family_child) {
        this.$set(this.data, 'host_family_child', [])
      }
      this.data.host_family_child.push(this.child)
      this.child = {
        name: '',
        gender: ''
      }
    },

    addPet () {
      if (!this.data.host_family_pet) {
        this.$set(this.data, 'host_family_pet', [])
      }
      this.data.host_family_pet.push(this.pet)
      this.pet = {
        name: '',
        type: '',
        inside: null
      }
    },

    clear () {
      for (const [key, value] of Object.entries(this.schema)) {
        if ('type' in value && key !== 'id') {
          this.$set(this.data, key, '')
        } else if ('$ref' in value && this.$refs[key]) {
          this.$set(this.$refs[key], key, null)
        }
      }
    }
  } */
}
</script>

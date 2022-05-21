<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="data.number" label="Host Family Number" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.family_name" label="Family Name" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Father
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.father_first_name" label="Father First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.father_last_name" label="Father Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.father_age" label="Father Age" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.father_occupation" label="Father Occupation" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.father_email" label="Father Email" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Mother
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.mother_first_name" label="Mother First Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.mother_last_name" label="Mother Last Name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.mother_age" label="Mother Age" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.mother_occupation" label="Mother Occupation" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.mother_email" label="Mother Email" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Address
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.address_city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.address_postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.address_country" label="Country" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        Children
      </div>
      <v-list-item
        v-for="(item, i) in data.host_family_child"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.gender }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-row>
        <v-col>
          <v-text-field v-model="child.name" label="Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="child.gender" label="Gender" />
        </v-col>
      </v-row>
      <v-btn @click="addChild">
        Add
      </v-btn>
      <div class="text-h5 mb-1 py-5 ">
        Pets
      </div>
      <v-list-item
        v-for="(item, i) in data.host_family_pet"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-row>
        <v-col>
          <v-text-field v-model="pet.name" label="Pet name" />
        </v-col>
        <v-col>
          <v-text-field v-model="pet.type" label="Pet type" />
        </v-col>
        <v-col>
          <v-checkbox v-model="pet.inside" label="Inside" />
        </v-col>
      </v-row>
      <v-btn @click="addPet">
        Add
      </v-btn>
      <div class="text-h5 mb-1 py-5 ">
        Other
      </div>
      <v-row>
        <v-col>
          <v-checkbox v-model="data.smoking" label="Smoking" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <airportPicker v-model="data.airport" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.profile_link" label="Profile link" />
        </v-col>
      </v-row>
      <div class="text-h5 mb-1 py-5 ">
        School
      </div>
      <v-row>
        <v-col>
          <v-text-field v-model="data.school_name" label="School" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.contact" label="Contact Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.email" label="Contact Email" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.school_address_line_1" label="Address line 1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.school_address_line_2" label="Address line 2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="data.school_address_city" label="City" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.school_address_postal_code" label="Postal code" />
        </v-col>
        <v-col>
          <v-text-field v-model="data.school_address_country" label="Country" />
        </v-col>
      </v-row>
      <v-btn @click="submit">
        Submit
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import airportPicker from '../components/airport'
export default {
  name: 'HostFamily',
  components: { airportPicker },
  data () {
    return {
      data: {},
      child: {
        name: '',
        gender: ''
      },
      pet: {
        name: '',
        type: '',
        inside: null
      },
      airport_list: []
    }
  },

  async fetch () {
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
  }
}
</script>

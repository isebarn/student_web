<template>
  <v-container>
    <v-select v-model="table" :items="tables" item-text="endpoint" return-object @change="loadSelectedTable" />
    <v-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ (table.endpoint ? table.endpoint : 'Pick a table') }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row
                    v-for="(item, i) in headers.filter(x => !x.value.includes('.id') && x.value !== 'actions')"
                    :key="i"
                  >
                    <v-text-field
                      v-model="editedItem[item.value]"
                      :label="item.text"
                      :readonly="item.value === 'id'"
                    />
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!--       <template #item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template> -->
    </v-data-table>
  </v-container>
</template>

<script>

export default {
  name: 'TableData',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      hours: ''
    },
    tableDefinitions: [],
    table: {},
    items: [],
    users: []
  }),

  async fetch () {
    const data = await this.$axios.$get('swagger.json')
    const paths = Object.keys(data.paths).filter(x => x.includes('/api/') && !x.includes('/base') && x.split('/').length === 3)
    const refs = paths.map(x => data.paths[x].get.responses[200].schema.items.$ref).map(x => x.replace('#/definitions/', ''))
    const objects = refs.map(x => data.definitions[x])
    let headers = objects.map(x => Object.entries(x.properties).map(y => '$ref' in y[1] ? y[0] + '.id' : y[0]))
    headers = headers.map(x => x.filter(y => y !== '_id'))
    headers = headers.map(x => x.sort(function (x, y) { return x === 'id' ? -1 : y === 'id' ? 1 : 0 }))

    this.tableDefinitions = Array.prototype.map.call(paths, (x, i) => { return { endpoint: x.replace('/api/', ''), headers: headers[i] } })
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    headers () {
      return this.table.headers ? Array.prototype.map.call(this.table.headers, (x) => { return { text: x.replace('.id', ''), value: x } }).concat({ text: 'Actions', value: 'actions', sortable: false, align: 'end' }) : []
    },

    tables () {
      return this.tableDefinitions
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      const result = await this.$axios.$delete(`api/${this.table.endpoint}/${this.editedItem.id}`)

      if (result === 1) {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      const editedItem = this.editedItem
      const payload = Object.keys(editedItem).reduce(function (obj, x) {
        if (typeof (editedItem[x]) !== 'object' && x !== '_id') {
          obj[x] = editedItem[x]
        }
        return obj
      }, {})

      const result = await this.$axios.$put('api/' + this.table.endpoint, payload)
      if (result) {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    },

    async loadSelectedTable (event) {
      const items = await this.$axios.$get(`api/${event.endpoint}/base`)

      if (this.table.headers.includes('user')) {
        if (this.users.length === 0) {
          this.users = await this.$axios.$get('user_management/users')
        }

        let user = {}
        for (let i = items.length - 1; i >= 0; i--) {
          user = this.users.find(x => x.sub === items[i].user)
          items[i].user = user ? `${user.first_name} ${user.last_name} (${user.email})` : 'User not found'
        }
      }
      this.items = items
    }
  }
}
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Diskografija"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>

import axios from 'axios';

const columns = [
  { name: 'naziv', required: true, align: 'left', label: 'Naziv', field: 'naziv', sortable: true },
  { name: 'izvodac', align: 'left', label: 'Izvodac', field: 'izvodac', sortable: true },
  { name: 'god_izdanja', align: 'left', label: 'Godina izdanja', field: 'god_izdanja', sortable: true },
  { name: 'medij', align: 'left', label: 'medij', field: 'medij' },
]
const rows = [
  {
    naziv: 'Back in Black',
    izvodac: 'AC/DC',
    god_izdanja: '1980',
    medij: 'CD',
  }
]


export default {
  setup () {
    return {
      columns,
      rows
    }
  },
  mounted() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      await axios.get('http://localhost:3000/api/diskografija/')
        .then(result => {
          console.log(result.data)
          this.rows = result.data
          console.log(this.books[0].id)
        })
        .catch(error => {
          console.error(error)
        })
    },
  }
}
</script>

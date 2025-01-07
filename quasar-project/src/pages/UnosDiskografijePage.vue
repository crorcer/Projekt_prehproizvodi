<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
    >
      <q-input filled v-model="naziv" label="Naziv" />
      <q-input filled v-model="izvodac" label="Izvodac" />
      <q-input filled v-model="god_izdanja" label="Godina izdanja" />
      <q-input filled v-model="medij" label="Medij" />

    
      <div>
        <q-btn label="Submit" type="submit" color="primary"
            @click="onSubmit()" />
        <q-btn label="Reset" type="reset" color="primary"
            flat class="q-ml-sm" @click="onReset()"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

export default {
  setup () {
    const naziv = ref(null)
    const izvodac = ref(null)
    const god_izdanja = ref(null)
    const medij = ref(null)

    const onReset = () => {
      naziv.value = null
      izvodac.value = null
      god_izdanja.value = null
      medij.value = null
    }

    return {
      naziv,
      izvodac,
      god_izdanja,
      medij,
      onReset
    }
  },
   methods: {
    async onSubmit () {
      const formData = {
        naziv: this.naziv,
        izvodac: this.izvodac,
        god_izdanja: this.god_izdanja,
        medij: this.medij,
      }
      await axios.post('http://localhost:3000/api/unos_diskografije/', formData)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
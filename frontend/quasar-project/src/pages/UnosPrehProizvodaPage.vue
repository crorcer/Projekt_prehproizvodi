<template>
  <div class="unos-container">
    <h1 class="title">Dodavanje Prehrambenog Proizvoda</h1>
    <form @submit.prevent="addProduct">
      <input v-model="form.Naziv" type="text" placeholder="Naziv proizvoda" required />
      <textarea v-model="form.Opis" placeholder="Opis"></textarea>
      <input v-model="form.Cijena" type="number" placeholder="Cijena (EUR)" required />
      <input v-model="form.Kategorija" type="text" placeholder="Kategorija" required />
      <button type="submit">Dodaj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UnosPrehrambenihProizvodaPage',
  data() {
    return {
      API_URL: 'http://localhost:3001/api/unos_PrehrambeniProizvodi',
      form: {
        Naziv: '',
        Opis: '',
        Cijena: '',
        Kategorija: '',
      },
    }
  },
  methods: {
    async addProduct() {
      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        })

        if (response.ok) {
          alert('Proizvod dodan!')
          this.form = { Naziv: '', Opis: '', Cijena: '', Kategorija: '' }
        } else {
          alert('Greška pri dodavanju.')
        }
      } catch (error) {
        console.error('Greška:', error)
        alert('Neuspješan unos proizvoda.')
      }
    },
  },
}
</script>

<style scoped>
.unos-container {
  text-align: center;
  max-width: 600px;
  margin: 20px auto;
}
input,
textarea {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
}
button {
  background-color: #28a745;
  padding: 10px 15px;
  color: #fff;
  border-radius: 4px;
}
button:hover {
  background-color: #218838;
}

.title {
  font-size: 32px;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 40px;
}
</style>

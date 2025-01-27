<template>
  <div class="pregled-container">
    <h1 class="title">Pregled Prehrambenih Proizvoda</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Naziv</th>
          <th>Opis</th>
          <th>Kategorija</th>
          <th>Cijena (EURO)</th>
          <th>Kolicina</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proizvod in proizvodi" :key="proizvod.ID">
          <td>{{ proizvod.ID }}</td>
          <td>{{ proizvod.Naziv }}</td>
          <td>{{ proizvod.Opis }}</td>
          <td>{{ proizvod.Kategorija }}</td>
          <td>{{ proizvod.Cijena }}</td>
          <td>{{ proizvod.Kolicina }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PregledPrehrambenihProizvodaPage',
  data() {
    return {
      API_URL: 'http://localhost:3001/api/PrehrambeniProizvodi',
      proizvodi: [],
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(this.API_URL)
        this.proizvodi = await response.json()
      } catch (error) {
        console.error('Greška prilikom dohvaćanja proizvoda:', error)
      }
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<style scoped>
.pregled-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #00000050;
  color: black;
}
th {
  color: white;
  background-color: red;
}

.title {
  font-size: 32px;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
  text-align: center;
}
</style>

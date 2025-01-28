<template>
  <div class="prodaja-container">
    <h1 class="title">Prodaja Prehrambenih Proizvoda</h1>
    <div v-if="proizvodi.length === 0">
      <p class="info">Nema proizvoda za prodaju.</p>
    </div>
    <form v-else @submit.prevent="sellProduct" class="prodaja-form">
      <select v-model="proizvod" required class="product-select">
        <option disabled value="">Odaberite proizvod</option>
        <option
          v-for="proizvod in proizvodi"
          :key="proizvod.ID"
          :value="proizvod.ID"
          class="product-option"
        >
          {{ proizvod.Naziv }}
          {{ proizvod.Kolicina }}
        </option>
      </select>
      <button type="submit" class="button">Prodaj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProdajaPrehrambenihProizvodaPage',
  data() {
    return {
      API_SELL_URL: 'http://localhost:3001/api/smanji_kolicinu',
      API_FETCH_URL: 'http://localhost:3001/api/PrehrambeniProizvodi',
      proizvodi: [],
      proizvod: '',
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(this.API_FETCH_URL)
        this.proizvodi = await response.json()

        console.log(this.proizvodi)
      } catch (error) {
        console.error('Greška prilikom dohvaćanja proizvoda:', error)
      }
    },
    async sellProduct() {
      try {
        const response = await fetch(`${this.API_SELL_URL}/${this.proizvod}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          alert('Proizvod uspješno prodan!')
          await this.fetchProducts() // Refetch products after selling
        } else {
          alert('Greška pri prodaji proizvoda.')
        }
      } catch (error) {
        console.error('Greška:', error)
        alert('Neuspješna prodaja.')
      }
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<style scoped>
.prodaja-container {
  text-align: center;
  max-width: 600px;
  margin: 20px auto;
}
input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
}
button {
  background-color: #007bff;
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
  border: none;
}
button:hover {
  background-color: #0056b3;
}

.title {
  font-size: 32px;
  color: indigo;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 40px;
}

.prodaja-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info {
  font-size: 18px;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
}

.product-select {
  padding: 10px;
  font-size: 16px;
}

.button {
  background-color: #007bff;
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
  border: none;
}

.product-option {
  display: flex;
  justify-content: space-between;
}
</style>

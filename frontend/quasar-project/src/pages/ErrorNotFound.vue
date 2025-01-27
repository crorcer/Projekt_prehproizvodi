<template>
  <div class="error-container">
    <h1>404 - Stranica nije pronađena</h1>
    <p>Provjerite adresu ili se vratite na početnu stranicu.</p>
    <router-link to="/" class="back-button">Povratak na početnu stranicu</router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorNotFound",
};
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 40px;
}
.back-button {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
.back-button:hover {
  background-color: #0056b3;
}
</style>

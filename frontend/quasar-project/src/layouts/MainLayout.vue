<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <div class="header bg-yellow-10">
      <h1 class="title">Foodify</h1>
      <div class="nav">
        <q-item
          v-for="link in links"
          :key="link.to"
          :class="{ 'nav-link': route.path === link.to, 'inactive-link': route.path !== link.to }"
          clickable
          v-ripple
          tag="router-link"
          :to="link.to"
          class="text-white nav-item"
        >
          <q-icon :name="link.icon" class="text-white" />
          <q-item-section>{{ link.label }}</q-item-section>
        </q-item>
      </div>
    </div>

    <q-page-container class="bg-white routes">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const links = [
  { to: '/', label: 'Početna', icon: 'home' },
  { to: '/pregled', label: 'Pregled Proizvoda', icon: 'list' },
  { to: '/unos', label: 'Dodavanje Proizvoda', icon: 'add_circle' },
  { to: '/prodaja', label: 'Prodaja Proizvoda', icon: 'shopping_cart' },
]
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 40px;
  padding-bottom: 40px;
  justify-items: center;
  align-items: center;
}

.title {
  font-size: 64px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: #fff;
}

.custom-background {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  min-height: 100vh;
  background-attachment: fixed;
  background-size: cover;
}

.nav {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 769px) {
    flex-direction: column;
  }
}

.nav-item {
  padding: 14px 10px 14px 10px;
  background-color: red;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-items: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
}

.nav-item:hover {
  background-color: #f5373d;
}

.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
}

.routes {
  flex: 1;
}
</style>

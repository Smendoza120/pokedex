<script setup>
import HomeView from './views/HomeView.vue';
import { usePokemonStore } from './stores/pokemon';
import { onMounted } from 'vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.loadFavoritesFromLocalStorage();
})
</script>

<template>
  <div id="app" style="height: 100vh; overflow: hidden;">
    <HomeView />
  </div>
</template>

<style></style>
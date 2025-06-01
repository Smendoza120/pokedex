<script setup>
import { RouterView } from 'vue-router';
import { usePokemonStore } from './stores/pokemon';
import { onMounted } from 'vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.loadFavoritesFromLocalStorage();
})
</script>

<template>
  <div id="app" style="height: 100vh; overflow: hidden;">
    <RouterView />
  </div>
</template>

<style></style>
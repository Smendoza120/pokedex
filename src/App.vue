<script setup>
import { RouterView } from 'vue-router';
import { usePokemonStore } from './stores/pokemon';
import { onMounted, watch } from 'vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.loadFavoritesFromLocalStorage();
})

watch(() => pokemonStore.isModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('modal-active');
  } else {
    document.body.classList.remove('modal-active');
  }
}, { immediate: true });
</script>

<template>
  <div id="app" style="height: 100vh; overflow: hidden;">
    <!-- Se agrega el componente el cual contiene la configuracion del enrutado del aplicativo -->
    <RouterView />
  </div>
</template>

<style></style>
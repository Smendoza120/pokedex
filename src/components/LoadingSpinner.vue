<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';

const router = useRouter();
const pokemonStore = usePokemonStore();

onMounted(async () => {
  pokemonStore.loadFavoritesFromLocalStorage();

  await pokemonStore.fetchPokemons();

  setTimeout(() => {
    router.push({ name: "home" })
  }, 1500);
})
</script>

<template>
  <div class=loading_container>
    <img class="loading_icon" src="../assets//images/Loader.svg" alt="Loading image">
  </div>
</template>

<style scoped>
.loading_container {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  & .loading_icon {
    animation: lds-hourglass 3s infinite;
  }
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}
</style>
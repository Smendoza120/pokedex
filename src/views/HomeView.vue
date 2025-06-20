<script setup>
import { usePokemonStore } from "@/stores/pokemon";
import FilterInput from "@/components/FilterInput.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonModal from "@/components/PokemonModal.vue";
import { onMounted } from "vue";
import "primeicons/primeicons.css";

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.loadFavoritesFromLocalStorage();
  pokemonStore.fetchPokemons();
});

const showAllPokemons = () => {
  pokemonStore.setFilter("all");
};

const showFavoritePokemons = () => {
  pokemonStore.setFilter("favorites");
};

const clearSearch = () => {
  pokemonStore.setSearchTerm("");
  pokemonStore.setFilter("all");
};
</script>

<template>
  <div class="home_view_container">
    <p v-if="pokemonStore.isLoading && pokemonStore.allPokemons.length === 0" class="loading_message">
      Cargando Pokémons...
    </p>

    <p v-if="pokemonStore.error" class="error_message">
      {{ pokemonStore.error }}
    </p>

    <div class="filter_container">
      <FilterInput />
    </div>

    <div v-if="pokemonStore.filteredPokemons.length" class="pokemon_grid">
      <PokemonCard v-for="pokemon in pokemonStore.filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>

    <div v-else-if="
      !pokemonStore.isLoading &&
      pokemonStore.searchTerm &&
      pokemonStore.filteredPokemons.length === 0
    " class="no_results_message">
      <h3 style="
          color: var(--color-dark-gray);
          font-size: 35px;
          font-family: var(--font-family-base);
        ">
        Uh-oh!
      </h3>
      <p style="
          color: var(--color-medium-gray);
          font-family: var(--font-family-base);
        ">
        You look lost on your journey!
      </p>
      <button class="button" @click.prevent="clearSearch">Go back home</button>
    </div>

    <p v-else-if="
      !pokemonStore.isLoading &&
      !pokemonStore.error &&
      pokemonStore.allPokemons.length === 0
    " class="no_pokemons_message">
      No hay Pokémones cargados. Haz clic en "Cargar Más Pokémons"
    </p>

    <div class="buttons_container">
      <button @click.prevent="showAllPokemons" :disabled="pokemonStore.isLoading" class="button" :class="{
        'active-filter': pokemonStore.currentFilter === 'all',
        'inactive-filter': pokemonStore.currentFilter === 'favorites',
      }">
        <i class="pi pi-list" style="font-size: 1.5rem"></i> All
      </button>

      <button @click.prevent="showFavoritePokemons" :disabled="pokemonStore.isLoading" class="button" :class="{
        'active-filter': pokemonStore.currentFilter === 'favorites',
        'inactive-filter': pokemonStore.currentFilter === 'all',
      }">
        <i class="pi pi-star-fill" style="font-size: 1.5rem"></i> Favorites
      </button>
    </div>

    <PokemonModal />
  </div>
</template>

<style scoped>
.home_view_container {
  font-family: var(--font-family-base);
  color: var(--color-dark-gray);
  width: 100vw;
  min-height: 100dvh;
  min-height: 100dvh;
  position: relative;

  & .filter_container {
    margin-bottom: 10px;
    position: absolute;
    top: -64px;
    width: 100%;
  }

  & .loading_message,
  & .error_message,
  & .no_pokemons_message {
    text-align: center;
    margin-top: var(--spacing-medium);
    font-style: italic;
    color: var(--color-medium-gray);
    padding: var(--spacing-small);
    border-radius: var(--border-radius-base);
  }

  & .no_results_message {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    position: absolute;
    top: 10%;
    left: 25%;

    & .button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 0px;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: var(--spacing-medium);
      margin-bottom: var(--spacing-large);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: var(--color-primary-red);
      padding: 10px;
    }
  }

  & .error_message {
    color: var(--color-secondary-red);
    background-color: #ffebee;
    border: 1px solid var(--color-secondary-red);
    font-weight: bold;
  }

  & .buttons_container {
    display: flex;
    gap: 10px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px -2px 7px -2px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px -2px 7px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px -2px 7px -2px rgba(0, 0, 0, 0.75);
    width: 100%;
    position: relative;
    z-index: 100;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;

    & .button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 0px;
      width: 50%;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.1s ease;
      margin-top: var(--spacing-medium);
      margin-bottom: var(--spacing-large);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 300px;

      &:hover:not(:disabled) {
        filter: brightness(0.9);
      }

      &:disabled {
        background-color: var(--color-light-gray);
        color: var(--color-medium-gray);
        cursor: not-allowed;
        box-shadow: none;
      }
    }
  }

  & .active-filter {
    background-color: var(--color-primary-red);
    color: white;
    font-weight: bold;
    border: 2px solid var(--color-primary-red);
  }

  & .inactive-filter {
    background-color: #5e5e5e;
    color: white;
    border: 2px solid #5e5e5e;
  }

  & .pokemon_grid {
    margin-top: 65px;
    padding: 0 10px;
    padding-bottom: 30px;
    /*//pc 80 */
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    overflow-y: auto;
    height: 80vh;
  }
}

/* responsive */
@media (min-width: 600px) {
  .home_view_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .filter_container {
      width: 100%;
      max-width: 60%;
      left: 20%;
      top: 0;
    }

    & .no_results_message {
      top: 10%;
      left: 43%;
    }

    & .buttons_container {
      justify-content: center;
      gap: 20px;
      padding: 0;
    }

    & .pokemon_grid {
      height: 83vh;
      max-width: 60%;
      width: 100%;
      margin-top: -22px;
      margin-bottom: 0px;
      max-height: 77vh;
    }
  }
}
</style>

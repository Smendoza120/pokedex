<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import FilterInput from '@/components/FilterInput.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { onMounted } from 'vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.fetchPokemons();
})

const loadPokemons = () => {
  pokemonStore.fetchPokemons();
}
</script>

<template>
  <div class="home_view_container">
    <p v-if="pokemonStore.isLoading && pokemonStore.allPokemons.length === 0" class="loading_message">
      Cargando Pokémons...
    </p>
    <p v-if="pokemonStore.error" class="error_message">{{ pokemonStore.error }}</p>

    <div class="filter_container">
      <FilterInput />
    </div>

    <div v-if="pokemonStore.filteredPokemons.length" class="pokemon_grid">
      <PokemonCard v-for="pokemon in pokemonStore.filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>

    <p v-else-if="!pokemonStore.isLoading && pokemonStore.searchTerm && pokemonStore.filteredPokemons.length === 0"
      class="no_resilts_message">
      No se encontraron Pokémones con ese nombre.
    </p>

    <p v-else-if="!pokemonStore.isLoading && !pokemonStore.error && pokemonStore.allPokemons.length === 0"
      class="no_pokemons_message">
      No hay Pokémones cargados. Haz clic en "Cargar Más Pokémons"
    </p>

    <button @click.prevent="loadPokemons" :disabled="pokemonStore.isLoading" class="load_more_button">
      Cargar Más Pokémons
    </button>
  </div>
</template>

<style scoped>
.home_view_container {
  padding: 10px;
  font-family: var(--font-family-base);
  color: var(--color-dark-gray);
  width: 95vw;
  height: 100vh;
  overflow: hidden;

  & .filter_container {
    margin-bottom: 10px;
  }

  & .loading_message {
    text-align: center;
    margin-top: var(--spacing-medium);
    font-style: italic;
    color: var(--color-medium-gray);
    padding: var(--spacing-small);
    border-radius: var(--border-radius-base);
  }

  & .error_message {
    text-align: center;
    margin-top: var(--spacing-medium);
    font-style: italic;
    color: var(--color-medium-gray);
    padding: var(--spacing-small);
    border-radius: var(--border-radius-base);

    color: var(--color-secondary-red);
    background-color: #ffebee;
    border: 1px solid var(--color-secondary-red);
    font-weight: bold;
  }

  & .no_resilts_message {
    text-align: center;
    margin-top: var(--spacing-medium);
    font-style: italic;
    color: var(--color-medium-gray);
    padding: var(--spacing-small);
    border-radius: var(--border-radius-base);
  }

  & .no_pokemons_message {
    text-align: center;
    margin-top: var(--spacing-medium);
    font-style: italic;
    color: var(--color-medium-gray);
    padding: var(--spacing-small);
    border-radius: var(--border-radius-base);
  }

  & .load_more_button {
    display: block;
    width: 100%;
    padding: 15px 25px;
    background-color: var(--color-accent-orange);
    color: white;
    border: none;
    border-radius: var(--border-radius-base);
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-large);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background-color: darken(var(--color-accent-orange), 10%);
    }

    &:disabled {
      background-color: var(--color-light-gray);
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  & .pokemon_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    justify-content: center;
    overflow-y: auto;
    height: 78vh;
  }
}
</style>
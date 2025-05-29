<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import FilterInput from '../FilterInput.vue';
import { onMounted } from 'vue';

const pokemonStore = usePokemonStore();

const loadPokemons = () => {
  pokemonStore.fetchPokemons();
}
</script>

<template>
  <div>
    <h2 style="color: red;">Pokemons</h2>

    <p v-if="pokemonStore.isLoading">Cargando Pokemons...</p>

    <p v-if="pokemonStore.error" class="error-message">{{ pokemonStore.error }}</p>

    <FilterInput />

    <button @click.prevent="loadPokemons">Cargar Más Pokémons</button>

    <ul v-if="pokemonStore.filteredPokemons.length" class="pokemon-list">
      <li v-for="pokemon in pokemonStore.filteredPokemons" :key="pokemon.id" class="pokemon-item">
        {{ pokemon.name }}
      </li>
    </ul>

    <p v-else-if="!pokemonStore.isLoading && pokemonStore.searchTerm && pokemonStore.filteredPokemons.length === 0"
      class="no-results-message">
      No se encontraron Pokémon con ese nombre.
    </p>
    <p v-else-if="!pokemonStore.isLoading && !pokemonStore.error && pokemonStore.allPokemons.length === 0"
      class="no-pokemons-message">
      No hay Pokémons cargados. Haz clic en "Cargar Más Pokémons".
    </p>
  </div>
</template>

<style></style>
<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import { computed } from 'vue';

const pokemonStore = usePokemonStore();

const searchTerm = computed({
  get: () => pokemonStore.searchTerm,
  set: (value) => pokemonStore.setSearchTerm(value),
});
</script>

<template>
  <div class="filter_input_container">
    <input type="text" v-model="searchTerm" placeholder="Buscar Pokémon por nombre..." class="filter_input" />
  </div>
</template>

<style>
.filter_input_container {
  margin-bottom: 15px;

  & .filter_input {
    padding: 10px 12px;
    border: 1px solid #CCC;
    border-radius: 6px;
    width: 100%;
    max-width: 400px;
    font-size: 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color .3s ease, box-shadow .3s ease;

    &:focus {
      border-color: #007BFF;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      outline: none;
    }
  }
}
</style>
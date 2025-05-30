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
    <i class="pi-search" style="font-size: 2rem"></i>
    <input type="text" v-model="searchTerm" placeholder="Search" class="filter_input" />
  </div>
</template>

<style>
.filter_input_container {
  & .filter_input {
    padding: 10px 12px;
    border: 1px solid var(--color-light-gray);
    background-color: var(--color-bg-extra-light);
    border-radius: 6px;
    width: 92%;
    font-size: 1rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color .3s ease, box-shadow .3s ease;

    &:focus {
      border-color: var(--color-accent-orange);
      box-shadow: 0 0 0 3px rgba(236, 165, 57, 0.25);
      outline: none;
    }
  }
}
</style>
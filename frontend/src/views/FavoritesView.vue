<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonStore = usePokemonStore();

</script>

<template>
  <div class="favorites_view_container">
    <h1 class="main_title">Mis Pokémons Favoritos ❤️</h1>

    <p v-if="pokemonStore.favoritePokemons.length === 0" class="no_favorites_message">
      Aún no tienes Pokémons favoritos. ¡Añade algunos desde la Pokédex principal!
    </p>

    <div v-else class="pokemon_grid">
      <PokemonCard v-for="pokemon in pokemonStore.favoritePokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
  </div>
</template>

<style>
.favorites_view_container {
  padding: var(--spacing-large);
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--font-family-base);
  color: var(--color-dark-gray);

  & .main_title {
    text-align: center;
    color: var(--color-primary-red);
    /* O un color de acento, según el diseño */
    margin-bottom: var(--spacing-large);
    font-size: 2.5em;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  & .no_favorites_message {
    text-align: center;
    margin-top: 30px;
    font-style: italic;
    color: var(--color-medium-gray);
    font-size: 1.1em;
  }

  & .pokemon_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--spacing-large);
    justify-content: center;
  }
}
</style>
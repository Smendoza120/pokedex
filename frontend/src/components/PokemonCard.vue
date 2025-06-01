<script setup>
import { computed } from "vue";
import { usePokemonStore } from "@/stores/pokemon";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value && typeof value.id === "number" && typeof value.name === "string"
      );
    },
  },
});

const pokemonStore = usePokemonStore();

const isCurrentPokemonFavorite = computed(() => {
  return pokemonStore.isFavorite(props.pokemon.id);
});

const toggleFavorite = () => {
  pokemonStore.toggleFavorite(props.pokemon);
};

const openPokemonModal = () => {
  pokemonStore.openModal(props.pokemon);
};
</script>

<template>
  <div class="pokemon_card_container" @click="openPokemonModal">
    <div class="pokemon_card">
      <h3 class="pokemon_name">{{ pokemon.name }}</h3>

      <div class="pokemon_favorite_icon_container">
        <i class="pi pi-star-fill pokemon_favorite_star" :class="{ 'pokemon_is_favorite': isCurrentPokemonFavorite }"
          @click.stop="toggleFavorite"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon_card_container {
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  padding: 10px 0;

  &:hover {
    box-shadow: -5px 5px 7px -1px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: -5px 5px 7px -1px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: -5px 5px 7px -1px rgba(0, 0, 0, 0.5);
  }

  & .pokemon_card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background: white;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }

    & .pokemon_name {
      font-weight: bold;
      text-transform: capitalize;
      font-family: var(--font-family-base);
    }
  }

  & .pokemon_favorite_icon_container {
    & .pokemon_favorite_star {
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-light-gray);
      transition: color .2s ease;
    }

    & .pokemon_favorite_star.pokemon_is_favorite {
      color: var(--color-accent-orange);
    }
  }
}
</style>

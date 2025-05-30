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

      <div class="favorite_icon_container">
        <span
          class="favorite_star"
          :class="{ is_favorite: isCurrentPokemonFavorite }"
          @click.stop="toggleFavorite"
        >
          {{ isCurrentPokemonFavorite ? "⭐" : "☆" }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon_card_container {
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  height: 60px;

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

  & .favorite_icon_container {
    & .favorite_star {
      font-size: 30px;
    }
  }
}
</style>

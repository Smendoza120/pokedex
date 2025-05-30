<script setup>
import { usePokemonStore } from "@/stores/pokemon";
import { computed } from "vue";
import "primeicons/primeicons.css";

const pokemonStore = usePokemonStore();

const pokemon = computed(() => pokemonStore.selectedPokemon);

const close = () => {
  pokemonStore.closeModal();
};

const isCurrentPokemonFavorite = computed(() =>
  pokemonStore.isFavorite(pokemon.value?.id)
);

const toggleFavoriteFromModal = () => {
  if (pokemon.value) {
    pokemonStore.toggleFavorite(pokemon.value);
  }
};
</script>

<template>
  <div
    v-if="pokemonStore.isModalOpen && pokemon"
    class="modal_overlay"
    @click.self="close"
  >
    <div class="modal_content">
      <button class="close_button" @click="close">
        <!-- <i class="pi pi-times" style="font-size: 1.5rem"></i> -->
      </button>

      <div class="modal_header">
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="modal_pokemon_image"
        />
      </div>

      <div class="modal_body">
        <div class="modal_pokemon_details">
          <p style="text-transform: capitalize;"><strong>Name:</strong> {{ pokemon.name }}</p>
          <hr class="separate" />

          <p><strong>Weight:</strong> {{ (pokemon.weight / 10).toFixed(1) }}</p>
          <hr class="separate" />

          <p>
            <strong>Height:</strong> {{ (pokemon.height / 10).toFixed(1) }} m
          </p>
          <hr class="separate" />

          <div class="modal_types">
            <strong>Types:</strong>
            <p v-for="type in pokemon.types" :key="type" class="types_pokemon">
              {{ type }}
            </p>
          </div>
          <hr />
        </div>
      </div>

      <div class="modal_footer">
        <button class="button">Share to my friends</button>

        <button @click="toggleFavoriteFromModal" class="modal_favorite_button">
          <i
            class="pi"
            :class="isCurrentPokemonFavorite ? 'pi-star-fill' : 'pi-star'"
            :style="{
              color: isCurrentPokemonFavorite ? 'gold' : 'gray',
              fontSize: '1.8rem',
            }"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);

  & .modal_content {
    background-color: white;
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    width: 80%; /*50% en responsive */
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-family-base);
    color: var(--color-dark-gray);
    animation: scaleIn 0.3s ease-out;
    overflow: hidden;

    & .close_button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--color-dark-gray);
      transition: color 0.2s ease;
      width: 25px;
      height: 25px;
      background-image: url("../assets/images/closeIcon.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 1000;
    }

    & .modal_header {
      display: flex;
      width: 100%;
      padding: 10px 0 0 0;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      background-image: url("../assets//images/backgroud.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;

      & .modal_pokemon_image {
        width: 160px;
        height: 160px;
        object-fit: contain;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }

    & .modal_body {
      width: 80%;
      text-align: start;
      padding: 0 30px;

      & .modal_pokemon_details p {
        margin: 8px 0;
        font-size: 1.1rem;
      }

      & .modal_pokemon_details {
        & hr {
          background: 1px solid var(--color-bg-light);
          opacity: .3;
          border-radius: 50%;
        }
      }

      & .modal_types {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 5px;
        font-size: 1.1rem;

        & .types_pokemon{
            text-transform: capitalize;
        }

        & .pokemon_type {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: white;
          text-transform: capitalize;
        }
      }

      & .modal_abilities {
        margin-top: 15px;
        font-size: 1.1rem;
      }

      & .modal_abilities ul {
        list-style: none;
        padding: 0;
        margin: 5px 0 0 0;
      }

      & .modal_abilities li {
        background-color: var(--color-light-gray);
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--color-dark-gray);
        text-transform: capitalize;
      }
    }
  }

  & .modal_footer {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 20px;

    & .button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 15px 0px;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.1s ease;
      margin-top: var(--spacing-medium);
      margin-bottom: var(--spacing-large);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: var(--color-primary-red);
      cursor: pointer;
      box-shadow: none;
      padding: 10px 10px;

      &:hover {
        background-color: var(--color-light-gray);
        color: var(--color-medium-gray);
        cursor: not-allowed;
        box-shadow: none;
      }
    }

    & .modal_favorite_button {
      color: white;
      border: none;
      border-radius: 30px;
      padding: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken(var(--color-accent-orange), 10%);
      }
    }
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.pokemon_type.grass {
  background-color: #7ac74c;
}
.pokemon_type.fire {
  background-color: #ee8130;
}
.pokemon_type.water {
  background-color: #6390f0;
}
.pokemon_type.bug {
  background-color: #a6b91a;
}
.pokemon_type.normal {
  background-color: #a8a77a;
}
.pokemon_type.poison {
  background-color: #a33ea1;
}
.pokemon_type.electric {
  background-color: #f7d02c;
}
.pokemon_type.ground {
  background-color: #e2bf65;
}
.pokemon_type.fairy {
  background-color: #ddaecf;
}
.pokemon_type.fighting {
  background-color: #c22e28;
}
.pokemon_type.psychic {
  background-color: #f95587;
}
.pokemon_type.rock {
  background-color: #b6a136;
}
.pokemon_type.ghost {
  background-color: #735797;
}
.pokemon_type.ice {
  background-color: #96d9d6;
}
.pokemon_type.dragon {
  background-color: #6f35fc;
}
.pokemon_type.steel {
  background-color: #b7b7ce;
}
.pokemon_type.dark {
  background-color: #705746;
}
.pokemon_type.flying {
  background-color: #a98ff3;
}
</style>

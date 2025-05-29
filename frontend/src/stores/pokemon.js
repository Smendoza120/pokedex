import { defineStore } from "pinia";
import { fetchPokemonList, fetchPokemonDetailsByName } from "@/services/pokeapi";

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    favoritePokemons: [],
    isLoading: false,
    error: null,
    nextUrl: null,
    searchTerm: ''
  }),

  getters: {
    allPokemons: (state) => state.pokemons,
    getPokemonDetails: (state) => (name) => state.pokemons.find(p => p.name === name),
    favoritePokemons: (state) => state.favoritePokemons,
    isFavorite: (state) => (pokemonName) => state.favoritePokemons.some(fav => fav.name === pokemonName),
    filteredPokemons: (state) => {
      if (!state.searchTerm) {
        return state.pokemons
      }

      const lowerCaseSearchTerm = state.searchTerm.toLowerCase();
      return state.pokemons.filter(pokemon => {
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm);
      })
    }
  },

  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
      console.log("term :D: ", term)
    },

    async loadFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem('favoritePokemons');

      if (storedFavorites) {
        this.favoritePokemons = JSON.parse(storedFavorites);
      }
    },

    saveFavoritesToLocalStorage() {
      localStorage.setItem('favoritePokemons', JSON.stringify(this.favoritePokemons));
    },

    async fetchPokemons() {
      if (this.pokemons.length > 0 && !this.nextUrl) return;

      this.isLoading = true;
      this.error = null;

      try {
        const urlToFetch = this.nextUrl || `https://pokeapi.co/api/v2/pokemon?limit=50`;

        const data = await fetchPokemonList(urlToFetch);
        const newPokemons = data.results;
        this.nextUrl = data.next;

        const detailedPokemonsPromises = newPokemons.map(async (p) => {
          const details = await fetchPokemonDetailsByName(p.name);

          // console.log("details :D: ", p.name);

          if (!details) {
            console.warn(`[fetchPokemons] No se encontraron detalles válidos para ${p.name}. Este Pokémon será omitido.`);
            return null;
          }

          return {
            id: details.id,
            name: details.name,
            image: details.sprites?.front_default || null,
            types: Array.isArray(details.types) ? details.types.map(t => t.type.name) : [],
            abilities: Array.isArray(details.abilities) ? details.abilities.map(a => a.ability.name) : [],
            weight: details.weight,
            height: details.height,
          }
        });

        const detailedPokemons = await Promise.all(detailedPokemonsPromises);
        const validDetailedPokemons = detailedPokemons.filter(p => p !== null);

        this.pokemons = [...this.pokemons, ...validDetailedPokemons];
        this.loadFavoritesFromLocalStorage();
      } catch (error) {
        this.error = `Error al buscar pokémones: ${error.message || error}`;
        console.error("Error completo en fetchPokemons: ", error);
      } finally {
        this.isLoading = false;
      }
    },

    async toggleFavorite(pokemon) {
      const index = this.favoritePokemons.findIndex(fav => fav.id === pokemon.id);

      if (index === -1) {
        this.favoritePokemons.push(pokemon);
      } else {
        this.favoritePokemons.splice(index, 1);
      }

      this.saveFavoritesToLocalStorage();
    }
  }
});
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  fetchPokemonList,
  fetchPokemonDetailsByName,
} from "@/services/pokeapi";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemons = ref([]);
  const favoritePokemons = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const nextUrl = ref(null);
  const searchTerm = ref("");
  const currentFilter = ref("all");
  const allPokemons = computed(() => pokemons.value);
  const getPokemonDetails = computed(
    () => (name) => pokemons.value.find((p) => p.name === name)
  );
  const isFavorite = computed(() => (pokemonId) => {
    return (
      Array.isArray(favoritePokemons.value) &&
      favoritePokemons.value.some((fav) => fav.id === pokemonId)
    );
  });

  const filteredPokemons = computed(() => {
    let basePokemons = [];

    if (currentFilter.value === "favorites") {
      basePokemons = favoritePokemons.value;
    } else {
      basePokemons = pokemons.value;
    }

    if (searchTerm.value) {
      const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
      return basePokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return basePokemons;
  });

  const setSearchTerm = (term) => {
    searchTerm.value = term;
  };

  const setFilter = (filterType) => {
    currentFilter.value = filterType;
  };

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("favoritePokemons");

    try {
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);

        if (Array.isArray(parsed)) {
          favoritePokemons.value = parsed;
        } else {
          console.warn(
            "Stored favorites in localStorage was not a valid array, resetting to empty."
          );
          favoritePokemons.value = [];
        }
      } else {
        favoritePokemons.value = [];
      }
    } catch (e) {
      console.error("Error parsing favorite pokemons from localStorage:", e);
      favoritePokemons.value = [];
    }
  };

  const saveFavoritesToLocalStorage = () => {
    localStorage.setItem(
      "favoritePokemons",
      JSON.stringify(favoritePokemons.value)
    );
  };

  const fetchPokemons = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const urlToFetch =
        nextUrl.value || `https://pokeapi.co/api/v2/pokemon?limit=50`;

      const data = await fetchPokemonList(urlToFetch);
      const newPokemons = data.results;
      nextUrl.value = data.next;

      const detailedPokemonsPromises = newPokemons.map(async (p) => {
        const details = await fetchPokemonDetailsByName(p.name);

        if (!details) {
          console.warn(
            `[fetchPokemons] No se encontraron detalles válidos para ${p.name}. Este Pokémon será omitido.`
          );
          return null;
        }

        const imageUrl =
          details.sprites?.other?.["official-artwork"]?.front_default ||
          details.sprites?.front_default ||
          null;
        return {
          id: details.id,
          name: details.name,
          image: imageUrl,
          types: Array.isArray(details.types)
            ? details.types.map((t) => t.type.name)
            : [],
          abilities: Array.isArray(details.abilities)
            ? details.abilities.map((a) => a.ability.name)
            : [],
          weight: details.weight,
          height: details.height,
        };
      });

      const detailedPokemons = await Promise.all(detailedPokemonsPromises);
      const validDetailedPokemons = detailedPokemons.filter((p) => p !== null);

      pokemons.value.push(...validDetailedPokemons);
    } catch (err) {
      error.value = `Error al buscar pokémones: ${err.message || err}`;
      console.error("Error completo en fetchPokemons: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const toggleFavorite = (pokemon) => {
    if (!Array.isArray(favoritePokemons.value)) {
      favoritePokemons.value = [];
    }

    const index = favoritePokemons.value.findIndex(
      (fav) => fav.id === pokemon.id
    );

    if (index === -1) {
      favoritePokemons.value.push(pokemon);
    } else {
      favoritePokemons.value.splice(index, 1);
    }

    saveFavoritesToLocalStorage();
  };

  return {
    pokemons,
    favoritePokemons,
    isLoading,
    error,
    nextUrl,
    searchTerm,
    currentFilter,
    allPokemons,
    getPokemonDetails,
    isFavorite,
    filteredPokemons,
    setSearchTerm,
    setFilter,
    loadFavoritesFromLocalStorage,
    saveFavoritesToLocalStorage,
    fetchPokemons,
    toggleFavorite,
  };
});

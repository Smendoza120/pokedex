//? Importacion de la libreria pinia, esta funciona para generar estados globales, por lo que combinado con la reactividad de Vue usando el .ref, de esta manera actualizamos las variables de manera reactiva.
//TODO: Reactividad: Realizar cambios de manera inmediata
  //? defineStore: Es una funcion de Pinia el cual crea un objeto donde podemos guardar y gestionar el estado globalmente, en este almacenaremos los valores, funciones y exportaciones para poder hacer uso de las funciones o cambiar los valores de manera global.
import { defineStore } from "pinia";

//? Importamos 2 funcionalidades de Vue:
//? ref: Usamos la funcionalidad ref para convertir nuestras variables en reactivas
//? computed: Es una funcionalidad de Vue el cual toma los valores reactivos y los mantiene actualizados de manera automatica
import { ref, computed } from "vue";
//? Importamos funcionalidades del archivo pokeapi
  //? fetchPokemonList: Traemos la lista completa de los pokemones
  //? fetchPokemonDetailsByName: Traemos al pokemon por su nombre
import {
  fetchPokemonList,
  fetchPokemonDetailsByName,
} from "@/services/pokeapi";

//? Funcion en la cual usamos la funcion defineStore de pinia, aqui creamos las variables que seran compartidas en todo el proyecto y las funciones que almacenaran, retiraran o filtraran los datos acorde a la logica.
export const usePokemonStore = defineStore("pokemon", () => {
  //TODO: Las variables creadas en esta seccion cuentan con su ref, el cual lo convertimos en valores reactivos
  //? Array de pokemones
  const pokemons = ref([]);
  //? Array de pokemones favoritos
  const favoritePokemons = ref([]);
  //? Variable booleana la cual se encarga del estado de carga, se inicializa en false, pero una vez finalice la carga cambia su valor a true
  const isLoading = ref(false);
  //? Variable el cual almacenara errores, se inicializa en null.
  const error = ref(null);
  //? Variable la cual almacenara la URL de la api para poder cargar mas pokemones, debido a que solo se traen 50 pokemones, no hubo necesidad de usarlo
  const nextUrl = ref(null);
  //? Variable la cual se encarga de llevar el filtro de los pokemones realizado
  const searchTerm = ref("");
  //? Variable la cual se encarga de hacer un filtro general, solo filtrara All o Favorite
  const currentFilter = ref("all");
  //? Variable la cual maneja el estado del modal, ahi es donde veremos los datos de cada pokemon
  const isModalOpen = ref(false);
  //? Variable la cual almacena toda la informacion del pokemon.
  const selectedPokemon = ref(null);
  //? Variabla el cual nos trae o nos retorna todos los pokemones, se agrega el computed para actualizar este valor de manera automatica y reactiva
  const allPokemons = computed(() => pokemons.value);

  const getPokemonDetails = computed(
    () => (name) => pokemons.value.find((p) => p.name === name)
  );

  //? Funcion la cual esta envuelta en un computed para actualizar el valor de manera automatica y reactiva, se crea un callback dentro de otro callback para seleccionar el id del pokemon.
  //? Este retorna true o false, nos sirve para manejar el estilo de algun componente acorde a su valor
  const isFavorite = computed(() => (pokemonId) => {
    //? Devolvemos el valor en un array
    return (
      //? Verificamos que favoritePokemons sea un array
      Array.isArray(favoritePokemons.value) &&
      //? Realizamos una busqueda de un pokemon, especificamente con el id.
      favoritePokemons.value.some((fav) => fav.id === pokemonId)
    );
  });


  const filteredPokemons = computed(() => {
    let basePokemons = [];

    //? Filtramos los pokemones favoritos o todos los pokemones
    if (currentFilter.value === "favorites") {
      basePokemons = favoritePokemons.value;
    } else {
      basePokemons = pokemons.value;
    }

    //? Si hay una busqueda, filtramos por el nombre del pokemon
    if (searchTerm.value) {
      const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
      return basePokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    //? Si no hay busqueda, retornamos la lista base o todos los pokemones
    return basePokemons;
  });

  //? Funcion que nos permite actualizar el valor de searchTerm en nuestro store
  const setSearchTerm = (term) => {
    searchTerm.value = term;
  };

  //? Funcion que nos permite actualizar el valor de CurrentFilter en el store, este es importante ya que nos pemite realizar el filtro
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

  const openModal = (pokemon) => {
    selectedPokemon.value = pokemon;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedPokemon.value = null;
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
    isModalOpen,
    selectedPokemon,
    setSearchTerm,
    setFilter,
    loadFavoritesFromLocalStorage,
    saveFavoritesToLocalStorage,
    fetchPokemons,
    toggleFavorite,    
    openModal,
    closeModal,
  };
});

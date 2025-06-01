import axios from "axios";

const API_POKEMON = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (url = `${API_POKEMON}/pokemon?limit=50`) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error al encontrar la lista de pokemones: ${error}`);
    throw error;
  }
}

export const fetchPokemonDetailsByName = async (name) => {
  try {
    const response = await axios.get(`${API_POKEMON}/pokemon/${name}`)
    return response.data
  } catch (error) {
    console.error(`Error al encontrar los datos de ${name}: ${error}`);
    throw error;
  }
}
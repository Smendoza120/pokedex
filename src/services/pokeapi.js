//? Importacion de la libreria de Axios, esta se usa para solicitudes HTTP, mejorando la funcionalidad del FETCH
import axios from "axios";

//? URL donde se encuentra la API a la cual vamos a consultar
const API_POKEMON = "https://pokeapi.co/api/v2";

//? Funcion asincrona la cual solicita una URL y como predeterminada agregamos la URL de la API, esta llamada esta limitada a 50 datos para no llamar toda la data.
export const fetchPokemonList = async (url = `${API_POKEMON}/pokemon?limit=50`) => {
  //? Manejamos un posible error con el Try Catch
  try {
    //? Realizamos la consulta de la API usando la libreria Axios, usamos el metodo Get para solicitar la informacion de la API y esta se almacena en una variable.
    //! Esta funcion se agrega (await) para decirle al programa que es una ejecucion asincrona
    const response = await axios.get(url);
    //? Retornamos o devolvemos la informacion y agregamos (.data) para acceder a los valores de la API.
    //TODO: Debemos revisar la estructura de la API ya que no siempre se accede a los datos de esta manera
    return response.data;
  } catch (error) {
    //? Esta seccion de codigo es para manejar los errores dentro del codigo try, esto evita que si se genere un error no detenga el aplicativo en su totalidad. 
    console.error(`Error al encontrar la lista de pokemones: ${error}`);
    //? Generamos el error y enviamos el mensaje de error
    throw error;
  }
}

//? Funcion asincrona la cual solicita una propiedad especificamente un name, lo que nos da alucion a agregar el nombre de un pokemon
export const fetchPokemonDetailsByName = async (name) => {
  try {
    //? Realizamos la llamada a la API con una solicitud GET lo cual realiza una consulta a la API pero con un parametro extra, el cual es el nombre de un pokemon, por lo que esta funcion nos sirve para realizar un filtro por nombre de pokemones
    //! Esta funcion se agrega (await) para decirle al programa que es una ejecucion asincrona
    const response = await axios.get(`${API_POKEMON}/pokemon/${name}`)
    //? Retornamos o devolvemos la informacion y agregamos (.data) para acceder a los valores de la API.
    //TODO: Debemos revisar la estructura de la API ya que no siempre se accede a los datos de esta manera
    return response.data
  } catch (error) {
    //? Esta seccion de codigo es para manejar los errores dentro del codigo try, esto evita que si se genere un error no detenga el aplicativo en su totalidad. 
    console.error(`Error al encontrar los datos de ${name}: ${error}`);
    //? Generamos el error y enviamos el mensaje de error
    throw error;
  }
}
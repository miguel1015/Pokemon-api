import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";

function App() {
  const [numero, setNumero] = useState(1);
  const [pokemon, setPokemon] = useState({});

  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const hanlerandom = () => {
    setNumero(numeroAleatorio(1, 150));
  };

  const getPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    const respuesta = await axios.get(url);
    setPokemon(respuesta.data);
    console.log(respuesta.data);
  };

  useEffect(() => {
    getPokemon();
  }, [numero]);

  const objPokemon = {
    nombre: pokemon.name,
    id: pokemon.id,
    experiencia: pokemon.base_experience,
    tipo1: pokemon.types == undefined ? "" : pokemon.types[0].type.name,
    // tipo2: pokemon.types == undefined ? '': pokemon.types[1].type.name,
    tipo2:
      pokemon.types == undefined
        ? ""
        : pokemon.types[1] == undefined
        ? ""
        : pokemon.types[1].type.name,
    // tipo2: pokemon.types[1]
    habilidades: pokemon.abilities,
  };

  const { nombre, id, experiencia, tipo1, tipo2, habilidades } = objPokemon;
  console.log(habilidades);

  return (
    <div className=" ">
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
        <img
          className="w-full"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${numero}.png`}
          alt="Sunset in the mountains"
        />
        <img
          className="w-16 mx-auto"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${numero}.png`}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{nombre}</div>
          <p className="text-gray-700 text-base">
            #{id} -<span className="px-2">Experiencia: {experiencia}</span>
          </p>
        </div>
        <div className="flex  justify-around">
          <img
            src={`https://pokeapp-nvynrgldc-fagru.vercel.app/images/type-${tipo1}.svg`}
            alt=""
          />
          <img
            src={`https://pokeapp-nvynrgldc-fagru.vercel.app/images/type-${tipo2}.svg`}
            alt=""
          />
        </div>

        <div className="px-6 pt-4 pb-2">
          {habilidades === undefined
            ? ""
            : habilidades.map((habilidad, index) => {
                return (
                  <p
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    key={index}
                  >
                    {habilidad.ability.name}
                  </p>
                );
              })}

          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
      <button onClick={hanlerandom} className="bg-yellow-500 py-2 px-2">
        Generar Pokemon Aleatorio
      </button>
        </div>
      </div>

    </div>
  );
}

export default App;

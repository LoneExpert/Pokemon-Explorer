"use client";
import React, { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      setPokemonList(data.results);
    };
    fetchPokemons();
  }, []);

  const filteredList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4 tracking-tight drop-shadow">
          PokéExplorer
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Discover your favorite Pokémon and explore their powers!
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent mb-8 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredList.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      </div>
    </main>
  );
}

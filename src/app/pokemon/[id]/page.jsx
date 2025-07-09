import Link from "next/link";

// 1. Generate static params for export
export async function generateStaticParams() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await res.json();

  return data.results.map((pokemon) => ({
    id: pokemon.name,
  }));
}

// 2. Fetch Pokémon data
async function getPokemonData(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Pokemon not found");
  return res.json();
}

// 3. Page Component
const PokemonDetailPage = async ({ params }) => {
  const data = await getPokemonData(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="w-48 h-48 mb-4"
          />
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {data.name}
          </h1>

          {/* Types */}
          <div className="flex gap-2 mt-2">
            {data.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>

          {/* Abilities */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Abilities</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-left">Stats</h2>
            {data.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {stat.stat.name}
                  </span>
                  <span className="text-sm text-gray-600">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full"
                    style={{ width: `${stat.base_stat > 100 ? 100 : stat.base_stat}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Moves */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Moves</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-3 border rounded bg-gray-50">
              {data.moves.slice(0, 30).map((move) => (
                <span
                  key={move.move.name}
                  className="text-sm text-gray-800 bg-yellow-100 px-3 py-1 rounded-full whitespace-nowrap"
                >
                  {move.move.name}
                </span>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/"
            className="mt-8 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;

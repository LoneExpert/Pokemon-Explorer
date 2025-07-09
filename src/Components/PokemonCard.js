import Link from "next/link";

const PokemonCard = ({ name, url }) => {
  const id = url.split("/").filter(Boolean).pop();

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition transform hover:-translate-y-1 text-center cursor-pointer">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="w-20 h-20 mx-auto mb-2"
        />
        <h2 className="capitalize text-lg font-semibold text-gray-800">
          {name}
        </h2>
      </div>
    </Link>
  );
};

export default PokemonCard;

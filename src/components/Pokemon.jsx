import { useEffect, useState } from "react"

export default function Pokemon({ pokemon }) {

    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonHp, setPokemonHp] = useState(1);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
                const data = await response.json();
                setPokemonData(data);
                setPokemonHp(data.stats[0]["base_stat"]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchPokemonData();
    }, [])

    if (pokemonData && pokemonHp) {
        return (
            (<div className="pokemon">
                <h2>{pokemonData.name}</h2>
                <img src={pokemonData.sprites.other["official-artwork"]["front_default"]} />
                <div className="pokemonTypes">
                    {pokemonData.types.map(type => {
                        return <div key={type.type.name}>{type.type.name}</div>
                    })}
                </div>
                <div>
                    <h2>HP: {pokemonHp}</h2>
                    <h2>ATT: {pokemonData.stats[1]["base_stat"]}</h2>
                    <h2>DEF: {pokemonData.stats[2]["base_stat"]}</h2>
                </div>
            </div>)
        )
    } else {
        return <div>Loading...</div>
    }
}
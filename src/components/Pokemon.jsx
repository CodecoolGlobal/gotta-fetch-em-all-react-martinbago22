export default function Pokemon({ pokemon }) {

    return (
        (<div className="pokemon" data-class={pokemon.types[0].type.name}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.other["official-artwork"]["front_default"]} />
            <div className="pokemonTypes">
                {pokemon.types.map(type => {
                    return <div className={type.type.name} key={type.type.name}>{type.type.name}</div>
                })}
            </div>
            <div className="stats">
                <h2>HP: {pokemon.stats[0]["base_stat"]}</h2>
                <h2>ATT: {pokemon.stats[1]["base_stat"]}</h2>
                <h2>DEF: {pokemon.stats[2]["base_stat"]}</h2>
            </div>
        </div>)
    )
}
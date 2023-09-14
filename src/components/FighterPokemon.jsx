export default function FighterPokemon({ name, sprite, types, hp, att, def}) {
  return (
    (<div className="pokemon" data-Class={types[0].type.name}>
                <h2>{name}</h2>
                <img src={sprite} />
                <div className="pokemonTypes">
                    {types.map(type => {
                        return <div className={type.type.name} key={type.type.name}>{type.type.name}</div>
                    })}
                </div>
                <div>
                    <h2>HP: {hp}</h2>
                    <h2>ATT: {att}</h2>
                    <h2>DEF: {def}</h2>
                </div>
            </div>)
  )
}
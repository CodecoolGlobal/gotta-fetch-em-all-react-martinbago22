export default function FighterPokemon({ name, sprite, types, hp, att, def}) {
  return (
    (<div className="pokemon">
                <h2>{name}</h2>
                <img src={sprite} />
                <div className="pokemonTypes">
                    {types.map(type => {
                        return <div key={type.type.name}>{type.type.name}</div>
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
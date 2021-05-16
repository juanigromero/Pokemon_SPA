import React, { useEffect} from "react";
import { useParams } from "react-router";
// import styles from "./DetailsCards.module.scss";
import DetailsCard from "./DetailsCard.js";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../actions";
import { urls } from "../../urls_types.js";

export default function DetailsCards() {
  const dispatch = useDispatch();
  const pokemon = useSelector((store) => store.pokemonDetails);
  const {id} = useParams()

  useEffect(() => {
    const details = async() =>{
      dispatch(getPokemonDetail(id))
    }
    details()
    console.log(pokemon)
  },[dispatch,id])

  useEffect(() => {
    console.log(pokemon)
  },[pokemon])

  if (pokemon) {
    return (
      <DetailsCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.imge || pokemon.img}
            hp= {pokemon.hp}
            strength= {pokemon.strength}
            defense= {pokemon.defense}
            speed = {pokemon.speed}
            height = {pokemon.height}
            weight = {pokemon.weight}
            //   onClose={() => onClose(p.id)}
            tipo={pokemon.tipos?.image? 
              pokemon.tipos
              :
              pokemon.tipos?.map((t) => {
              let typesprite = urls?.find((u) => u.name === t.name);
              return { name: t.name, image: typesprite?.url };
            })  
            } //t.imge
            />
    )
    // const pokemon = pokes.find( pokemon => pokemon.id === id)
    
    // return (
    //     <div className={styles.container}>

    //   <DetailsCard
    //         key={pokemon.id}
    //         name={pokemon.name}
    //         img={pokemon.img}
    //         hp= {pokemon.hp}
    //         strength= {pokemon.strength}
    //         defense= {pokemon.defense}
    //         speed = {pokemon.speed}
    //         height = {pokemon.height}
    //         weight = {pokemon.weight}
    //         //   onClose={() => onClose(p.id)}
    //         tipo={pokemon.types} //t.imge
    //         />
    //     </div>
    // );
  } else {
    return <div>Sin Pokemon</div>;
  }
}

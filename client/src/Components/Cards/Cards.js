import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCreated, getPokemons } from "../../actions/index.js";
// import { getPokemons } from "../../actions/index.js";
import Pagination from "../Pagination/Pagination.js";
import Card from "./Card.js";
import styles from "./Cards.module.scss";

export default function Cards() {
  const [pokes, setPokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsForPage, setPokemonsForPage] = useState(12);
  const { pokemons, filterState, filterOther } = useSelector((store) => store);
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()
  const {created} = useSelector( store => store)
  //llamado a los pokemons, antes se hacia al montarse app pero no cargaban las cards de los pokes automaticamente
  useEffect(() => {
    const feth = async () =>{
      setLoading(true)
      await dispatch(getPokemons());
      setLoading(false)
    }
    feth()
  }, []);

  useEffect(() => {
    const Crea = async () =>{
      setLoading(true)
      await dispatch(getCreated());
      setLoading(false)
    }
    const feth = async () =>{
      setLoading(true)
      await dispatch(getPokemons());
      setLoading(false)
    }
    if(created === true) Crea()
    if(created === false) feth()
  }, [created]);

  //paginacion
  const indexOfLastPoke = currentPage * pokemonsForPage;
  const indexOfFirstPoke = indexOfLastPoke - pokemonsForPage;
  const currentPokemons = pokes.slice(indexOfFirstPoke, indexOfLastPoke);

  // Cambiar de página
  const pagination = (numberPage) => setCurrentPage(numberPage)

  //setea el estado propio de cards para poder manejar el filtrado modificando el mismo y no el store de redux
  useEffect(() => {
    console.log(pokemons)
    setPokes([1,2]);
    console.log(pokes)
  }, []);


  //filtrado entre tipos de pokemon
  useEffect(() => {
    if (filterState === "ninguno") return setPokes(pokemons);
    setPokes(
      pokemons?.filter(({ tipos }) =>
        tipos.some((tipo) => tipo.name === filterState)
      )
    );
  }, [filterState,pokemons]);

  //ordenamiento x fuerza y x nombre
  useEffect(() => {
    if (filterOther === "alfaAsc")
      return setPokes(
        [...pokes].sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        )
      );
    else if (filterOther === "alfaDsc")
      return setPokes(
        pokes.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        )
      );
    else if (filterOther === "MenFu")
      return setPokes(
        [...pokes].sort((a, b) =>
          a.strength > b.strength ? 1 : a.strength < b.strength ? -1 : 0
        )
      );
    else if (filterOther === "MaxFu")
      return setPokes(
        [...pokes].sort((a, b) =>
          a.strength < b.strength ? 1 : a.strength > b.strength ? -1 : 0
        )
      );
    else
      return setPokes(
        [...pokes].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
      );
  }, [filterOther]);

  //si estan cargando los pokemones muestra un mensaje
  if (loading) {
    return <h2 style={{color:'whitesmoke'}}>Liberando Pokemones... Aguarde un momento</h2>;
  }

  return (
    <>
    <div className={styles.container}>
      {currentPokemons?.map((p) => (
        <Link key={p.id} to={`/poke/${p.id}`} style={{textDecoration:'none'}}>
        <Card
          key={p.id}
          name={p.name}
          img={p.img}
          tipo={p.tipos?.map((t) => t.image)}
          />
          </Link>
      ))}
    </div>
    <Pagination totalPokemons={pokes.length} pokemonsForPage={pokemonsForPage} pagination={pagination}/>
    </>
  );
}

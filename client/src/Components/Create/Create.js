import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Create.module.scss";
import { Redirect, useHistory } from 'react-router-dom'

export default function Create() {
  const [body, setBody] = useState({
    name: "",
    hp: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    tipo1:1,
    tipo2:2,
  });
  const [options, setOptions] = useState([]);
  let history = useHistory()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/types`)
      .then(({ data }) => setOptions(data));
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/pokemons", body)
      .then(({ data }) => history.push(`/poke/${data.id}`));

    setBody({
      name: "",
      hp: "",
      strength: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      tipo1:1,
      tipo2:2,
    })
    
    
  };

  const selectHandler = (e) => {
    e.preventDefault()
    setBody({...body, [e.target.name]:e.target.value})
  }

  return (
    <>
      <h2>Crea tu Pokemon!</h2>
      <form className={styles.create} onSubmit={submitHandler}>
        <label>Nombre</label>
        <input
          type="text"
          value={body.name}
          name="name"
          placeholder="Nombre"
          onChange={changeHandler}
        />
        <label>Vida</label>
        <input
          type="num"
          value={body.hp}
          name="hp"
          placeholder="Vida"
          onChange={changeHandler}
        />
        <label>Fuerza</label>
        <input
          type="num"
          value={body.strength}
          name="strength"
          placeholder="Fuerza"
          onChange={changeHandler}
        />
        <label>Defensa</label>
        <input
          type="num"
          value={body.defense}
          name="defense"
          placeholder="Defensa"
          onChange={changeHandler}
        />
        <label>Velocidad</label>
        <input
          type="num"
          value={body.speed}
          name="speed"
          placeholder="Velocidad"
          onChange={changeHandler}
        />
        <label>Altura</label>
        <input
          type="num"
          value={body.height}
          name="height"
          placeholder="Altura"
          onChange={changeHandler}
        />
        <label>Peso</label>
        <input
          type="num"
          value={body.weight}
          name="weight"
          placeholder="Peso"
          onChange={changeHandler}
        />
        <select value={body.tipo1} name="tipo1" onChange={selectHandler}>
          {options?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <select value={body.tipo2} name="tipo2" onChange={selectHandler}>
          {options?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <input className={styles.button} type="submit" value='CREAR'/>
      </form>
    </>
  );
}

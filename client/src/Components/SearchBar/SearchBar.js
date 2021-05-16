import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [state, setState] = useState({ search: "", submit: false });
  // const pokemons = useSelector((store) => store.pokemons);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const pokeFound = pokemons?.find(p => p.name === state.search)
    // console.log(pokeFound)
    const { data } = await axios.get(
      `http://localhost:3001/pokemons?name=${state.search}`
    );
    console.log(data);
    setState({ ...state, submit: data });
  };

  return (
    <div className={styles.containter}>
      <form onSubmit={handleSubmit}>
        {/* <label>Buscar un Pokemon</label> */}
        <input
          type="text"
          placeholder="Inserte Pokemon"
          value={state.search}
          onChange={(e) => {
            setState({ ...state, search: e.target.value });
          }}
        />
        <input type="submit" className={styles.button} value="Buscar" />
      </form>
      <div>
        <Link
          to={state.submit.id ? `/poke/${state.submit.id}`: '/poke'}
          style={{ textDecoration: "none" }}
        >
          <Card
            key={state.submit.id}
            name={state.submit.name}
            img={state.submit.img || 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3ce212da-22a2-4830-85cc-f5e5affc5cd6/dcxehfe-dd22d80d-4cff-49bf-be56-bb51f5ea0a78.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvM2NlMjEyZGEtMjJhMi00ODMwLTg1Y2MtZjVlNWFmZmM1Y2Q2XC9kY3hlaGZlLWRkMjJkODBkLTRjZmYtNDliZi1iZTU2LWJiNTFmNWVhMGE3OC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.SU4WFqdvx7X92fK4EULHfUIVdib6_qYslDn2PbOcI4Y'}
            tipo={state.submit.tipos?.map((t) => t.image)}
          />
        </Link>
      </div>
    </div>
  );
}

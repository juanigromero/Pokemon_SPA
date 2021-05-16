import React from "react";
import {  NavLink } from "react-router-dom";
import styles from "./Pagination.module.scss";

export default function Pagination({ pokemonsForPage, totalPokemons, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsForPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      {pageNumbers.map((n) => (
        <NavLink to="#" className={styles.links} key={n} onClick={() => pagination(n)} >
          <span key={n}>{n}</span>
        </NavLink>
      ))}
    </nav>
  );
}

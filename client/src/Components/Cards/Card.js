import React from "react";
// import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

export default function Card({ name, img, tipo }) {
  return (
    <div className={styles.invi}>
      <div className={styles.container}>
        <div className={styles.marco}>
          <div className={styles.types}>
            {tipo?.map((tipo) => (
              // <span>{tipo}</span>
              <embed
                key={tipo}
                src={tipo}
                alt="pokemon"
                style={{ width: "20px" }}
              /> //cambiar en /Cards.js
            ))}
          </div>
          <img src={img} width="200" alt="" />

          <div className={styles.content}>
            <div>
              <span>{name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

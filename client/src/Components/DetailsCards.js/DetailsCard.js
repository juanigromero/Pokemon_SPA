import React from "react";
// import { Link } from "react-router-dom";
import styles from "./DetailsCard.module.scss";

export default function DetailsCard({
  id,
  name,
  img,
  tipo,
  hp,
  strength,
  defense,
  speed,
  height,
  weight,
}) {

  
  return (
    <div className={styles.invi} >
      <div className={styles.container}>
        <div className={styles.marco}>
          <img src={img} width='200'  alt="POKEFOTO" className={styles.img}/>

          <div className={styles.content}>
            <div>
              <h1>{name}</h1>
              <span style={{position:'relative', bottom:'2.5rem', fontSize:'1.2rem',color:'gray'}}>#{id}</span>
              <div>
              <span>Vida:</span><span>{hp}</span>
              </div>
              <div>
              <span>Fuerza:</span><span>{strength}</span>
              </div>
              <div>
              <span>Defensa:</span><span>{defense}</span>
              </div>
              <div>
              <span>Velocidad:</span><span>{speed}</span>
              </div>
              <div>
              <span>Altura:</span><span>{height}</span>
              </div>
              <div>
              <span>Peso:</span><span>{weight}</span>
              </div>
              <span>Tipos:</span>
              <div style={{display:'flex',justifyContent:'space-around', border:'none', margin:'1rem 0rem 0rem 0rem'}}>
                {tipo?.map((tipo) => (
                  // <span>{tipo.name}</span>
                  <div key={tipo.name} style={{display:'flex', flexDirection:'column',width:'auto'}}>
                  <img src={tipo.image} alt='pokemon' style={{ height:'2rem'}}/>
                  <span>{tipo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

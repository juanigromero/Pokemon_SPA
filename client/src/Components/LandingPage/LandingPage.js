import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.scss'

export default function LandingPage() {



    return(
        <div className={styles.container}>
        <h1>BIENVENIDOS, PULSA LA POKEDEX PARA COMENZAR</h1>
        <Link to='/poke'>
            <img alt='pokedex' src='https://data.apksum.com/ce/com.birkoss.pokedex/1.0.7/icon.png'/>
        </Link>
        </div>
    )
}
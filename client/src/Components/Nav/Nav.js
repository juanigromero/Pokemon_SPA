import React from "react";
import { Link } from "react-router-dom";

export default function Nav(params) {
  return (
    <div style={{backgroundColor:'black', width:'100vw',display:'flex',justifyContent:'space-between',height:'4rem',alignItems:'center'}}>
      <Link to='/poke'>
        <img style={{width:'50px',marginLeft:'150px'}} alt='Pokebola' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png" />
      </Link>
      <Link to='/'>
      <img style={{height:'50px'}}  alt='pokemon' src='https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png' />
      </Link>
      <Link to='/poke/create'>
        <img alt='incubadora' style={{height:'50px',marginRight:'150px'}} src='https://image.flaticon.com/icons/png/512/188/188962.png' />
      </Link>
    </div>
  );
}

import "./App.css";
import { useState, useEffect } from "react";
import Cards from "./Components/Cards/Cards";
import DetailsCards from "./Components/DetailsCards.js/DetailsCards";
import { Route, Switch } from "react-router";
import Nav from "./Components/Nav/Nav";
import SearchBar from "./Components/SearchBar/SearchBar";
import Buttons from "./Components/Buttons";
import { getCreated, getPokemons } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Create from "./Components/Create/Create";
import LandingPage from "./Components/LandingPage/LandingPage";
import axios from "axios";


function App() {

  // useEffect(()=>{
  //   axios.get('http://localhost:3001/pokemons/1')
  //   .then(data => console.log(data))
  // },[])

  


  return (
    <div className="App">
      <Route path="/poke">
        <Nav />
      </Route>
      <Switch>
        <Route path="/poke/create">
          <Create />
        </Route>
        <Route path="/poke/:id">
          <DetailsCards />
        </Route>
        <Route path="/poke">
          <SearchBar/>
          <Buttons/>
          <Cards />
        </Route>
        <Route path="/">
          <LandingPage/>
        </Route>
      </Switch>
    </div>
  );
}


export default App;

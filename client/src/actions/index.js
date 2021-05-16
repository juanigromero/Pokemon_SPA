import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS'
export const GET_DETAIL = 'GET_DETAIL'
export const SELECT_TYPE = 'SELECT_TYPE'
export const CREATED = 'CREATED'
export const SELECT_OTRO = 'SELECT_OTRO'

export function getPokemons(){
    return function (dispatch){
      return axios.get('http://localhost:3001/pokemons')
      .then(({data}) => {
            // console.log(data)
            dispatch({type:GET_POKEMONS, payload: data});
          })
          .catch(err => {console.log(err)})
    }
}

export function getCreated(){
  //crear funcion que trae los creados
  return function (dispatch){
    return axios.get('http://localhost:3001/pokemonsCreated')
    .then(({data}) => {
        dispatch({type:GET_POKEMONS, payload: data});
        })
        .catch(err => {console.log(err)})
  }
}

export function getPokemonDetail(id){
  return function(dispatch){
    return axios.get(`http://localhost:3001/pokemons/${id}`)
    .then(({data}) => {
      dispatch({type:GET_DETAIL, payload: data})
    })
  }
}

export function selectType(select){
  return {
    type:SELECT_TYPE,
    payload:select
  }
}

export function selectOther(select){
  return {
    type:SELECT_OTRO,
    payload:select
  }
}

export function created(ToF){
  return{
    type:CREATED,
    payload:ToF
  }
}
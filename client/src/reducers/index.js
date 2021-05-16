import { GET_POKEMONS, GET_DETAIL, SELECT_TYPE, CREATED , SELECT_OTRO} from "../actions";

const initialState = {
  pokemons: [],
  pokemonDetails: {},
  filterState: "ninguno",
  filterOther:'predeterminado',
  created: '',
};


export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    case SELECT_TYPE:
      return {
        ...state,
        filterState: action.payload
      };
    case SELECT_OTRO:
      return {
        ...state,
        filterOther: action.payload
      };
    case CREATED:
      return {
        ...state,
        created: action.payload,
      };
    default:
      return state;
  }
}

export const actions = {
  player1Loading: 'player 1',
  player2Loading: 'player 2',
  player1Success: 'player1-success',
  player2Success: 'player2-success',
  winner: 'player-wins',
  fighting: 'fight-loading', 
  fightFinish: 'fighting-finish',
  reset: 'reset',
  error: 'error'
}

export const reducer = (state, action) => {
  switch (action.type){
    case actions.player1Loading : {
      return {
        ...state,
        player1 : {
          ...state.player1,
          loading: true,
          error: false,
          pokemon: {}
        }
      }
    }
    case actions.player1Success : {
      return {
        ...state,
        player1 : {
          ...state.player1,
          loading: false,
          error: false,
          pokemon: action.payload
        }
      }
    }
    case actions.player2Loading : {
      return {
        ...state,
        player2 : {
          ...state.player2,
          loading: true,
          error: false,
          pokemon: {}
        }
      }
    }
    case actions.player2Success : {
      return {
        ...state,
        player2 : {
          ...state.player2,
          loading: false,
          error: false,
          pokemon: action.payload
        }
      }
    }
    case actions.winner : {
      if(action.player === 'player 1'){
        return {
          ...state,
          player1: {
            ...state.player1,
            win: true
          }
        }
      }else{
        return {
          ...state,
          player2: {
            ...state.player2,
            win: true
          }
        }
      }
    }
    case actions.fighting : {
      return {
        ...state,
        fightLoading: true
      }
    }
    case actions.fightFinish : {
      return {
        ...state,
        fightLoading : false
      }
    }
    case actions.error : {
      if(action.player === 'player 1'){
        return {
          ...state,
          player1: {
            ...state.player1,
            error: true
          }
        }
      }else{
        return {
          ...state,
          player2: {
            ...state.player2,
            error: true
          }
        }
      }
    }
    case actions.reset : {
      return {
        player1: {
          error: false,
          loading: false,
          win:false,
          pokemon: {},
        },
        player2: {
          error: false,
          loading: false,
          win: false,
          pokemon: {}
        }
      }
    }
    default:{
      return state
    }
  }
}

export async function getPokemon(id, player, dispatch) {
  try {
    if (player === 'player 1') {
      dispatch({ type: actions.player1Loading });
    } else {
      dispatch({ type: actions.player2Loading });
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(!response.ok){
      throw new Error('Failed to fetch pokemon!')
    }

    const data = await response.json();

    const {name, sprites, stats} = data
    
    if (player === 'player 1') {
      dispatch({ type: actions.player1Success, payload: {name, sprites, stats} });
    } else {
      dispatch({ type: actions.player2Success, payload: {name, sprites, stats} });
    }
  } catch (err) {
    dispatch({type: actions.error, player : player })
  }
}
import { reducer, actions, getPokemon } from '../../JS/reducer'
import { useReducer } from 'react'
import { motion } from 'framer-motion'
import PokemonTemplate from './pokemonTemplate'
import FightVs from './FightVs'

const bgArena = {
  backgroundImage : 'url(../../images/vs.jpg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const Arena = () => {
  const [state, dispatch] = useReducer(reducer, {
    fightLoading: false,
    player1: {
      error: false,
      loading: false,
      win: false,
      pokemon: {},
    },
    player2: {
      error: false,
      loading: false,
      win:false,
      pokemon: {}
    }
  })

  const { player1 , player2, fightLoading} = state;

  const bgPlayerOnePokemon = {
    backgroundImage : `url(${player1.pokemon.sprites?.other.home.front_shiny})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  
  const bgPlayerTwoPokemon = {
    backgroundImage : `url(${player2.pokemon.sprites?.other.home.front_shiny})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }


  function fight(){
    dispatch({type: actions.fighting})

    const pokemonOneAvg = player1.pokemon.stats?.reduce((total, curr) => total + curr.base_stat, 0) / player1.pokemon.stats?.length;
    const pokemonTwoAvg = player2.pokemon.stats?.reduce((total, curr) => total + curr.base_stat, 0) / player2.pokemon.stats?.length;
    
    const player1Wins = pokemonOneAvg > pokemonTwoAvg;

    setTimeout(() => {
      dispatch({type: actions.fightFinish})
      if(player1Wins){
        dispatch({type: actions.winner, player: 'player 1'})
      }else{
        dispatch({type: actions.winner, player: 'player 2'})
      }
    }, 3000)
  }

  return (
    <>
      <div 
        style={bgArena}
        className='h-[30vh]  md:h-[50vh] lg:h-[60vh] flex justify-center items-center w-full overflow-hidden'
      >
        <div className='flex item-center justify-between  lg:w-[90%] xl:w-[80%] m-auto  overflow-hidden max-w-[1500px] w-full sm:w-[70%] '>
          {
            (state.player1.win || state.player2.win) && (
              <div className='md:hidden flex justify-center items-center w-full'>
                <h1 className='text-[#ffcb05] text-4xl'>
                  {state.player1.win ? 'Player 1 Wins !' : 'Player 2 Wins !'}
                </h1>
              </div>
            )
          }

          {
            player1.pokemon.sprites ? (
              <motion.div
                initial={{x: '-100vw'}}
                animate={{x: 0}}
                transition={{duration: 1}}
                className='hidden md:inline md:w-[250px] md:h-[240px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px]'
              >

                <div className='absolute text-5xl rotate-[-45deg] top-20 md:top-36 md:right-5 bg-black bg-opacity-50 lg:text-8xl'>
                  {player1.win && <p className='text-[#ffcb05]'>Winner!</p>}
                </div>

                <div style={bgPlayerOnePokemon}
                  className='h-full w-full'
                ></div>
              </motion.div>
            ) : null
          }

          {
            player2.pokemon.sprites ? (              
              <motion.div
                initial={{x: '100vw'}}
                animate={{x: 0}}
                transition={{duration: 1}}
                className='hidden md:inline md:w-[250px] md:h-[240px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px]'
              >
                <div className='absolute text-5xl rotate-[-45deg] top-20 md:top-36 md:right-5 bg-black bg-opacity-50 lg:text-8xl'>
                  {player2.win && <p className='text-[#ffcb05]'>Winner!</p>}
                </div>

                <div style={bgPlayerTwoPokemon}
                  className='h-full w-full'
                ></div>

              </motion.div>

            ) : null
          }
        </div>
      </div>
      
      <div className='flex flex-col justify-center items-center max-w-[1500px] m-auto pb-7'>
        <div className='flex items-center justify-evenly w-full'>
          <button
            disabled={
              (
                Object.keys(player1.pokemon).length !== 0 &&
                Object.keys(player2.pokemon).length !== 0 &&
                player1.win || player2.win
                ) ? false : true
            }
            onClick={() => dispatch({type: actions.reset})}
            className='py-2 px-4 rounded-2xl bg-red-600 text-white my-3 cursor-pointer'
          >
            Reset
          </button>

          {
            player1.win || player2.win || fightLoading ? null :
            <button
              disabled={
                (Object.keys(state.player1.pokemon).length !== 0 && 
                Object.keys(state.player2.pokemon).length !== 0 ) ? 
                false : true
              }
              onClick={fight}
              className='text-xl py-2 px-4 rounded-2xl bg-[#ffcb05] text-[#3c5aa6] md:hidden'
            >
              Fight!
            </button>
          }

          {
            fightLoading && (
              <motion.button
                initial={{scale: 1}}
                animate={{scale: 1.2}}
                transition={{repeat: Infinity, duration: 1}}
                className='md:hidden text-xl py-2 px-4 rounded-2xl bg-[#ffcb05] text-[#3c5aa6]'
              >
                Fighting!
              </motion.button>
            )
          }
        </div>

        <div className='flex flex-col justify-between w-full lg:w-[80%] md:flex-row '>
          <PokemonTemplate 
            player='Player 1'
            pokemon= {player1.pokemon}
            onClick={() => getPokemon(Math.floor(Math.random() * 1025) + 1, 'player 1', dispatch)}
            img={player1?.pokemon?.sprites?.other?.home?.front_shiny}
            loading={player1.loading}
            error={player1.error}
            outCome={player1.win}
          />

          {
            fightLoading ? 
            <FightVs /> : 
            null 
          }

          {
            player1.win || player2.win || fightLoading ? null :
            <button
              disabled={
                (Object.keys(state.player1.pokemon).length !== 0 && 
                Object.keys(state.player2.pokemon).length !== 0 ) ? 
                false : true
              }
              onClick={fight}
              className='hidden text-xl py-2 px-4 rounded-2xl bg-[#ffcb05] text-[#3c5aa6] hover:bg-[#3c5aa6] hover:text-[#ffcb05] cursor-pointer self-start mt-40 md:inline'
            >
              Fight!
            </button>
          }

          <PokemonTemplate
            player='Player 2'
            pokemon = {player2.pokemon}
            onClick={() => getPokemon(Math.floor(Math.random() * 1025) + 1, 'player 2', dispatch)}
            img={player2?.pokemon?.sprites?.other.home.front_shiny}
            loading={player2.loading}
            error={player2.error}   
            outCome={player2.win}   
          />
        </div>
      </div>
    </>
  )
}

export default Arena
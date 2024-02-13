import Loading from './Loading'
import { useState } from 'react'

const PokemonTemplate = ({img, onClick, player, pokemon, loading, error, outCome }) => {

  const [showStats, setShowStats] = useState(false)

  return (
      <div className='mx-auto py-5 md:py-0 ' >
        <h1 className='text-center text-3xl my-2'>{player}</h1>
        <div className={outCome ? 
          'w-[300px] h-[300px] border-8 border-[#ffcb05] rounded-2xl flex justify-center items-center bg-[#3c5aa6] p-5 relative overflow-hidden ' : 
          'w-[300px] h-[300px] border border-black rounded-2xl flex justify-center items-center bg-[#3c5aa6] p-5 relative overflow-hidden '
          }
        >
          
          {
            loading ? 
            <Loading />:
            <div>
              <img src={img || '../../images/Poke_ball.webp'} 
              alt='pokemon' className='rounded-2xl'/>
            </div> 
          }

          {
              Object.keys(pokemon).length !== 0 && (
              <button 
                onClick={() => setShowStats(!showStats)}
                className='absolute top-2 right-2 text-[#ffcb05] z-20 md:hidden'
              >
               {showStats ? 'Close Stats' : 'Show Stats'}
              </button>
            )
          }

          {
            showStats && (
              <div className='absolute w-full h-full bg-black z-10 bg-opacity-60 flex justify-center items-center'>
                <div className='relative z-20 text-[#ffcb05] w-[80%]'>
                  {pokemon && pokemon.stats && pokemon.stats.map((stat, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between my-2 w-full'
                    >         
                      <span className='uppercase'>{stat.stat?.name} : </span> 
                      <span className='text-right'>{stat.base_stat}</span>       
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        </div>
        
        {
          pokemon.name ? null :
          <div 
            className='text-center'
          >
            <button 
              onClick={onClick}
              className='py-2 px-4 border bg-[#ffcb05] rounded-2xl my-2  hover:bg-[#3c5aa6] hover:text-[#ffcb05]' 
            >
              Click for a Pokemon
            </button>
          </div> 
        }
        
        {
          error && (
            <div className='text-red-500 text-center text-2xl'>
              <p>Sorry network troubles</p>
              <p>Please Click again</p>
            </div>
          )
        }

        <h1 className='uppercase text-center text-2xl text-[#3c5aa6]'> 
          {pokemon?.name}
        </h1> 
        
        <div className='hidden md:inline'>
          {pokemon && pokemon.stats && pokemon.stats.map((stat, i) => (
            <div
              key={i}
              className='my-4 border border-black py-2 px-8 rounded-2xl bg-[#ffcb05] flex justify-between items-center'
            >         
              <span className='uppercase'>{stat.stat?.name}</span> 

              <span className='text-right'>{stat.base_stat}</span>       
            </div>
          ))}
        </div>
      </div>
  )
}

export default PokemonTemplate;
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const style = {
  backgroundImage : 'url(../../images/pokemonbackground.jpg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const bgImage1 = {
  backgroundImage : 'url(../../images/bulbasaur.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const bgImage2 = {
  backgroundImage : 'url(../../images/squirtle.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const bgImage3 = {
  backgroundImage : 'url(../../images/charmander.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      style={style}
      className='h-screen relative'
    >
      <div className='absolute w-full h-full bg-black opacity-60 z-30'></div>
      
      <div className='h-screen  relative w-[80%] m-auto'>
        <div 
          className='hidden lg:inline lg:flex lg:justify-center lg:items-center absolute  lg:bottom-40 2xl:bottom-36 w-full'
        >
          <motion.div
            initial={{y: '100vw'}}
            animate={{y: 0}} 
            transition={{duration: 1}}
            style={bgImage3}
            className='lg:w-[250px] lg:h-[290px] xl:w-[300px] xl:h-[340px]  xl:bottom-36'
          ></motion.div>
        </div>

        <div className='hidden lg:inline lg:flex lg:justify-center lg:items-center'>
          <div className='flex justify-between items-center w-[85%] lg:top-44 sxl:top-36 absolute'>
            <motion.div 
              initial={{x: '-100vw'}}
              animate={{x: 0}} 
              transition={{duration: 1}}
              style={bgImage1}
              className='lg:w-[250px] lg:h-[290px] xl:w-[300px] xl:h-[340px]'
            ></motion.div>
            
            <motion.div
              initial={{x: '100vw'}}
              animate={{x: 0}} 
              transition={{duration: 1}}
              style={bgImage2}
              className='lg:w-[250px] lg:h-[290px] xl:w-[300px] xl:h-[340px]'
            ></motion.div>
          </div>
        </div>
      </div>

      <div 
        className='flex justify-center items-center text-white absolute z-40 top-0 h-screen w-full'
      >
        <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.1}}
          className='text-center'
        >
          <h1 className='text-6xl my-4 text-[#ffcb05]'>
            PokéClash
          </h1>

          <p className='md:w-[40%] my-4 text-xl text-center m-auto px-2'>
            PokéClash elevates everyday moments into thrilling adventures. Challenge both friends and strangers to intense battles where the loser takes on exciting dares, from taking a shot to daring tasks, or even footing the bill for added excitement
          </p>

          <button 
            onClick={() => navigate('/duel')}
            className='my-4 border border-white py-2 px-4 rounded-2xl hover:text-[#ffcb05] hover:border-[#ffcb05]'
          >
            Play Now
          </button>
        </motion.div>
      </div>

    </div>
  )
}

export default Home;
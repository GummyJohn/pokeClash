import { motion } from 'framer-motion'

const FightVs = () => {
  return (
    <motion.div 
      initial={{scale: 1, rotate: '15deg'}}
      animate={{scale: 2}}
      transition={{repeat: Infinity, duration: .9}}
      className='hidden md:inline h-[50px] w-[50px] flex justify-evenly rotate-[15deg] text-[#3c5aa6] md:mt-40'
    >
      <span className='text-3xl'>V</span>
      <span className='text-2xl mt-2 mr-[5px] rotate-[10deg] text-[#ffcb05]'>/</span>
      <span className='text-3xl mt-4 ml-[-1px]'>S</span>
    </motion.div>
  )
}

export default FightVs
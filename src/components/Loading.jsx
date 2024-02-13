import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <motion.div
        initial={{scale: 1}}
        animate={{scale: 5}}
        transition={{repeat: Infinity, duration: 2}}
      >
        <img src="../../images/Poke_ball.webp" alt="" />
      </motion.div>
    </div>
  )
}

export default Loading
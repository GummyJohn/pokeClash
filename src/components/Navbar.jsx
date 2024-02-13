import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='fixed z-40 text-[#ffcb05] py-5 px-7'>
      <button 
        onClick={() => navigate('/')}
        className='text-2xl hover:underline'
      >
        PokéClash
      </button>
      
    </div>
  )
}

export default Navbar
import React from 'react'
import { PageContext } from './Pagecontext'
import { useContext } from 'react'
import { Link } from 'react-router'
const Navbar = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext); 
  return (
    <div className=' w-full h-screen '>
        <div className='flex justify-around items-center  h-[15%] ' >
<div className=' h-[100%] w-[70%]'>
    <div className='h-[100%] flex justify-start  items-center '>

      <img src="/logo.jpg" alt=""  className=' h-[90%] rounded-full'/>
      <h1 className=' lg:text-3xl md:text-2xl sm:text-xl text-emerald-600'>
        Plan Your trip with us!!!
      </h1>
    </div>
</div>
<div>
  {currentPage === "signin" ? null : (
    <button
      onClick={() => setCurrentPage("signin")}
      className="text-white bg-black rounded-2xl p-2 h-[35%] hover:bg-slate-400 hover:text-black"
    >
      Sign In/Up
    </button>
  )}
</div>

        </div>
    </div>
  )
}

export default Navbar

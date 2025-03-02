import React from 'react'

const Navbar = () => {
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

      <button className=' text-white bg-black rounded-2xl p-2  h-[35%]  hover:bg-slate-400 hover:text-black'>
        Sign In/up
      </button>
        </div>
    </div>
  )
}

export default Navbar

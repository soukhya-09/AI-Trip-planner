import React, { useState } from 'react'
import { PageContext } from './Pagecontext'
import { useContext } from 'react'
import { Link } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
const Navbar = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext); 
  const user = JSON.parse(localStorage.getItem('user')); 
  const [isopen,setopen] = useState(true)
  const image = user?.picture ;
  const random = user?.random
  console.log(image);
  const deleteuser =()=>{
    localStorage.removeItem('user')
    window.location.reload()
  }
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
  { 
  user?(
    <div className="w-[70%] flex flex-col items-center p-4">
    <img onClick={()=>{
      setopen(!isopen)
    }} className={`p-3 rounded-full ${random===true ? " w-[50%]":""} `} src={image} alt="Profile" />
    {isopen?(<></>):(<button onClick={deleteuser} className="p-1 border-2 border-gray-400 rounded-xl mt-2">
      Logout
    </button>)}
  </div>
  

  ):
  (
    <Link to={"/signin"}>
    <button
      onClick={() => {
        
        toast("Please Login");
      }}
      className="text-white bg-black rounded-2xl p-2 h-[35%] hover:bg-slate-400 hover:text-black"
    >
      Sign In/Up
    </button>
    </Link>
  )}
</div>

        </div>
        <ToastContainer/>
    </div>
  )
}

export default Navbar

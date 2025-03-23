import React from 'react'
import { Link } from 'react-router'
import { useContext } from 'react';
import { PageContext, PageProvider } from './Pagecontext';
const Home = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext); 
  return (
    <div className=' w-full p-3 border-t-4'>
        <h1 className=' text-center text-4xl text-red-500 pb-3 font-bold'>
        Jobs fill your pockets, but adventures fill your soul.
        </h1>
      <h1 className=' tracking-wider text-3xl text-center px-16 pb-2 '>Welcome to your AI-powered travel companion! Whether you're dreaming of a relaxing getaway, an adventure-packed journey, or a budget-friendly escape, our smart trip planner has got you covered.</h1>
      <h1 className='text-2xl text-center pb-3'>
      Tell us where you want to go, and let AI craft the perfect itinerary for you! 🌍✨
      </h1>
      <div className=' w-full flex justify-center'>

   <Link to={"/planner"}>
    <button onClick={()=>{
      setCurrentPage("planner")
    }} className='  text-white bg-black rounded-2xl p-4   hover:bg-slate-400 hover:text-black'>
      Get Started, It's Free
      </button>
   </Link>  
      </div>
    </div>
  )
}

export default Home

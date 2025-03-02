import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Planner from './components/Planner';
function App() {
  return (
    <div className=" w-full h-screen">
      <div className=' w-full h-[15%]'>

      <Navbar/>
      </div>
      
      <Routes>
        <Route path='/' element={<Home/>}>

        </Route>
        <Route path='/planner' element={<Planner/>}>

      </Route>
      </Routes>
    </div>
  );
}

export default App;

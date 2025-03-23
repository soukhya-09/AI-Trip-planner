import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Planner from "./components/Planner";
import { PageProvider, PageContext } from "./components/Pagecontext";
import { useContext } from "react";
import SignIn from "./components/SignIn";

function App() {
  return (
    <PageProvider>
      <MainApp />
    </PageProvider>
  );
}

function MainApp() {
  const { currentPage } = useContext(PageContext); 

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[15%]">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/planner"
          element={ <Planner /> }
        />
        <Route
          path="/signin"
          element={ <SignIn /> }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

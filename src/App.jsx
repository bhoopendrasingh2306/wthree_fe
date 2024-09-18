import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import HeroSection from './components/HeroSection';



const App = () => {
  return (
    <>
      <div className='nav-router'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/herosection" element={<HeroSection />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;



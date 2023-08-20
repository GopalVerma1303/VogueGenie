import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';
import Login from './page/Login';
import { AiOutlineMenu } from 'react-icons/ai';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <div className=' flex justify-center items-center'>
          <img src={logo} alt="logo" className=" w-20 object-contain" />
          <p className=' -m-2 text-2xl font-bold'>Vogue<span className=' text-[#6469ff]'>Genie</span></p>
        </div>
      </Link>

      <Link to="/" className="font-inter text-black px-4 py-2 text-2xl font-extrabold rounded-md"><AiOutlineMenu /></Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatbot" element={<CreatePost />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;

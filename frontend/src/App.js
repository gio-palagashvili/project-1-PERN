import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import { UserContext } from './context/AppContext';

const App = () => {

  const [initial, setInitial] = useState({
    user: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: "",
    pages: ["Home", "Packages", "Profile"],
    currentPage: "Packages",
    isError: false,
    isLoading: false,
    userPackages: null
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ initial, setInitial }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter >
  )
}

export default App
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Blog } from "./components/Blog";
import { Nav } from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;

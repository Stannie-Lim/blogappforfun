import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Blog } from "./components/Blog";
import { SingleBlogPost } from "./components/SingleBlogPost";
import { Nav } from "./components/Nav";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SingleBlogPost />} />
        <Route path="/not_found" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

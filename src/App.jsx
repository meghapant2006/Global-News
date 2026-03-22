import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Homepage from "./pages/homepage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path='' element={<Homepage></Homepage>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar.jsx"
import Fotter from "./components/Fotter.jsx"
import Homepage from "./pages/homepage.jsx"


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='' element={<Homepage></Homepage>}></Route>
        </Routes>
        <Fotter></Fotter>
      </BrowserRouter>
    </>
  )
}

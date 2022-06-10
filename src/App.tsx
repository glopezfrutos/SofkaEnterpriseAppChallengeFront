import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/general/navbar/Navbar'
import { useSelector } from "react-redux"
import { stateType } from "./store/store"
import Inventory from "./components/inventory/Inventory"
import Providers from "./components/providers/Providers"
import Buy from "./components/buy/Buy"
import Sell from "./components/sell/Sell"
import Login from "./components/general/Login"
import Home from "./components/general/Home"


function App() {

  const logged = useSelector((state: stateType) => state.logged)

  return (
    <BrowserRouter>
      <Navbar />
      {logged ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
        </Routes> :
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Login />} />
        </Routes>}

      <footer className="navbar bg-light p-3">This is my footer</footer>
    </BrowserRouter>
  )
}

export default App

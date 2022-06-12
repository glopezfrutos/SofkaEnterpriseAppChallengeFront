import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { useSelector } from "react-redux"
import { RootState } from "./state/store"
import Inventory from "./components/inventory/Inventory"
import Providers from "./components/providers/Providers"
import Buy from "./components/buy/Buy"
import Sell from "./components/sell/Sell"
import Login from "./components/login/Login"
import Home from "./components/login/Home"
import SignIn from './components/login/SignIn'


function App() {

  const { user } = useSelector((state: RootState) => state.logged)

  return (
    <BrowserRouter>
      <Navbar />
      {user !== null ?
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
        </Routes> :
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>}

      <footer className="navbar bg-light p-3">Don Raul's Hardware Store</footer>
    </BrowserRouter>
  )
}

export default App

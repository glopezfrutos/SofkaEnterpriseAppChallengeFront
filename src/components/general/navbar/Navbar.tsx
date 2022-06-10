import LoginBtn from './LoginBtn'
import { useSelector } from "react-redux"
import { stateType } from "../../../store/store"
import { Link } from 'react-router-dom'


const Navbar = () => {

    const logged = useSelector((state: stateType) => state.logged)

    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light p-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Hi!</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={logged ? "nav-link" : "nav-link disabled"} to="/inventory">Inventory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={logged ? "nav-link" : "nav-link disabled"} to="/providers">Providers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={logged ? "nav-link" : "nav-link disabled"} to="/buy">Buy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={logged ? "nav-link" : "nav-link disabled"} to="/sell">Sell</Link>
                        </li>
                        <li className="nav-item">
                            <LoginBtn />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
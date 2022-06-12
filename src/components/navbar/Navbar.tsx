import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { logOutInReducer } from "../../state/loginSlice"
import { RootState } from '../../state/store'


const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.logged)
    const dispatch = useDispatch() 
    
    const logOut = () => {
        dispatch(logOutInReducer())
        console.log(user)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Don Raul's<br />Hardware Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={user !== null ? "nav-link" : "nav-link disabled"} to="/inventory">Inventory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={user !== null ? "nav-link" : "nav-link disabled"} to="/providers">Providers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={user !== null ? "nav-link" : "nav-link disabled"} to="/buy">Purchase order</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={user !== null ? "nav-link" : "nav-link disabled"} to="/sell">Sell</Link>
                        </li>

                        {user == null ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Log in</Link>
                            </li> :
                            <li className="nav-item">
                                <button className='btn btn-light nav-link' onClick={logOut}>Log out</button>
                            </li>
                        }
                        {user == null ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Sign in</Link>
                            </li> : ""}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
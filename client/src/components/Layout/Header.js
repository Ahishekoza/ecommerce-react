import React from "react";
import { NavLink , Link} from "react-router-dom";
import { MdShoppingBag } from 'react-icons/md'
import { useAuth} from '../../context/auth'
import SearchInput from "../Form/SearchInput";

const Header = () => {

 

  const [token,setToken] = useAuth()

  const handleLogout = () =>{
    setToken({
      ...token,
      user:null,
      token:""
    })

    localStorage.removeItem('auth')

    
  } 

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link  className="navbar-brand d-flex align-items-center" >
            <MdShoppingBag className="mx-1 fs-3"/>shop-now
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Not working in header if removed from headers it works */}
          <div className="mx-auto w-50"><SearchInput/></div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/category' className="nav-link" >
                  Category
                </NavLink>
              </li> 
              {
                !token.user ? (<>
                  <li className="nav-item">
                  <NavLink to='/register' className="nav-link" >
                    Register
                  </NavLink>
                </li>       
                <li className="nav-item">
                  <NavLink to='/login' className="nav-link" >
                    Login
                  </NavLink>
                </li>
                </>) : (<>
                    <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link"
                        >
                          Logout
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                          
                          to={`/dashboard/${token?.user?.role === 1 ? 'admin' : 'user'}`}
                          className="nav-link"
                        >
                          Dashboard
                        </NavLink>
                    </li>
                </>)
              }
              <li className="nav-item">
                <NavLink to='/cart' className="nav-link" >
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

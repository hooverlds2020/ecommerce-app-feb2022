import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles-navbars.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {

  const navigate = useNavigate()
  
  const logOut = () => {
    localStorage.setItem("token", "")
    navigate('/login')   
  } 

  return (
      <div className='container-navbar'>
          <nav className='container-nav'>
                <Link className='link' to="/shop">Productos</Link>
                <Link className='link' to="/shop">Nosotros</Link>
                <Link className='link' to="/shop">Contacto</Link>               
          </nav>
          <div className='container-cart'>              
                <Link className='size' to="/cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
                <button className='btn' onClick={logOut}> Log Out</button>
          </div>
      </div>
  )};

export default NavBar;

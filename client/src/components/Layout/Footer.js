import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='p-2 text-light footer'>
        <h4 className='text-center my-2'>
            All Rights Reserved &copy; Abhishek-Oza
        </h4>
        <p className='text-center'>
          <Link to='/about' className='Link'>
            About
          </Link>
          |
          <Link to='/policy' className='Link'>
            Policy 
          </Link>
          |
          <Link to='/contact' className='Link'>
            Contact-Us
          </Link>
          
        </p>
    </div>
  )
}


export default Footer
import React, { useState, useEffect } from 'react'
import './AdminHeader.css'
const AdminHeader = () => {
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () =>{
      setDropDown(!dropDown);
  }

  useEffect(()=>{
    const clickOutSide = (event) =>{
      if(event.target.closest('.header') === null)
        setDropDown(false);
    };

    document.addEventListener('mousedown', clickOutSide);

    return()=>{
      document.removeEventListener('mousedown', clickOutSide)
    }

  }, []);
  

  return (
    <div>
        <div className='header'>
          <h1>Quick Garage</h1>
          <div onClick={handleDropDown}>
            <p>Admin Name</p>
          </div>
          {dropDown && (
            <div className='dropdown-menu'>
              <a href='#' >Logout</a>
            </div>    
          )}
        </div>
    </div>
  )
}

export default AdminHeader

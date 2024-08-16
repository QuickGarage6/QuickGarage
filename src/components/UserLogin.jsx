import React from 'react'
import './UserLogin.css'
import { Link, Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
const UserLogin = () => {
  return (
    <div>
        <AdminHeader></AdminHeader>
        <div className='nav'>
            <ul>
                <li><Link to='user-card' >User List</Link> </li>
                <li><Link to='garage-card'>Garage List</Link></li>
            </ul>
      </div>
      <div className='body-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLogin

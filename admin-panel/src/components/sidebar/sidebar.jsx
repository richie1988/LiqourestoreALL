import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option-content">
                <img src={assets.add_icon} alt="" className="add-icon" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option-content">
                <img src={assets.order_icon} alt="" className="add-icon" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option-content">
                <img src={assets.order_icon} alt="" className="add-icon" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default sidebar
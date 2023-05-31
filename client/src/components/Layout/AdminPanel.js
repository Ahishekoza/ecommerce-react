import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminPanel = () => {

    const commonRoute = "/dashboard/admin/"

  return (
    <>
    <div className="list-group">
        <NavLink to={`${commonRoute}create-category`} className="list-group-item ">
            Create Category
        </NavLink>
        <NavLink to={`${commonRoute}create-product`} className="list-group-item list-group-item-action">Create product</NavLink>
        <NavLink to={`${commonRoute}users`} className="list-group-item list-group-item-action">Users</NavLink>
    </div>

    </>
  )
}

export default AdminPanel
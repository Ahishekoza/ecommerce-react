import React from "react";
import { NavLink } from "react-router-dom";

const UserPanel = () => {

    const commonRoute = "/dashboard/user/"

  return (
    <>
      <div className="list-group">
        <NavLink
          to={`${commonRoute}profile`}
          className="list-group-item "
        >
          Profile
        </NavLink>
        <NavLink
          to={`${commonRoute}orders`}
          className="list-group-item list-group-item-action"
        >
          Orders 
        </NavLink>
      </div>
    </>
  );
};

export default UserPanel;

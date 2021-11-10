import React from "react";
import { NavLink } from "react-router-dom";
import { sideNavItems } from "./constants";
import logo from "../../assets/images/logo.png";
import "./scss/sideNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNav = () => {
  return (
    <div className="side-nav">
      <div className="top">
        <img src={logo} alt="logo" />
        <div className="middle">
          {sideNavItems[0].map(({ icon, title, link }) => (
            <NavLink to={link}>
              <FontAwesomeIcon icon={icon} />
              <span>{title}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="bottom">
        {sideNavItems[1].map(({ icon, title }) => (
          <div>
            <FontAwesomeIcon icon={icon} />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

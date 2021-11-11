import React from "react";
import { NavLink } from "react-router-dom";
import { sideNavItems } from "./constants";
import logo from "../../assets/images/logo.png";
import "./scss/sideNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTopNav } from "../../hooks/useTopNav";

const SideNav = () => {
  const { toggleSideNav } = useTopNav();

  return (
    <div className="side-nav">
      <div className="top">
        <div className="close-nav-button">
          <span onClick={toggleSideNav}>X</span>
        </div>
        <img src={logo} alt="logo" />
        <div className="middle">
          {sideNavItems[0].map(({ icon, title, link }) => (
            <NavLink to={link} key={link}>
              <FontAwesomeIcon icon={icon} />
              <span>{title}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="bottom">
        {sideNavItems[1].map(({ icon, title }) => (
          <div key={title}>
            <FontAwesomeIcon icon={icon} />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

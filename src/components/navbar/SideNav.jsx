import React from "react";
import { NavLink } from "react-router-dom";
import { sideNavItems } from "./constants";
import logo from "../../assets/images/logo.png";
import "./scss/sideNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTopNav } from "../../hooks/useTopNav";
import { useNavigation } from "../../hooks/useNavigation";
import PromptModal from "../modal/Modal";
import { useModal } from "../../hooks/useModal";

const SideNav = () => {
  const { toggleSideNav } = useTopNav();
  const { goTo } = useNavigation();
  const { openModal, toggle } = useModal();

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
      <div className="bottom" onClick={toggle}>
        {sideNavItems[1].map(({ icon, title }) => (
          <div key={title}>
            <FontAwesomeIcon icon={icon} />
            <span>{title}</span>
          </div>
        ))}
      </div>
      <PromptModal
        isOpen={openModal}
        toggle={toggle}
        onCancel={toggle}
        body="Are you sure you want to log out?"
        onSubmit={() => {
          localStorage.removeItem("auth_token");
          toggle();
          goTo("/signin");
        }}
      />
    </div>
  );
};

export default SideNav;

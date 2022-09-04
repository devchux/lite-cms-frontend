import React from "react";

import "./scss/authTab.scss";

const AuthTab = ({ onChange, role }) => {
  return (
    <div className="auth-tab">
      <button
        className={`${role === "admin" ? "selected" : ""}`}
        onClick={() => onChange("admin")}
      >
        Admin
      </button>
      <button
        className={`${role === "member" ? "selected" : ""}`}
        onClick={() => onChange("member")}
      >
        Member
      </button>
    </div>
  );
};

export default AuthTab;

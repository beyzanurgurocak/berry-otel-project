import React from "react";
import { Row } from "reactstrap";
import * as Icon from "react-feather";
const Header = () => {
  return (
    <div className="w-100 bg-secondary p-4 text-white d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <Icon.Award size={25} />
        <h4 className="text-center">Berry Hotel</h4>
      </div>
      <div className="d-flex">
        <Icon.User size={25} />
        <strong>Beyza GÜROCAK</strong>
      </div>
    </div>
  );
};

export default Header;

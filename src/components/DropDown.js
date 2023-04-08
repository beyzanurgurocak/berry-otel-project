import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
const DropDown = ({ text, data, handleClick }) => {
  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle caret color="primary">
          {text}
        </DropdownToggle>
        <DropdownMenu dark>
          {data.map((item, index) => {
            return (
              <DropdownItem key={index} onClick={() => handleClick(item)}>
                {item.text}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default DropDown;

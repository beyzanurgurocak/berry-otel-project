import React from "react";
import { Button } from "reactstrap";

const ButtonCard = ({ text, handleClick }) => {
  return (
    <Button onClick={handleClick} color="primary">
      {text}
    </Button>
  );
};

export default ButtonCard;

import React from "react";
import ButtonMUI from "@mui/material/Button";
import "devextreme/dist/css/dx.light.css";

const MyButton = ({ text, type, onClick }) => {
  const btnType = ["contained", "outlined", "text"].includes(type)
    ? type
    : "contained";
  return (
    <ButtonMUI
      // style={{ width: "30px" }}
      className={"MyButton"}
      onClick={onClick}
      variant={btnType}
      size="small"
    >
      {text}
    </ButtonMUI>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;

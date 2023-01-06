import React from "react";

import "devextreme/dist/css/dx.light.css";
import { Button } from "devextreme-react/button";

const DevButton = ({ text, type, onClick, width }) => {
  const btnType = ["success", "danger", "default", "normal"].includes(type)
    ? type
    : "default";
  return (
    <div>
      <Button
        width={width}
        text={text}
        type={btnType}
        stylingMode="contained"
        onClick={onClick}
      />
    </div>
  );
};

DevButton.defaultProps = {
  type: "normal",
};

export default DevButton;

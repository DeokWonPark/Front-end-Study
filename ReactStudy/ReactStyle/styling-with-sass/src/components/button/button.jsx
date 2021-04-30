import React from "react";
import "./button.scss";
import classNames from "classnames";

const Button = ({ children, size, color, outline, fullWidth, ...rest }) => {
  console.log(rest);
  return (
    <button
      className={classNames("Btn", size, color, { outline, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: "meduim",
  color: "blue",
};

export default Button;

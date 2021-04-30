import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./checkBox.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CheckBox = ({ checked, children, ...rest }) => {
  return (
    <div className={cx("checkBox")}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={cx("icon")}>
          {checked ? (
            <MdCheckBox className={styles.checked} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>

      <span>{children}</span>
    </div>
  );
};

export default CheckBox;

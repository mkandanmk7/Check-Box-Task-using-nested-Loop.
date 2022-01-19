import React from "react";
import { Label } from "reactstrap";

const CheckBox = ({
  label,
  name = "",
  id,
  checked,
  onChange,
  data = {},
  forceChecked,
}) => {
  const key = name + "_" + id;
  const isChecked = () => {
    return forceChecked ? forceChecked : !!checked;
  };
  return (
    <div>
      <Label check>
        <input
          type="checkbox"
          checked={isChecked()}
          onChange={(e) => onChange(data, e)}
          data={data}
          value={id}
          name={key}
          disabled={forceChecked}
        />
        {label}
      </Label>
    </div>
  );
};

export default CheckBox;

import React from "react";
import CheckBox from "./CheckBox";

const Resource = ({ resource, onChange }) => {
  const { id, checked, index } = resource;

  const handleChange = (data, e) => {
    onChange && onChange(data, e);
  };
  return (
    <>
      <CheckBox
        label={id}
        data={{ resourceIndex: index }}
        checked={checked}
        onChange={handleChange}
        name="resource"
        id={id}
      />
    </>
  );
};

export default Resource;

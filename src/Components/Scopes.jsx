import { find } from "lodash";
import React from "react";
import { FormGroup } from "reactstrap";
import CheckBox from "./CheckBox";

const Scopes = ({
  scope,
  scopes,
  onChange,
  forceChecked,
  selectedScopeCategories = [],
}) => {
  // console.log(forceChecked);
  const { item, resourceIndex, scopeIndex } = scope;
  // console.log("item:", item);
  const { label, checked, id, value, category } = item;

  const handleChange = (data, e) => {
    onChange && onChange(data, e);
  };

  const isReadScope = () => {
    return value === "read" && selectedScopeCategories.includes(category);
  };

  const isWriteScopeChecked = () => {
    return !!find(scopes, { category, value: "write", checked: true });
  };

  const isForceChecked = () => {
    if (
      forceChecked ||
      (isReadScope() && !checked) ||
      (isReadScope() && isWriteScopeChecked())
    )
      return true;

    return false;
  };

  return (
    <div>
      <FormGroup>
        <CheckBox
          checked={checked}
          data={{ selectedScope: item, resourceIndex, scopeIndex }}
          label={label}
          id={id}
          value={value}
          name="scope"
          onChange={handleChange}
          forceChecked={isForceChecked()}
        />
      </FormGroup>
    </div>
  );
};

export default Scopes;

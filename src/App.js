import React, { useCallback, useState } from "react";
import json from "./inputJSON.json";
import "bootstrap/dist/css/bootstrap.min.css";
import FormWrapper from "./Components/FormWrapper";
import { map } from "lodash";
import Resource from "./Components/Resource";
import ScopesWrapper from "./Components/ScopesWrapper";
import Scopes from "./Components/Scopes";

const App = () => {
  const [resources, setResources] = useState(json);

  const [selectedScopeCategories, setSelectedScopeCategories] = useState([]);

  // console.log(resources);

  const resourceClickHandler = useCallback(
    (data) => {
      console.log("data ", data);
      const { resourceIndex } = data;
      const cacheResources = { ...resources };
      cacheResources[resourceIndex].checked = !resources[resourceIndex].checked;
      setResources({ ...cacheResources });
    },
    [resources]
  );

  const scopeClickHandler = () => {
    return "hi";
  };

  return (
    <>
      <FormWrapper>
        {map(resources, (resource, resourceIndex) => {
          // console.log(value);
          return (
            <div key={"Resource_key_" + resourceIndex}>
              <Resource
                resource={{ ...resource, index: resourceIndex }}
                onChange={resourceClickHandler}
              />
              {/* mapping scopes array */}
              {map(resource.scopes, (scope, scopeIndex) => {
                // console.log(scope); //object in each scopes array
                return (
                  <ScopesWrapper key={"scope_key_" + scopeIndex}>
                    <Scopes
                      scope={{
                        item: scope,
                        scopeIndex,
                        resourceIndex,
                      }}
                      scopes={resource.scopes}
                      onChange={scopeClickHandler}
                      forceChecked={resource.checked}
                      selectedScopeCategories={selectedScopeCategories}
                    />
                  </ScopesWrapper>
                );
              })}
            </div>
          );
        })}
      </FormWrapper>
    </>
  );
};

export default App;

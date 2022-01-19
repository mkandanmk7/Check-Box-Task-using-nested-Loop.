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

  //returns categories arr[];
  const getSelectedScopeCategories = () => {
    const categories = [];
    map(resources, (resource) => {
      map(resource.scopes, (scope) => {
        if (!categories.includes(scope.category) && scope.checked) {
          categories.push(scope.category);
        }
      });
    });
    console.log(categories);

    return categories;
  };
  const scopeClickHandler = useCallback(
    (data) => {
      console.log("scope data:", data);
      const { selectedScope, resourceIndex, scopeIndex } = data;
      if (!selectedScope) return;

      const cacheResources = { ...resources };

      cacheResources[resourceIndex].scopes[scopeIndex].checked =
        !selectedScope.checked;

      const scopeCategories = getSelectedScopeCategories();
      setSelectedScopeCategories(scopeCategories);
    },
    [resources]
  );

  console.log(resources);

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

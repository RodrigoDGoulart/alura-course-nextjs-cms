import React from "react";
import { get } from "lodash";

const CMSContext = React.createContext({});

export const getCmsContent = (path = "") => {
  const { cmsContent } = React.useContext(CMSContext);
  const output = path ? get(cmsContent, path) : cmsContent;

  if (!output) {
    throw new Error(`Key not found in cmsContent: "${path}"`);
  }

  return output;
};

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={cmsContent}>{children}</CMSContext.Provider>
  );
}

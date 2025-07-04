import { createContext } from "react";
export const Object3DContext = createContext({
  objectType: "database",
  setObjectType: (type: "database" | "star") => {},
}); 
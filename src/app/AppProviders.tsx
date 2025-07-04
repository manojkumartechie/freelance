"use client";
import { useState } from "react";
import { Object3DContext } from "./Object3DContext";
import CursorSparkle from "./CursorSparkle";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [objectType, setObjectType] = useState<"database" | "star">("database");
  return (
    <Object3DContext.Provider value={{ objectType, setObjectType }}>
      <CursorSparkle />
      {children}
    </Object3DContext.Provider>
  );
} 
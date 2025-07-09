"use client";
import { useState } from "react";
import { Object3DContext } from "./Object3DContext";
import EnhancedCursorEffect from "@/components/EnhancedCursorEffect";
import GSAPInitializer from "@/components/GSAPInitializer";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [objectType, setObjectType] = useState<"database" | "star">("database");
  return (
    <Object3DContext.Provider value={{ objectType, setObjectType }}>
      <GSAPInitializer />
      <EnhancedCursorEffect />
      {children}
    </Object3DContext.Provider>
  );
} 
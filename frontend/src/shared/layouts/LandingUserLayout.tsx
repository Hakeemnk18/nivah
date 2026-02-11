import { Outlet } from "react-router-dom";
import { BaseUserLayout } from "./BaseUserLayout";

export function LandingLayout() {
  return (
    <BaseUserLayout mode="landing">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </BaseUserLayout>
  );
}
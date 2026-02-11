import { Outlet } from "react-router-dom";
import { BaseUserLayout } from "./BaseUserLayout";

export function DefaultUserLayout() {
  return (
    <BaseUserLayout mode="default">
      <main className="flex-1 w-full px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>
    </BaseUserLayout>
  );
}

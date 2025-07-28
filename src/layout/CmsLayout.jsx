import React from "react";
import { Outlet } from "react-router";

export default function CmsLayout() {
  return (
    <div>
      CmsLayout
      <Outlet />
    </div>
  );
}

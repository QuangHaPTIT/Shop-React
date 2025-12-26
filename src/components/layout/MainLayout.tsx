// src/components/layout/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import { layoutConfig } from "./layout";

interface MainLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  showHeader = true,
  showFooter = true,
  showSidebar = true,
  sidebarCollapsed = false,
  onSidebarToggle,
}) => {
  const sidebarWidth = sidebarCollapsed
    ? layoutConfig.sidebar.collapsedWidth
    : layoutConfig.sidebar.width;

  const contentPaddingTop = showHeader
    ? layoutConfig.header.height + layoutConfig.content.paddingTopWithHeader
    : layoutConfig.content.padding;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && (
        <Sidebar collapsed={sidebarCollapsed} onToggle={onSidebarToggle} />
      )}

      <div
        className="flex flex-col flex-1"
        style={{
          marginLeft: showSidebar ? `${sidebarWidth}px` : "0",
          transition: `margin-left ${layoutConfig.transition.duration}ms ${layoutConfig.transition.easing}`,
        }}
      >
        {showHeader && <Header sidebarWidth={showSidebar ? sidebarWidth : 0} />}

        <main
          className="flex-1"
          style={{
            padding: `${layoutConfig.content.padding}px`,
            paddingTop: `${contentPaddingTop}px`,
          }}
        >
          <Outlet />
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;

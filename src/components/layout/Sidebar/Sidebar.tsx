import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { layoutConfig } from '../layout';
import ChevronLeftIcon from '../../icons/ChevronLeftIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import DashboardIcon from '../../icons/DashboardIcon';
import ProductsIcon from '../../icons/ProductsIcon';
import OrdersIcon from '../../icons/OrdersIcon';
import UsersIcon from '../../icons/UsersIcon';
import ReportsIcon from '../../icons/ReportsIcon';
import ShopIcon from '../../icons/ShopIcon';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <DashboardIcon className="w-5 h-5" />,
  },
  {
    path: '/products',
    label: 'Sản phẩm',
    icon: <ProductsIcon className="w-5 h-5" />,
  },
  {
    path: '/orders',
    label: 'Đơn hàng',
    icon: <OrdersIcon className="w-5 h-5" />,
  },
  {
    path: '/users',
    label: 'Người dùng',
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    path: '/reports',
    label: 'Báo cáo',
    icon: <ReportsIcon className="w-5 h-5" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const { t } = useTranslation();
  const [activePath, setActivePath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const width = collapsed 
    ? layoutConfig.sidebar.collapsedWidth 
    : layoutConfig.sidebar.width;

  const handleNavigation = (path: string) => {
    setActivePath(path);
    window.location.href = path;
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!collapsed);
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 flex flex-col"
      style={{
        width: `${width}px`,
        transition: `width ${layoutConfig.transition.duration}ms ${layoutConfig.transition.easing}`,
      }}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-lime-500)' }}
            >
              <ShopIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900"> {t('system')}</h1>
          </div>
        ) : (
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto"
            style={{ backgroundColor: 'var(--color-lime-500)' }}
          >
            <ShopIcon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: 'var(--color-lime-500)' } : {}}
                  title={collapsed ? item.label : ''}
                >
                  <span className={`shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {onToggle && (
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleToggle}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={collapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;


import React, { useState } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import Input from '../../elements/Input';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';

interface HeaderProps {
  sidebarWidth?: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      style={{
        left: `${sidebarWidth}px`,
        transition: 'left 300ms ease',
      }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1 gap-6">
          

          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <Input
              value={searchQuery}
              onChange={setSearchQuery}
              size="md"
              adornmentStart={<SearchIcon className="w-5 h-5 text-gray-400" />}
              inputProps={{
                name: 'search',
                type: 'text',
                placeholder: 'Tìm kiếm sản phẩm...',
                className: 'h-10',
                onKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleSearch(e as any);
                  }
                },
              }}
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <NotificationMenu />

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;


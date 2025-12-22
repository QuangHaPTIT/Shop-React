import React from 'react';
import { layoutConfig } from '../layout';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-t border-gray-200"
      style={{
        height: `${layoutConfig.footer.height}px`,
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="text-sm text-gray-600">
          © {currentYear} Shop React. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a
            href="/terms"
            className="hover:text-gray-900 transition-colors"
          >
            Điều khoản
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/privacy"
            className="hover:text-gray-900 transition-colors"
          >
            Chính sách
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/contact"
            className="hover:text-gray-900 transition-colors"
          >
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


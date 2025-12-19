import React from 'react';
import type { PageProps } from './Page.type';
import Card from './Card';

const Page: React.FC<PageProps> = ({
  title,
  description,
  isDefault = true,
  headerRight,
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-6 w-full ${className || ''}`}>
      <Card>
        <div className="flex text-nowrap overflow-auto justify-between items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-[28px] text-text-primary font-bold">{title}</h2>
            {description && (
              <p className="text-[16px] text-text-primary mt-1">{description}</p>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      </Card>

      {isDefault ? (
        <Card>{children}</Card>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Page;


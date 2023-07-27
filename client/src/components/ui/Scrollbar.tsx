import React, { useState } from 'react';

export const Scrollbar = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className={`w-full overflow-y-auto ${isHovering ? '' : 'scrollbar-transparent'} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  );
};

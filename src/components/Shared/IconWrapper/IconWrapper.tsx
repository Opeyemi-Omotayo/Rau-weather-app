import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  return (
    <div className='flex justify-between items-center bg-blue-400 rounded-lg p-1.5 text-white'>
      {children}
    </div>
  );
};

export default IconWrapper;

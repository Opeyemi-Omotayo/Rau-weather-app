import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <section className='flex flex-col bg-white rounded-4xl px-6 py-4 text-sm text-gray-600 min-w-[280px] xl:min-w-[300px]'>
      {children}
    </section>
  );
};

export default CardWrapper;

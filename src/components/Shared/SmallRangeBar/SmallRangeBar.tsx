import React from 'react';

interface SmallRangeBarProps {
  segmentsArr: boolean[];
}

const SmallRangeBar: React.FC<SmallRangeBarProps> = ({ segmentsArr }) => (
  <div className='flex gap-1 mt-3'>
    {segmentsArr.map((filled, i) => (
      <div
        key={i}
        className={`h-2 rounded-full ${filled ? 'bg-blue-400' : 'bg-gray-200'}`}
        style={{ flex: 1 }}
      />
    ))}
  </div>
);

export default SmallRangeBar;

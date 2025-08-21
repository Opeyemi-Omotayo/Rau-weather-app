import React from 'react';

interface SegmentedBarProps {
  value: number;
  max?: number;
  segmentsCount?: number;
  small?: boolean;
}

const segments = (value: number, segments = 5) => {
  const per = 100 / segments;
  const filled = Math.round(value / per);
  return new Array(segments).fill(0).map((_, i) => i < filled);
};

const SegmentedBar: React.FC<SegmentedBarProps> = ({
  value,
  max = 100,
  segmentsCount = 10,
  small = false,
}) => {
  const segs = segments(Math.min(Math.max(value, 0), max), segmentsCount);
  return (
    <div className={`flex gap-1 ${small ? 'mt-2' : 'mt-4'}`}>
      {segs.map((filled, i) => (
        <div
          key={i}
          className={`h-2 rounded-full ${filled ? 'bg-blue-400' : 'bg-gray-200'}`}
          style={{ flex: 1 }}
        />
      ))}
    </div>
  );
};

export default SegmentedBar;

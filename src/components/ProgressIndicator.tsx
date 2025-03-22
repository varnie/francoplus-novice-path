
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  value: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  showFraction?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const ProgressIndicator = ({
  value,
  total,
  label,
  showPercentage = true,
  showFraction = false,
  className = '',
  size = 'md',
  animated = true,
}: ProgressIndicatorProps) => {
  const [progress, setProgress] = useState(0);
  
  // Calculate percentage
  const percentage = Math.round((value / total) * 100);
  
  // Animate progress on mount or value change
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setProgress(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(percentage);
    }
  }, [percentage, animated]);
  
  // Height based on size
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="text-sm text-gray-500">
            {showPercentage && <span>{percentage}%</span>}
            {showPercentage && showFraction && <span className="mx-1">•</span>}
            {showFraction && (
              <span>
                {value}/{total}
              </span>
            )}
          </div>
        </div>
      )}
      
      <Progress
        value={progress}
        className={`rounded-full ${heights[size]} bg-gray-100`}
      />
    </div>
  );
};

export default ProgressIndicator;

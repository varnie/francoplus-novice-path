
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: 'completed' | 'available' | 'locked';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  className?: string;
}

const LessonCard = ({
  id,
  title,
  description,
  image,
  status,
  difficulty,
  duration,
  className,
}: LessonCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Set background color based on difficulty
  const difficultyColor = {
    beginner: 'border-green-200 bg-green-50',
    intermediate: 'border-blue-200 bg-blue-50',
    advanced: 'border-indigo-200 bg-indigo-50',
  }[difficulty];
  
  // Set status icon
  const StatusIcon = {
    completed: CheckCircle,
    available: PlayCircle,
    locked: Lock,
  }[status];
  
  // Set text color for status
  const statusTextColor = {
    completed: 'text-green-600',
    available: 'text-blue-600',
    locked: 'text-gray-500',
  }[status];
  
  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden lesson-card-hover transition-all duration-300",
        status === 'locked' && "opacity-75",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {status !== 'locked' ? (
        <Link to={`/learn/${id}`} className="block h-full">
          <div className="relative">
            {image ? (
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : (
              <div className={`h-40 w-full ${difficultyColor}`} />
            )}
            
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
              <StatusIcon size={14} className={statusTextColor} />
              <span className={statusTextColor}>{status === 'completed' ? 'Completed' : `${duration} min`}</span>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-primary text-sm font-medium">Start Lesson</div>
              <div className="text-gray-500 text-sm">{duration} min</div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="h-full">
          <div className="relative">
            <div className={`h-40 w-full ${difficultyColor} flex items-center justify-center`}>
              <Lock size={32} className="text-gray-400" />
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-500">{title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-gray-400 text-sm font-medium">Locked</div>
              <div className="text-gray-400 text-sm">{duration} min</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCard;

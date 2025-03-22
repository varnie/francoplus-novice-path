
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import LessonContent from '@/components/LessonContent';
import InteractiveExercise from '@/components/InteractiveExercise';
import { getLessonById } from '@/utils/lessonData';
import { Lesson } from '@/utils/lessonData';

const Learn = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    if (!lessonId) {
      navigate('/lessons');
      return;
    }
    
    // Fetch lesson data
    const timer = setTimeout(() => {
      const lessonData = getLessonById(lessonId);
      
      if (lessonData) {
        setLesson(lessonData);
      } else {
        toast.error('Lesson not found');
        navigate('/lessons');
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [lessonId, navigate]);
  
  // Reset state when lesson changes
  useEffect(() => {
    setIsLessonComplete(false);
    setShowExercises(false);
    setCurrentExerciseIndex(0);
  }, [lessonId]);
  
  const handleLessonComplete = () => {
    setIsLessonComplete(true);
    setShowExercises(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
    toast.success('Lesson content completed! Now try the exercises.');
  };
  
  const handleExerciseComplete = (success: boolean) => {
    if (success && lesson) {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        // Move to next exercise
        setTimeout(() => {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
        }, 1500);
      } else {
        // All exercises completed
        toast.success('Congratulations! You\'ve completed this lesson!');
      }
    }
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Lesson removed from bookmarks' : 'Lesson added to bookmarks');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-6 pt-28 pb-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 mb-8"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!lesson) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/lessons')}
          >
            <ChevronLeft size={16} />
            Back to Lessons
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck className="text-primary" size={20} />
            ) : (
              <Bookmark size={20} />
            )}
          </Button>
        </div>
        
        {showExercises ? (
          // Exercise View
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
              <p className="text-gray-600">Practice what you've learned</p>
            </div>
            
            {lesson.exercises.length > 0 && currentExerciseIndex < lesson.exercises.length ? (
              <InteractiveExercise
                key={lesson.exercises[currentExerciseIndex].id}
                {...lesson.exercises[currentExerciseIndex]}
                onComplete={handleExerciseComplete}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Lesson Complete!</h3>
                <p className="text-gray-600 mb-6">You've successfully completed this lesson.</p>
                <Button 
                  onClick={() => navigate('/lessons')}
                  className="rounded-full px-6"
                >
                  Back to Lessons
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Lesson Content View
          <LessonContent
            lessonId={lesson.id}
            content={lesson.content}
            onComplete={handleLessonComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Learn;

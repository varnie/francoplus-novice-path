
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, VolumeIcon, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LessonContentProps {
  lessonId: string;
  content: {
    title: string;
    sections: Array<{
      id: string;
      type: 'text' | 'audio' | 'exercise';
      content: string;
      translation?: string;
      audioUrl?: string;
    }>;
  };
  onComplete: () => void;
}

const LessonContent = ({ lessonId, content, onComplete }: LessonContentProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  
  const currentSection = content.sections[currentSectionIndex];
  const totalSections = content.sections.length;
  const progress = ((currentSectionIndex + 1) / totalSections) * 100;
  
  // Initialize audio element if the section has audio
  useEffect(() => {
    if (currentSection?.type === 'audio' && currentSection.audioUrl) {
      const audio = new Audio(currentSection.audioUrl);
      
      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress || 0);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setAudioProgress(100);
      });
      
      setAudioElement(audio);
      
      // Cleanup
      return () => {
        audio.pause();
        audio.src = '';
        setAudioElement(null);
      };
    }
    
    return () => setAudioElement(null);
  }, [currentSection]);
  
  // Handle next and previous navigation
  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowTranslation(false);
      setIsPlaying(false);
      setAudioProgress(0);
    } else {
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setShowTranslation(false);
      setIsPlaying(false);
      setAudioProgress(0);
    }
  };
  
  // Handle audio playback
  const toggleAudioPlayback = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Render section based on type
  const renderSection = () => {
    switch (currentSection?.type) {
      case 'text':
        return (
          <div className="animate-fade-in">
            <p className="text-lg mb-4">{currentSection.content}</p>
            
            {currentSection.translation && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="mb-3"
                >
                  {showTranslation ? "Hide Translation" : "Show Translation"}
                </Button>
                
                {showTranslation && (
                  <div className="p-4 bg-muted rounded-md animate-fade-in">
                    <p className="text-muted-foreground">{currentSection.translation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 'audio':
        return (
          <div className="animate-fade-in">
            <div className="p-6 bg-muted rounded-xl">
              <p className="text-lg mb-8 font-medium">{currentSection.content}</p>
              
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-16 w-16 rounded-full",
                    isPlaying && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={toggleAudioPlayback}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </Button>
                
                <div className="w-full mt-6">
                  <Progress value={audioProgress} className="h-1.5" />
                </div>
              </div>
            </div>
            
            {currentSection.translation && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="mb-3"
                >
                  {showTranslation ? "Hide Translation" : "Show Translation"}
                </Button>
                
                {showTranslation && (
                  <div className="p-4 bg-muted rounded-md animate-fade-in">
                    <p className="text-muted-foreground">{currentSection.translation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 'exercise':
        return (
          <div className="animate-fade-in">
            <div className="p-6 bg-secondary rounded-xl">
              <h3 className="text-lg font-medium mb-4">Exercise</h3>
              <p>{currentSection.content}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <Progress value={progress} className="h-1" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Section {currentSectionIndex + 1} of {totalSections}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6 mb-8 min-h-[300px]">
        {renderSection()}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          {currentSectionIndex === totalSections - 1 ? 'Complete' : 'Next'}
          {currentSectionIndex < totalSections - 1 && <ChevronRight size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default LessonContent;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon, RefreshCw, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
  correct: boolean;
}

interface InteractiveExerciseProps {
  question: string;
  questionType: 'multiple-choice' | 'fill-blank' | 'matching';
  options: ExerciseOption[];
  explanation?: string;
  audioUrl?: string;
  onComplete: (success: boolean) => void;
}

const InteractiveExercise = ({
  question,
  questionType,
  options,
  explanation,
  audioUrl,
  onComplete,
}: InteractiveExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      setAudio(audioElement);
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audioUrl]);
  
  const playAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };
  
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (!selectedOption) {
      toast.error("Please select an option first");
      return;
    }
    
    const selectedAnswer = options.find(opt => opt.id === selectedOption);
    const isAnswerCorrect = selectedAnswer?.correct || false;
    
    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
    
    if (isAnswerCorrect) {
      toast.success("Correct! Well done!");
    } else {
      toast.error("Not quite right. Try again!");
    }
    
    // Notify parent component
    onComplete(isAnswerCorrect);
  };
  
  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 animate-scale-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">{question}</h3>
          
          {audioUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={playAudio}
            >
              <Volume2 size={18} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedOption === option.id
                ? isSubmitted
                  ? option.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-primary bg-primary/5'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{option.text}</p>
                {option.translation && (
                  <p className="text-sm text-muted-foreground mt-1">{option.translation}</p>
                )}
              </div>
              
              {isSubmitted && selectedOption === option.id && (
                <div className={`rounded-full p-1 ${option.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                  {option.correct ? (
                    <CheckIcon size={16} className="text-green-600" />
                  ) : (
                    <XIcon size={16} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {isSubmitted && explanation && (
        <div className={`p-4 rounded-md mb-6 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} animate-fade-in`}>
          <p className="text-sm">{explanation}</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        {isSubmitted ? (
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Check Answer
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveExercise;

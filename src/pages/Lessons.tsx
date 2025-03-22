
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import LessonCard from '@/components/LessonCard';
import ProgressIndicator from '@/components/ProgressIndicator';
import { getAllLessons, getLessonsByDifficulty } from '@/utils/lessonData';
import { Lesson } from '@/utils/lessonData';

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<string | null>(null);
  
  // Fetch lessons (mock loading state)
  useEffect(() => {
    const timer = setTimeout(() => {
      const allLessons = getAllLessons();
      setLessons(allLessons);
      setFilteredLessons(allLessons);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter lessons when search query or difficulty changes
  useEffect(() => {
    let result = lessons;
    
    // Apply difficulty filter
    if (difficulty) {
      result = getLessonsByDifficulty(difficulty as 'beginner' | 'intermediate' | 'advanced');
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        lesson => 
          lesson.title.toLowerCase().includes(query) || 
          lesson.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredLessons(result);
  }, [searchQuery, difficulty, lessons]);
  
  // Calculate progress
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => lesson.status === 'completed').length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">French Lessons</h1>
              <p className="text-gray-600">
                Progress through our structured learning path
              </p>
            </div>
            
            <div className="glass-card py-3 px-4 rounded-full text-sm text-gray-700">
              {completedLessons} of {totalLessons} lessons completed
            </div>
          </div>
          
          <div className="mb-10">
            <ProgressIndicator
              value={completedLessons}
              total={totalLessons}
              size="lg"
              animated={false}
            />
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search lessons..."
                className="pl-10 rounded-full bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full bg-white border-gray-200 flex gap-2 items-center">
                  <Filter size={16} />
                  {difficulty ? (
                    <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                  ) : (
                    <span>Difficulty</span>
                  )}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setDifficulty(null)}>
                  All Levels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDifficulty('beginner')}>
                  Beginner
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDifficulty('intermediate')}>
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDifficulty('advanced')}>
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Lessons Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-soft p-4 animate-pulse">
                  <div className="bg-gray-200 h-40 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredLessons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  {...lesson}
                  className={`animate-scale-in animate-delay-${Math.min(index, 2) * 100}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No lessons found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setDifficulty(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lessons;

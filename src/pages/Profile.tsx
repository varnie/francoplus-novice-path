
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Award, BookOpen, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProgressIndicator from '@/components/ProgressIndicator';
import LessonCard from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllLessons, getLessonsByStatus } from '@/utils/lessonData';
import { Lesson } from '@/utils/lessonData';

const Profile = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([]);
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch lessons (mock loading state)
  useEffect(() => {
    const timer = setTimeout(() => {
      const allLessons = getAllLessons();
      setLessons(allLessons);
      setCompletedLessons(getLessonsByStatus('completed'));
      setAvailableLessons(getLessonsByStatus('available'));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate progress statistics
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  
  // Mock streak and time data
  const currentStreak = 3;
  const lastStudied = new Date();
  const totalTimeSpent = 120; // minutes
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Your Learning Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-soft">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lessons Completed</p>
                    <p className="text-2xl font-bold">{completedCount} / {totalLessons}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Progress</p>
                    <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Streak</p>
                    <p className="text-2xl font-bold">{currentStreak} days</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-soft">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Spent</p>
                    <p className="text-2xl font-bold">{totalTimeSpent} min</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="mb-16">
            <Card className="border-none shadow-soft">
              <CardHeader>
                <h2 className="text-2xl font-bold">Learning Progress</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <ProgressIndicator
                      value={getLessonsByStatus('completed').filter(l => l.difficulty === 'beginner').length}
                      total={lessons.filter(l => l.difficulty === 'beginner').length}
                      label="Beginner Lessons"
                      showPercentage
                      showFraction
                      size="lg"
                    />
                  </div>
                  
                  <div>
                    <ProgressIndicator
                      value={getLessonsByStatus('completed').filter(l => l.difficulty === 'intermediate').length}
                      total={lessons.filter(l => l.difficulty === 'intermediate').length}
                      label="Intermediate Lessons"
                      showPercentage
                      showFraction
                      size="lg"
                    />
                  </div>
                  
                  <div>
                    <ProgressIndicator
                      value={getLessonsByStatus('completed').filter(l => l.difficulty === 'advanced').length}
                      total={lessons.filter(l => l.difficulty === 'advanced').length}
                      label="Advanced Lessons"
                      showPercentage
                      showFraction
                      size="lg"
                    />
                  </div>
                  
                  <div>
                    <ProgressIndicator
                      value={completedCount}
                      total={totalLessons}
                      label="Overall Progress"
                      showPercentage
                      showFraction
                      size="lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Lessons Tabs */}
          <div>
            <Tabs defaultValue="available">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Lessons</h2>
                <TabsList className="rounded-full">
                  <TabsTrigger value="available" className="rounded-full">Available</TabsTrigger>
                  <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="available">
                {isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
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
                ) : availableLessons.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableLessons.map((lesson, index) => (
                      <LessonCard
                        key={lesson.id}
                        {...lesson}
                        className={`animate-scale-in animate-delay-${Math.min(index, 2) * 100}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No lessons available</h3>
                    <p className="text-gray-500 mb-6">You've completed all available lessons!</p>
                    <Button asChild>
                      <Link to="/lessons">Browse All Lessons</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                {isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
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
                ) : completedLessons.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {completedLessons.map((lesson, index) => (
                      <LessonCard
                        key={lesson.id}
                        {...lesson}
                        className={`animate-scale-in animate-delay-${Math.min(index, 2) * 100}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No completed lessons yet</h3>
                    <p className="text-gray-500 mb-6">Start your learning journey now!</p>
                    <Button asChild>
                      <Link to="/lessons">Start Learning</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

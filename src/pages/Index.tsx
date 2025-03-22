
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PlayCircle, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import LessonCard from '@/components/LessonCard';
import ProgressIndicator from '@/components/ProgressIndicator';
import { getLessonsByStatus } from '@/utils/lessonData';

const Index = () => {
  const [availableLessons, setAvailableLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch lessons (mock loading state)
  useEffect(() => {
    const timer = setTimeout(() => {
      const lessons = getLessonsByStatus('available');
      setAvailableLessons(lessons);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center relative pt-16">
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0" />
        
        <div className="container mx-auto px-6 py-24 z-10 relative">
          <div className="max-w-3xl">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Master French with Comprehensible Input
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                A modern approach to language learning designed for adults. Build fluency naturally through engaging content that gradually increases in complexity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/lessons">Start Learning</Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30">
                  <Link to="/learn/basics-1">Sample Lesson</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Learn with ParlFrançais</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our methodology is based on proven language acquisition research, designed specifically for adult learners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-none shadow-soft bg-white">
              <CardHeader className="flex flex-col items-center pb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Comprehensible Input</h3>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Learn through content that's just slightly above your current level, the most effective way to acquire a language naturally.</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-soft bg-white">
              <CardHeader className="flex flex-col items-center pb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <PlayCircle className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Interactive Learning</h3>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Engage with the language through audio, exercises, and real-world scenarios that make learning effective and enjoyable.</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-soft bg-white">
              <CardHeader className="flex flex-col items-center pb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BarChart2 className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Progress Tracking</h3>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Monitor your learning journey with intuitive progress indicators and spaced repetition to optimize retention.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Lessons */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Lessons</h2>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/lessons" className="flex items-center gap-2">
                View All
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableLessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  {...lesson}
                  className={`animate-scale-in animate-delay-${index * 100}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Progress Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
              <p className="text-lg text-gray-600">
                Monitor your journey as you build French fluency with our intuitive progress indicators.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6">Your Learning Journey</h3>
              
              <div className="space-y-8">
                <div>
                  <ProgressIndicator
                    value={2}
                    total={5}
                    label="Beginner Lessons"
                    showPercentage
                    showFraction
                    size="lg"
                  />
                </div>
                
                <div>
                  <ProgressIndicator
                    value={0}
                    total={3}
                    label="Intermediate Lessons"
                    showPercentage
                    showFraction
                    size="lg"
                  />
                </div>
                
                <div>
                  <ProgressIndicator
                    value={0}
                    total={5}
                    label="Advanced Lessons"
                    showPercentage
                    showFraction
                    size="lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/profile">View Full Progress</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your French Journey?</h2>
            <p className="text-xl text-white/90 mb-8">
              Jump into our structured learning path and start building your French fluency today.
            </p>
            
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link to="/lessons">Begin Learning Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">ParlFrançais</h3>
              <p className="text-gray-400 max-w-md">
                A modern approach to learning French based on comprehensible input and natural language acquisition.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Learn</h4>
                <ul className="space-y-2">
                  <li><Link to="/lessons" className="text-gray-400 hover:text-white">Lessons</Link></li>
                  <li><Link to="/profile" className="text-gray-400 hover:text-white">Progress</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} ParlFrançais. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

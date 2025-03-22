
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Learn', path: '/learn' },
    { name: 'Profile', path: '/profile' },
  ];
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 py-4 backdrop-blur-md ${
        isScrolled || !isHomepage 
          ? 'bg-white/80 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled || !isHomepage ? 'text-black' : 'text-white'}`}>
              Parl<span className="text-gradient">Français</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : (isScrolled || !isHomepage) ? 'text-gray-800' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Button className="rounded-full px-6">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${isScrolled || !isHomepage ? 'text-gray-800' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="pt-4 pb-3 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 font-medium ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Button className="w-full justify-center rounded-full mt-4">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

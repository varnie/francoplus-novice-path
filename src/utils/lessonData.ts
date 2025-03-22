
export interface Lesson {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: 'completed' | 'available' | 'locked';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
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
  exercises: Array<{
    id: string;
    question: string;
    questionType: 'multiple-choice' | 'fill-blank' | 'matching';
    options: Array<{
      id: string;
      text: string;
      translation?: string;
      correct: boolean;
    }>;
    explanation?: string;
    audioUrl?: string;
  }>;
}

// Mock data for lessons
export const lessons: Lesson[] = [
  {
    id: 'basics-1',
    title: 'Basic Greetings',
    description: 'Learn essential French greetings and introduce yourself',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    status: 'available',
    difficulty: 'beginner',
    duration: 15,
    content: {
      title: 'Basic French Greetings',
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: 'Bonjour! In this lesson, you will learn how to greet people in French and introduce yourself.',
          translation: 'Hello! In this lesson, you will learn how to greet people in French and introduce yourself.'
        },
        {
          id: 'greeting-1',
          type: 'audio',
          content: 'Bonjour. (Hello / Good day)',
          translation: 'Hello / Good day - This is the most common greeting in French, used throughout the day.',
          audioUrl: 'https://example.com/audio/bonjour.mp3' // This would be a real URL in production
        },
        {
          id: 'greeting-2',
          type: 'audio',
          content: 'Bonsoir. (Good evening)',
          translation: 'Good evening - Used in the evening, generally after 6 PM.',
          audioUrl: 'https://example.com/audio/bonsoir.mp3'
        },
        {
          id: 'greeting-3',
          type: 'audio',
          content: 'Salut! (Hi / Bye)',
          translation: 'Hi / Bye - A casual greeting used among friends and young people.',
          audioUrl: 'https://example.com/audio/salut.mp3'
        },
        {
          id: 'intro-1',
          type: 'audio',
          content: 'Je m\'appelle [name]. (My name is [name])',
          translation: 'My name is [name] - The standard way to introduce yourself.',
          audioUrl: 'https://example.com/audio/je-mappelle.mp3'
        },
        {
          id: 'practice',
          type: 'exercise',
          content: 'Time to practice! Choose the correct translation for each greeting.'
        }
      ]
    },
    exercises: [
      {
        id: 'ex-1',
        question: 'What does "Bonjour" mean?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: 'Good night', translation: 'Bonne nuit', correct: false },
          { id: 'b', text: 'Hello / Good day', translation: 'Bonjour', correct: true },
          { id: 'c', text: 'Goodbye', translation: 'Au revoir', correct: false },
          { id: 'd', text: 'See you later', translation: 'À plus tard', correct: false }
        ],
        explanation: '"Bonjour" is the standard French greeting used during the day.',
        audioUrl: 'https://example.com/audio/bonjour.mp3'
      },
      {
        id: 'ex-2',
        question: 'How do you say "My name is John" in French?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: 'Je m\'appelle John', translation: 'My name is John', correct: true },
          { id: 'b', text: 'J\'ai John', translation: 'I have John', correct: false },
          { id: 'c', text: 'Mon nom est John', translation: 'My name is John (more formal)', correct: false },
          { id: 'd', text: 'Je suis John', translation: 'I am John', correct: false }
        ],
        explanation: '"Je m\'appelle..." is the standard way to introduce yourself in French.'
      }
    ]
  },
  {
    id: 'basics-2',
    title: 'Common Phrases',
    description: 'Essential everyday phrases to navigate basic conversations',
    image: 'https://images.unsplash.com/photo-1602513445803-d0f6dad8f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    status: 'available',
    difficulty: 'beginner',
    duration: 20,
    content: {
      title: 'Essential Everyday French Phrases',
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: 'In this lesson, you'll learn key phrases that will help you navigate everyday situations.',
          translation: 'In this lesson, you'll learn key phrases that will help you navigate everyday situations.'
        },
        {
          id: 'phrase-1',
          type: 'audio',
          content: 'Comment ça va? (How are you?)',
          translation: 'How are you? - A common way to ask someone how they are doing.',
          audioUrl: 'https://example.com/audio/comment-ca-va.mp3'
        },
        {
          id: 'phrase-2',
          type: 'audio',
          content: 'Ça va bien, merci. (I'm doing well, thank you.)',
          translation: 'I'm doing well, thank you. - A standard response to "Comment ça va?"',
          audioUrl: 'https://example.com/audio/ca-va-bien.mp3'
        },
        {
          id: 'phrase-3',
          type: 'audio',
          content: 'S'il vous plaît. (Please. - formal)',
          translation: 'Please. - Used in formal situations or with people you don't know well.',
          audioUrl: 'https://example.com/audio/sil-vous-plait.mp3'
        },
        {
          id: 'phrase-4',
          type: 'audio',
          content: 'Merci beaucoup. (Thank you very much.)',
          translation: 'Thank you very much. - A more emphatic way of saying "Thank you."',
          audioUrl: 'https://example.com/audio/merci-beaucoup.mp3'
        },
        {
          id: 'practice',
          type: 'exercise',
          content: 'Time to practice! Match the phrases with their correct meanings.'
        }
      ]
    },
    exercises: [
      {
        id: 'ex-1',
        question: 'What does "Comment ça va?" mean?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: 'What is your name?', translation: 'Comment tu t\'appelles?', correct: false },
          { id: 'b', text: 'How are you?', translation: 'Comment ça va?', correct: true },
          { id: 'c', text: 'Where are you going?', translation: 'Où vas-tu?', correct: false },
          { id: 'd', text: 'How old are you?', translation: 'Quel âge as-tu?', correct: false }
        ],
        explanation: '"Comment ça va?" is how you ask someone how they are doing.',
        audioUrl: 'https://example.com/audio/comment-ca-va.mp3'
      },
      {
        id: 'ex-2',
        question: 'How do you say "Thank you very much" in French?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: 'Je vous en prie', translation: 'You\'re welcome (formal)', correct: false },
          { id: 'b', text: 'S\'il vous plaît', translation: 'Please (formal)', correct: false },
          { id: 'c', text: 'Merci beaucoup', translation: 'Thank you very much', correct: true },
          { id: 'd', text: 'De rien', translation: 'You\'re welcome (informal)', correct: false }
        ],
        explanation: '"Merci beaucoup" is how you say "Thank you very much" in French.'
      }
    ]
  },
  {
    id: 'basics-3',
    title: 'Numbers & Counting',
    description: 'Learn to count and use numbers in everyday situations',
    image: 'https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    status: 'locked',
    difficulty: 'beginner',
    duration: 25,
    content: {
      title: 'French Numbers and Counting',
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: 'In this lesson, you will learn numbers in French and how to count.',
          translation: 'In this lesson, you will learn numbers in French and how to count.'
        }
      ]
    },
    exercises: []
  },
  {
    id: 'intermediate-1',
    title: 'Restaurant Conversations',
    description: 'Order food, make reservations, and navigate restaurant situations',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    status: 'locked',
    difficulty: 'intermediate',
    duration: 30,
    content: {
      title: 'French for Restaurants',
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: 'In this lesson, you will learn how to communicate effectively in restaurants and cafés.',
          translation: 'In this lesson, you will learn how to communicate effectively in restaurants and cafés.'
        }
      ]
    },
    exercises: []
  },
  {
    id: 'advanced-1',
    title: 'Cultural Nuances',
    description: 'Understand subtle cultural references and idiomatic expressions',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    status: 'locked',
    difficulty: 'advanced',
    duration: 40,
    content: {
      title: 'French Cultural Expressions and Idioms',
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: 'In this advanced lesson, you will explore cultural nuances and idiomatic expressions.',
          translation: 'In this advanced lesson, you will explore cultural nuances and idiomatic expressions.'
        }
      ]
    },
    exercises: []
  }
];

// Function to get a specific lesson by ID
export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};

// Function to get all lessons
export const getAllLessons = (): Lesson[] => {
  return lessons;
};

// Function to get lessons by status
export const getLessonsByStatus = (status: 'completed' | 'available' | 'locked'): Lesson[] => {
  return lessons.filter(lesson => lesson.status === status);
};

// Function to get lessons by difficulty
export const getLessonsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Lesson[] => {
  return lessons.filter(lesson => lesson.difficulty === difficulty);
};

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Показываем кнопку, если прокручено больше чем на 300px
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        // Скрываем кнопку в противном случае
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            y: [0, -8, 0],
            boxShadow: [
              '0 0 0 rgba(59, 130, 246, 0.4)', // Синее свечение (ring-blue-500 с прозрачностью)
              '0 0 8px rgba(59, 130, 246, 0.6)', // Ярче свечение
              '0 0 0 rgba(59, 130, 246, 0.4)', // Снова тусклое
            ],
          }}
          exit={{ opacity: 0, scale: 0.5, boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }}
          transition={{
            duration: 0.2,
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            boxShadow: {
              duration: 1.5, // Длительность цикла свечения
              repeat: Infinity, // Бесконечное повторение
              ease: "easeInOut" // Плавность анимации
            }
          }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '1.5rem', // Эквивалент bottom-6 в Tailwind (1rem = 16px, 6*4px = 24px = 1.5rem)
            right: '1.5rem',   // Эквивалент right-6
            width: '3rem',     // Фиксированная ширина (48px)
            height: '3rem',    // Фиксированная высота (48px) для круглой формы
            padding: '0.75rem', // Эквивалент p-3 (3*4px = 12px = 0.75rem)
            border: '1px solid',
            borderColor: '#d1d5db', // lightgray-300
          }}
          className="bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 
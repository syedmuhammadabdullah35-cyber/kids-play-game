import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowLeft } from 'lucide-react';

interface ColorSplashProps {
  onComplete: () => void;
  onBack: () => void;
}

const COLORS = [
  { name: 'Red', hex: 'bg-red-500', text: 'text-red-600', border: 'border-red-200' },
  { name: 'Blue', hex: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
  { name: 'Green', hex: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
  { name: 'Yellow', hex: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-200' },
  { name: 'Purple', hex: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
];

export default function ColorSplash({ onComplete, onBack }: ColorSplashProps) {
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  const [options, setOptions] = useState(COLORS);
  const [score, setScore] = useState(0);
  // Fixed typo here: useSlale -> useState
  const [isCorrect, setIsCorrect] = useState(false); 
  const [wrongColor, setWrongColor] = useState<string | null>(null);

  const pickNewColor = useCallback(() => {
    const newTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(newTarget);
    setOptions([...COLORS].sort(() => Math.random() - 0.5));
    // Fixed typo here: setIsTscorrect -> setIsCorrect
    setIsCorrect(false); 
    setWrongColor(null);
  }, []);

  useEffect(() => {
    pickNewColor();
  }, [pickNewColor]);

  const handleSelect = (color: typeof COLORS[0]) => {
    if (isCorrect) return;

    if (color.name === targetColor.name) {
      setIsCorrect(true);
      const newScore = score + 1;
      setScore(newScore);
      
      setTimeout(() => {
        if (newScore < 5) {
          pickNewColor();
        } else {
          onComplete();
        }
      }, 1200);
    } else {
      setWrongColor(color.name);
      setTimeout(() => setWrongColor(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50 overflow-hidden">
      <div className="fixed top-6 left-6 flex gap-4 z-20">
        <button onClick={onBack} className="bg-white p-4 rounded-2xl shadow-lg text-green-600 hover:scale-110 active:scale-95 transition-transform border-b-4 border-green-100">
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          key={targetColor.name}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-green-800 mb-6"
        >
          Tap the <span className={targetColor.text}>{targetColor.name}</span> Circle!
        </motion.h2>
        
        <div className="flex gap-3 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                scale: i === score ? 1.2 : 1,
                backgroundColor: i < score ? '#22c55e' : '#bbf7d0'
              }}
              className="w-5 h-5 rounded-full shadow-sm" 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-3xl relative z-10">
        {options.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={wrongColor === color.name ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            onClick={() => handleSelect(color)}
            className={`w-32 h-32 md:w-44 md:h-44 rounded-full shadow-2xl border-8 border-white transition-all relative ${color.hex} ${
              isCorrect && color.name === targetColor.name ? 'ring-8 ring-green-400 ring-offset-4' : ''
            } ${wrongColor === color.name ? 'opacity-50' : ''}`}
          >
            {isCorrect && color.name === targetColor.name && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                className="absolute inset-0 bg-white rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isCorrect && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <div className="bg-white/95 p-16 rounded-[5rem] shadow-2xl border-8 border-green-400 text-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="text-9xl mb-6"
              >
                🎨
              </motion.div>
              <h3 className="text-6xl font-bold text-green-600">Colorful!</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

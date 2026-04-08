import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowLeft } from 'lucide-react';

interface LetterMatchProps {
  onComplete: () => void;
  onBack: () => void;
}

const LETTERS = [
  { char: 'A', word: 'Apple', icon: '🍎' },
  { char: 'B', word: 'Ball', icon: '⚽' },
  { char: 'C', word: 'Cat', icon: '🐱' },
  { char: 'D', word: 'Dog', icon: '🐶' },
  { char: 'E', word: 'Egg', icon: '🥚' },
];

export default function LetterMatch({ onComplete, onBack }: LetterMatchProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [wrongChar, setWrongChar] = useState<string | null>(null);

  const currentLetter = LETTERS[currentIdx];

  const generateOptions = useCallback(() => {
    const otherLetters = LETTERS.filter(l => l.char !== currentLetter.char)
      .map(l => l.char)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    const allOptions = [...otherLetters, currentLetter.char].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setIsCorrect(false);
    setWrongChar(null);
  }, [currentLetter.char]);

  useEffect(() => {
    generateOptions();
  }, [generateOptions]);

  const handleSelect = (char: string) => {
    if (isCorrect) return;

    if (char === currentLetter.char) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentIdx < LETTERS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setWrongChar(char);
      setTimeout(() => setWrongChar(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-pink-50 overflow-hidden">
      <div className="fixed top-6 left-6 flex gap-4 z-20">
        <button onClick={onBack} className="bg-white p-4 rounded-2xl shadow-lg text-pink-600 hover:scale-110 active:scale-95 transition-transform border-b-4 border-pink-100">
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-pink-600 mb-4"
        >
          Find the Letter!
        </motion.h2>
        <div className="flex gap-3 justify-center">
          {LETTERS.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                scale: i === currentIdx ? 1.2 : 1,
                backgroundColor: i <= currentIdx ? '#ec4899' : '#fbcfe8'
              }}
              className="w-5 h-5 rounded-full shadow-sm" 
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentLetter.char}
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex flex-col items-center"
          >
            <div className="text-[12rem] leading-none mb-6 filter drop-shadow-2xl animate-float">
              {currentLetter.icon}
            </div>
            <div className="text-5xl font-bold text-pink-800 bg-white px-10 py-3 rounded-[2rem] shadow-xl border-4 border-pink-100">
              {currentLetter.word}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-8">
          {options.map((char) => (
            <motion.button
              key={`${currentIdx}-${char}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={wrongChar === char ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              onClick={() => handleSelect(char)}
              disabled={isCorrect}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] text-6xl font-bold flex items-center justify-center shadow-xl border-b-8 transition-all
                ${isCorrect && char === currentLetter.char 
                  ? 'bg-green-400 border-green-600 text-white' 
                  : wrongChar === char
                    ? 'bg-red-100 border-red-300 text-red-500'
                    : 'bg-white border-pink-200 text-pink-600 hover:bg-pink-50'
                }`}
            >
              {isCorrect && char === currentLetter.char ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={80} strokeWidth={4} />
                </motion.div>
              ) : char}
            </motion.button>
          ))}
        </div>
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
                animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-9xl mb-6"
              >
                🌟
              </motion.div>
              <h3 className="text-6xl font-bold text-green-600">Great Job!</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

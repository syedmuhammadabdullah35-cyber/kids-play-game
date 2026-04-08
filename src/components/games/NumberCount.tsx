import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface NumberCountProps {
  onComplete: () => void;
  onBack: () => void;
}

const CHALLENGES = [
  { target: 3, icon: '🦁', color: 'bg-orange-50', accent: 'text-orange-600', border: 'border-orange-200' },
  { target: 5, icon: '🐘', color: 'bg-blue-50', accent: 'text-blue-600', border: 'border-blue-200' },
  { target: 2, icon: '🦒', color: 'bg-yellow-50', accent: 'text-yellow-600', border: 'border-yellow-200' },
  { target: 4, icon: '🐵', color: 'bg-amber-50', accent: 'text-amber-600', border: 'border-amber-200' },
];

export default function NumberCount({ onComplete, onBack }: NumberCountProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  const challenge = CHALLENGES[currentIdx];

  const handleTap = (index: number) => {
    if (isCorrect || tappedIndices.includes(index)) return;
    
    const newCount = count + 1;
    setCount(newCount);
    setTappedIndices(prev => [...prev, index]);
    
    if (newCount === challenge.target) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentIdx < CHALLENGES.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setCount(0);
          setTappedIndices([]);
          setIsCorrect(false);
        } else {
          onComplete();
        }
      }, 1500);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-700 ${challenge.color} overflow-hidden`}>
      <div className="fixed top-6 left-6 flex gap-4 z-20">
        <button onClick={onBack} className="bg-white p-4 rounded-2xl shadow-lg text-blue-600 hover:scale-110 active:scale-95 transition-transform border-b-4 border-blue-100">
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          key={`title-${currentIdx}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl md:text-5xl font-bold ${challenge.accent} mb-6`}
        >
          Tap {challenge.target} Animals!
        </motion.h2>
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`text-7xl font-bold ${challenge.accent} bg-white w-32 h-32 flex items-center justify-center rounded-[2.5rem] mx-auto shadow-xl border-4 ${challenge.border}`}
        >
          {count}
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl relative z-10">
        {Array.from({ length: challenge.target + 2 }).map((_, i) => (
          <motion.button
            key={`${currentIdx}-${i}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleTap(i)}
            disabled={tappedIndices.includes(i)}
            className={`text-9xl p-6 rounded-[3rem] transition-all duration-300 relative ${
              tappedIndices.includes(i) 
                ? 'bg-white shadow-2xl scale-110 rotate-6 border-4 border-white' 
                : 'bg-white/40 opacity-60 grayscale-[0.5]'
            }`}
          >
            {challenge.icon}
            {tappedIndices.includes(i) && (
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
            <div className="bg-white/95 p-16 rounded-[5rem] shadow-2xl border-8 border-blue-400 text-center">
              <motion.div 
                animate={{ y: [0, -40, 0], scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-9xl mb-6"
              >
                🎈
              </motion.div>
              <h3 className="text-6xl font-bold text-blue-600">You Counted!</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

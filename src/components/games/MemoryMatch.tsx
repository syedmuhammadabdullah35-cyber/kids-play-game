import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Brain } from 'lucide-react';

interface MemoryMatchProps {
  onComplete: () => void;
  onBack: () => void;
}

const ICONS = ['🍎', '⚽', '🐱', '🐶', '🥚', '🦁', '🐘', '🦒'];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch({ onComplete, onBack }: MemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index: number) => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [first, second] = newFlipped;

      if (cards[first].icon === cards[second].icon) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsProcessing(false);

          if (matchedCards.every(c => c.isMatched)) {
            setTimeout(onComplete, 1000);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-purple-50 overflow-hidden">
      <div className="fixed top-6 left-6 flex gap-4 z-20">
        <button onClick={onBack} className="bg-white p-4 rounded-2xl shadow-lg text-purple-600 hover:scale-110 active:scale-95 transition-transform border-b-4 border-purple-100">
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="text-center mb-8 relative z-10">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-purple-600 mb-2"
        >
          Memory Match!
        </motion.h2>
        <p className="text-xl text-purple-500 font-medium">Find all the pairs!</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl w-full relative z-10">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
            onClick={() => handleCardClick(index)}
            className="aspect-square relative perspective-1000"
          >
            <motion.div
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              className="w-full h-full relative transform-style-3d"
            >
              {/* Front (Hidden) */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-b-4 border-purple-200 flex items-center justify-center backface-hidden">
                <div className="text-4xl text-purple-200">❓</div>
              </div>
              
              {/* Back (Icon) */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-b-4 border-purple-400 flex items-center justify-center backface-hidden rotate-y-180">
                <div className={`text-5xl ${card.isMatched ? 'opacity-50' : ''}`}>
                  {card.icon}
                </div>
                {card.isMatched && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-green-500"
                  >
                    <div className="bg-white/80 rounded-full p-2">
                      <Brain size={32} />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}

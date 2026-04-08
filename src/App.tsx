import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 
import Home from './components/Home';
import StickerBook from './components/StickerBook';
import LetterMatch from './components/games/LetterMatch';
import NumberCount from './components/games/NumberCount';
import ShapeSort from './components/games/ShapeSort';
import ColorSplash from './components/games/ColorSplash';
import MemoryMatch from './components/games/MemoryMatch';
import Confetti from './components/Confetti';
import { GameState, GameType } from './types';
import { STICKERS } from './constants';

export default function App() {
  const [state, setState] = useState<GameState>({
    currentScreen: 'home',
    stars: 0,
    unlockedStickers: [],
  });

  const [showReward, setShowReward] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastUnlockedSticker, setLastUnlockedSticker] = useState<string | null>(null);

  const handleSelectGame = useCallback((type: GameType) => {
    setState(prev => ({ ...prev, currentScreen: 'game', currentGame: type }));
  }, []);

  const handleBackToHome = useCallback(() => {
    setState(prev => ({ ...prev, currentScreen: 'home', currentGame: undefined }));
  }, []);

  const handleGameComplete = useCallback(() => {
    const newStars = state.stars + 10;
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    let newUnlockedStickers = [...state.unlockedStickers];
    let newlyUnlocked: string | null = null;
    
    if (newStars % 20 === 0) {
      const lockedStickers = STICKERS.filter(s => !newUnlockedStickers.includes(s.id));
      if (lockedStickers.length > 0) {
        newlyUnlocked = lockedStickers[0].id;
        newUnlockedStickers.push(newlyUnlocked);
      }
    }

    setState(prev => ({
      ...prev,
      stars: newStars,
      unlockedStickers: newUnlockedStickers,
    }));

    if (newlyUnlocked) {
      setLastUnlockedSticker(newlyUnlocked);
      setShowReward(true);
      setTimeout(() => {
        setShowReward(false);
        setLastUnlockedSticker(null);
        handleBackToHome();
      }, 3500);
    } else {
      setTimeout(handleBackToHome, 1500);
    }
  }, [state.stars, state.unlockedStickers, handleBackToHome]);

  const renderGame = () => {
    switch (state.currentGame) {
      case 'letters': return <LetterMatch onComplete={handleGameComplete} onBack={handleBackToHome} />;
      case 'numbers': return <NumberCount onComplete={handleGameComplete} onBack={handleBackToHome} />;
      case 'shapes': return <ShapeSort onComplete={handleGameComplete} onBack={handleBackToHome} />;
      case 'colors': return <ColorSplash onComplete={handleGameComplete} onBack={handleBackToHome} />;
      case 'memory': return <MemoryMatch onComplete={handleGameComplete} onBack={handleBackToHome} />;
      default: return null;
    }
  };

  return (
    /* FIXED: Changed h-screen to min-h-screen and overflow-hidden to overflow-y-auto */
    <div className="relative w-full min-h-screen overflow-y-auto font-sans bg-sky-50 pb-10">
      <AnimatePresence mode="wait">
        {state.currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            /* FIXED: Removed h-full to allow natural height */
            className="w-full"
          >
            <Home 
              onSelectGame={handleSelectGame} 
              onOpenStickers={() => setState(prev => ({ ...prev, currentScreen: 'stickers' }))}
              stars={state.stars}
            />
          </motion.div>
        )}

        {state.currentScreen === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full min-h-screen"
          >
            {renderGame()}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.currentScreen === 'stickers' && (
          <StickerBook 
            onClose={() => setState(prev => ({ ...prev, currentScreen: 'home' }))}
            unlockedStickers={state.unlockedStickers}
          />
        )}
      </AnimatePresence>

      {showConfetti && <Confetti />}

      <AnimatePresence>
        {showReward && lastUnlockedSticker && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 10 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-sky-900/40 backdrop-blur-md p-6"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-white rounded-[4rem] p-12 text-center shadow-2xl border-8 border-yellow-400 max-w-md w-full relative"
            >
              <div className="absolute -top-12 -left-12 text-6xl animate-bounce">✨</div>
              <div className="absolute -bottom-12 -right-12 text-6xl animate-bounce delay-150">✨</div>
              <div className="text-[10rem] mb-6 filter drop-shadow-lg">
                {STICKERS.find(s => s.id === lastUnlockedSticker)?.icon}
              </div>
              <h2 className="text-4xl font-bold text-yellow-600 mb-2">Amazing!</h2>
              <p className="text-xl text-slate-600 font-bold">
                You got the {STICKERS.find(s => s.id === lastUnlockedSticker)?.name}!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

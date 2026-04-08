import React from 'react';
import { motion } from 'motion/react';
import { LEVELS } from '../constants';
import { GameType } from '../types';
import * as Icons from 'lucide-react';

interface HomeProps {
  onSelectGame: (type: GameType) => void;
  onOpenStickers: () => void;
  stars: number;
}

export default function Home({ onSelectGame, onOpenStickers, stars }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-sky-100 to-white">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" 
      />
      
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-sky-600 mb-2 drop-shadow-[0_4px_0_rgba(2,132,199,0.2)]">
          Kids Play Game
        </h1>
        <p className="text-2xl text-sky-800 font-bold tracking-wide">Let's learn and play!</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl relative z-10">
        {LEVELS.map((level, index) => {
          const IconComponent = (Icons as any)[level.icon];
          return (
            <motion.button
              key={level.id}
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                type: 'spring', 
                stiffness: 260, 
                damping: 20 
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95, y: 5 }}
              onClick={() => onSelectGame(level.type)}
              className={`game-button ${level.color} border-black/10 text-white group`}
            >
              <motion.div 
                className="bg-white/20 p-6 rounded-[2rem] mb-4 group-hover:bg-white/30 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                <IconComponent size={56} strokeWidth={2.5} />
              </motion.div>
              <span className="text-2xl font-bold drop-shadow-sm">{level.title}</span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>

      <motion.div 
        className="mt-16 flex flex-wrap justify-center gap-6 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenStickers}
          className="bg-white text-sky-600 px-10 py-5 rounded-[2rem] font-bold text-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 border-4 border-sky-100"
        >
          <Icons.BookOpen size={32} className="text-sky-500" />
          Sticker Book
        </motion.button>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-400 text-yellow-900 px-10 py-5 rounded-[2rem] font-bold text-2xl shadow-xl flex items-center gap-4 border-4 border-yellow-200"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Icons.Star size={32} fill="currentColor" className="text-yellow-700" />
          </motion.div>
          {stars} Stars
        </motion.div>
      </motion.div>

      {/* Character Pip */}
      <motion.div 
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-40 h-40 pointer-events-none z-20"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-8xl filter drop-shadow-lg">🐧</div>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute -top-12 -left-12 bg-white p-4 rounded-3xl rounded-bl-none shadow-xl text-lg font-bold text-slate-700 w-32 border-4 border-sky-100"
          >
            Let's play!
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

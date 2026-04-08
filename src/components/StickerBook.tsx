import React from 'react';
import { motion } from 'motion/react';
import { STICKERS } from '../constants';
import { X, Trophy } from 'lucide-react';

interface StickerBookProps {
  onClose: () => void;
  unlockedStickers: string[];
}

export default function StickerBook({ onClose, unlockedStickers }: StickerBookProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-sky-500/95 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border-8 border-sky-300"
      >
        <div className="p-8 bg-sky-100 flex justify-between items-center border-b-4 border-sky-200">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-3 rounded-2xl shadow-inner">
              <Trophy size={32} className="text-yellow-800" />
            </div>
            <h2 className="text-4xl font-bold text-sky-800">My Sticker Book</h2>
          </div>
          <button 
            onClick={onClose}
            className="bg-red-400 text-white p-3 rounded-2xl hover:bg-red-500 transition-colors shadow-lg"
          >
            <X size={32} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {STICKERS.map((sticker) => {
              const isUnlocked = unlockedStickers.includes(sticker.id);
              return (
                <motion.div
                  key={sticker.id}
                  whileHover={isUnlocked ? { scale: 1.1, rotate: 5 } : {}}
                  className={`aspect-square rounded-3xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                    isUnlocked 
                      ? 'bg-white shadow-xl border-4 border-yellow-200' 
                      : 'bg-slate-100 opacity-40 border-4 border-dashed border-slate-300'
                  }`}
                >
                  <div className="text-6xl mb-2 filter drop-shadow-sm">
                    {isUnlocked ? sticker.icon : '❓'}
                  </div>
                  <span className={`text-sm font-bold text-center ${isUnlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                    {isUnlocked ? sticker.name : 'Locked'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-sky-50 text-center">
          <p className="text-sky-700 font-bold">
            Play more games to unlock all {STICKERS.length} stickers!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

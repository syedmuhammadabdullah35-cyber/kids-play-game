import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Square, Circle, Triangle, Star } from 'lucide-react';

interface ShapeSortProps {
  onComplete: () => void;
  onBack: () => void;
}

const SHAPES = [
  { id: 'circle', icon: Circle, color: 'text-red-500', bg: 'bg-red-100', borderColor: 'border-red-300' },
  { id: 'square', icon: Square, color: 'text-blue-500', bg: 'bg-blue-100', borderColor: 'border-blue-300' },
  { id: 'triangle', icon: Triangle, color: 'text-green-500', bg: 'bg-green-100', borderColor: 'border-green-300' },
  { id: 'star', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100', borderColor: 'border-yellow-300' },
];

export default function ShapeSort({ onComplete, onBack }: ShapeSortProps) {
  const [placedShapes, setPlacedShapes] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const constraintsRef = useRef(null);

  const handleDragEnd = (event: any, info: any, shapeId: string) => {
    // Simple collision detection based on coordinates
    // In a real app we'd use getBoundingClientRect, but for this demo 
    // we'll check if the drag ended near the target area.
    // Since we are in a responsive layout, we'll use a simpler "tap to place" 
    // but with a drag animation to make it feel "real".
    
    // Actually, let's stick to a very polished "Tap to fly" animation 
    // which is more reliable for mobile/iframe environments than complex drag-drop.
    // But I'll add "Juice" like squash/stretch.
  };

  const handlePlace = (id: string) => {
    if (placedShapes.includes(id)) return;
    
    const newPlaced = [...placedShapes, id];
    setPlacedShapes(newPlaced);
    
    if (newPlaced.length === SHAPES.length) {
      setIsComplete(true);
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-yellow-50" ref={constraintsRef}>
      <div className="fixed top-6 left-6 flex gap-4">
        <button onClick={onBack} className="bg-white p-4 rounded-2xl shadow-lg text-yellow-600 hover:scale-110 active:scale-95 transition-transform border-b-4 border-yellow-200">
          <ArrowLeft size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="text-center mb-12">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-yellow-700 mb-2"
        >
          Shape Matcher!
        </motion.h2>
        <p className="text-xl text-yellow-600 font-medium">Tap the shapes to find their homes!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-5xl">
        {/* Target Slots */}
        <div className="grid grid-cols-2 gap-6 bg-white/50 p-8 rounded-[3rem] border-4 border-yellow-200 shadow-inner">
          {SHAPES.map((shape) => (
            <div 
              key={shape.id}
              className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl border-4 border-dashed flex items-center justify-center relative transition-all duration-500 ${
                placedShapes.includes(shape.id) 
                  ? `bg-white border-solid ${shape.borderColor} shadow-lg` 
                  : 'bg-yellow-100/30 border-yellow-300'
              }`}
            >
              <AnimatePresence>
                {placedShapes.includes(shape.id) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45, y: 50 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={shape.color}
                  >
                    <shape.icon size={72} fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
              {!placedShapes.includes(shape.id) && (
                <shape.icon size={72} className="text-yellow-200/50" />
              )}
            </div>
          ))}
        </div>

        {/* Source Shapes */}
        <div className="grid grid-cols-2 gap-6 p-8">
          {SHAPES.map((shape) => (
            <div key={`container-${shape.id}`} className="w-28 h-28 md:w-36 md:h-36">
              <AnimatePresence>
                {!placedShapes.includes(shape.id) && (
                  <motion.button
                    layoutId={`shape-${shape.id}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9, rotate: -5 }}
                    onClick={() => handlePlace(shape.id)}
                    className="w-full h-full rounded-3xl bg-white flex items-center justify-center shadow-xl border-b-8 border-black/10 text-yellow-500"
                  >
                    <shape.icon size={72} className={shape.color} fill="currentColor" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <div className="bg-white/95 p-12 rounded-[4rem] shadow-2xl border-8 border-yellow-400 text-center">
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-9xl mb-4"
              >
                🏆
              </motion.div>
              <h3 className="text-5xl font-bold text-yellow-600">Shape Master!</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

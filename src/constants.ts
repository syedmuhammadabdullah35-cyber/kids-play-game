import { GameLevel, Sticker } from './types';

export const LEVELS: GameLevel[] = [
  { id: 1, title: 'ABC Match', icon: 'Type', color: 'bg-pink-400', type: 'letters' },
  { id: 2, title: '123 Count', icon: 'Hash', color: 'bg-blue-400', type: 'numbers' },
  { id: 3, title: 'Shape Sort', icon: 'Shapes', color: 'bg-yellow-400', type: 'shapes' },
  { id: 4, title: 'Color Splash', icon: 'Palette', color: 'bg-green-400', type: 'colors' },
  { id: 5, title: 'Memory Match', icon: 'Brain', color: 'bg-purple-400', type: 'memory' },
];

export const STICKERS: Sticker[] = [
  { id: 's1', name: 'Happy Star', icon: '⭐', unlocked: false },
  { id: 's2', name: 'Cool Penguin', icon: '🐧', unlocked: false },
  { id: 's3', name: 'Yummy Apple', icon: '🍎', unlocked: false },
  { id: 's4', name: 'Fast Rocket', icon: '🚀', unlocked: false },
  { id: 's5', name: 'Magic Wand', icon: '🪄', unlocked: false },
  { id: 's6', name: 'Cute Cat', icon: '🐱', unlocked: false },
  { id: 's7', name: 'Bright Sun', icon: '☀️', unlocked: false },
  { id: 's8', name: 'Blue Whale', icon: '🐳', unlocked: false },
];

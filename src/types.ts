export type GameType = 'letters' | 'numbers' | 'shapes' | 'colors' | 'memory';

export interface Sticker {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

export interface GameState {
  currentScreen: 'home' | 'game' | 'stickers';
  currentGame?: GameType;
  stars: number;
  unlockedStickers: string[];
}

export interface GameLevel {
  id: number;
  title: string;
  icon: string;
  color: string;
  type: GameType;
}

export type Item = {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-3
  quantity: number; // 0-3
};

export type Effect = {
  id: string;
  name: string;
  description: string;

  uses: number; // Usually 0-1
  maxUses: number; // Usually 1

  effect: string; // TODO: Turn this into a type that gets processed by the game
};

export type Person = {
  id: string;
  name: string;
  description: string;
  attitude: number; // -3 to 3
};

export type Faction = {
  id: string;
  name: string;
  description: string;
  attitude: number; // -3 to 3
  friends: string[];
  rivals: string[];
  clocks: Clock[];
};

export type Clock = {
  name: string;
  description: string;
  ticks: number;
  segments: number;
};

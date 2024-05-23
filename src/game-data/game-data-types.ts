export type Effect = {
  id: string;
  name: string;
  description: string;
  effect: string; // TODO: Turn this into a type that gets processed by the game
  uses: number; // Usually 0-1
  maxUses: number; // Usually 1
};

export type SpecialAbility = Effect & {};

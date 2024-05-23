import { Effect } from './game-data-types';

export type Harm = {
  level: number; // 0-4
  description: string;
  effect: Effect;
  healed: boolean;
};

export class PlayBook {
  book: {};
  choices: {
    crew: string;

    name: string;
    alias: string;
    look: string;
    heritage: string;
    background: string;

    vice: string;
    vicePurveyor: string;

    stress: number; // 0-9
    maxStress: number;

    trauma: Effect[];
    maxTrauma: number;
  };
}

export class CutterPlayBook extends PlayBook {}
export class HoundPlayBook extends PlayBook {}
export class LeechPlayBook extends PlayBook {}
export class SlidePlayBook extends PlayBook {}
export class SpiderPlayBook extends PlayBook {}
export class WhisperPlayBook extends PlayBook {}
export class LurkPlayBook extends PlayBook {}
export class GhostPlayBook extends PlayBook {}
export class HullPlayBook extends PlayBook {}
export class VampirePlayBook extends PlayBook {}

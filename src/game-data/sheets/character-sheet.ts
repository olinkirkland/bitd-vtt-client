import { Effect } from '../game-data-types';
import Sheet from './sheet';

export type Harm = {
  level: number; // 0-4
  description: string;
  effect: Effect;
  healed: boolean;
};

export class Character extends Sheet {
  book: PlayBook;

  choices: {
    crew: string;

    name: string;
    alias: string;
    look: string;
    heritage: string;
    heritageDescription: string;
    background: string;
    backgroundDescription: string;

    vice: string;
    vicePurveyor: string;

    stress: number; // 0-9
    maxStress: number;

    trauma: Effect[];
    maxTrauma: number;
  };

  constructor(book: PlayBook) {
    super();

    this.sheetType = 'character';
    this.book = book;
    this.choices = getDefaultChoices();
  }
}

export interface PlayBook {
  name: string;
  description: string;
  specialAbilities: Effect[];
  contacts: string[];
  standardItems: string[];
  bookItems: string[];
}

export class Cutter implements PlayBook {
  name: string = 'Cutter';
  description: string = 'A dangerous and intimidating fighter';
  specialAbilities: Effect[] = [];
  contacts: string[] = [];
  standardItems: string[] = [];
  bookItems: string[] = [];
}

export interface Hound extends PlayBook {}
export interface Leech extends PlayBook {}
export interface Slide extends PlayBook {}
export interface Spider extends PlayBook {}
export interface Whisper extends PlayBook {}
export interface Lurk extends PlayBook {}
export interface Ghost extends PlayBook {}
export interface Hull extends PlayBook {}
export interface Vampire extends PlayBook {}

function getDefaultChoices() {
  return {
    crew: '',

    name: '',
    alias: '',
    look: '',
    heritage: '',
    heritageDescription: '',
    background: '',
    backgroundDescription: '',

    vice: '',
    vicePurveyor: '',

    stress: 0,
    maxStress: 9,

    trauma: [],
    maxTrauma: 4
  };
}

import { Effectable, Person } from '../game-data-types';
import Sheet from './sheet';

export type Harm = {
  level: number; // 0-4
  description: string;
};

export class Character extends Sheet {
  ui: { [key: string]: boolean } = {};

  name: string = 'Unnamed Character';
  description: string = '';
  crewId: string = '';
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
  trauma: Effectable[];
  maxTrauma: number;

  characterType: string = '';
  characterTypeDescription: string = '';

  constructor() {
    super();
  }

  getTags(): string[] {
    return [];
  }
}

export class Cutter extends Character {
  constructor() {
    super();
    this.name = 'Cutter';
    this.description = 'A dangerous and intimidating fighter';
    this.specialAbilities = [];
    this.contacts = [];
    this.standardItems = [];
    this.uniqueItems = [];
  }
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

export function createCharacterTemplates() {
  return [];
}

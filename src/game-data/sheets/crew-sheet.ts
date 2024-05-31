import { Effect } from '../game-data-types';
import Sheet from './sheet';

export type Claim = Effect & {
  position: { x: number; y: number };
  prerequisites: string[]; // IDs of other claims, which must be owned first
};

export type Upgrade = Effect & {
  upgradeType: 'book' | 'lair' | 'quality' | 'training' | 'cohorts';
};

export class Crew extends Sheet {
  book: CrewBook;

  choices: {
    name: string;
    reputationType: string;
    lair: string;

    reputation: number; // 0-6
    turf: number; // 0-6
    hold: 'weak' | 'strong';
    tier: number; // 0-4

    heat: number; // 0-9
    wantedLevel: number; // 0-4

    coin: number; // 0-4
    vaults: number; // 0-12

    experiencePoints: number; // 0-10
    contacts: string[];
  };

  constructor(book: CrewBook) {
    super();

    this.sheetType = 'crew';
    this.book = book;
    this.choices = getDefaultChoices();
  }
}

export interface CrewBook {
  name: string;
  description: string;
  specialAbilities: Effect[];
  contacts: Effect[];
  upgrades: Effect[];
  claims: Claim[];
}

export class Assassins implements CrewBook {
  name: string = 'Assassins';
  description: string = 'Murderers for hire';
  specialAbilities: Effect[] = [];
  contacts: Effect[] = [];
  upgrades: Effect[] = [];
  claims: Claim[] = [];
}

export class Bravos implements CrewBook {
  name: string = 'Bravos';
  description: string = 'Mercenaries, thugs, & killers';
  specialAbilities: Effect[] = [];
  contacts: Effect[] = [];
  upgrades: Effect[] = [];
  claims: Claim[] = [];
}

export class Cult implements CrewBook {
  name: string = 'Cult';
  description: string = 'Acolytes of a deity';
  specialAbilities: Effect[] = [];
  contacts: Effect[] = [];
  upgrades: Effect[] = [];
  claims: Claim[] = [];
}

export class Hawkers implements CrewBook {
  name: 'Hawkers';
  description: 'Vice dealers';
  specialAbilities: Effect[] = [];
  contacts: Effect[] = [];
  upgrades: Effect[] = [];
  claims: Claim[] = [];
}

export class Shadows implements CrewBook {
  name: 'Shadows';
  description: 'Thieves, spies, and saboteurs';
  specialAbilities: Effect[] = [];
  contacts: Effect[] = [];
  upgrades: Effect[] = [];
  claims: Claim[] = [];
}

function getDefaultChoices() {
  return {
    name: '',
    reputationType: '',
    lair: '',
    reputation: 0,
    turf: 0,
    hold: 'weak' as 'weak' | 'strong',
    tier: 0,
    heat: 0,
    wantedLevel: 0,
    coin: 0,
    vaults: 0,
    experiencePoints: 0,
    contacts: [] as string[]
  };
}

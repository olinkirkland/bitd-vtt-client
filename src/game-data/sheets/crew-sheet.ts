import { Effectable, Person } from '../game-data-types';
import Sheet from './sheet';

export type Claim = Effectable & {
  position: { x: number; y: number };
  prerequisites: string[]; // IDs of other claims, which must be owned first
};

export type Upgrade = Effectable & {
  upgradeType: 'book' | 'lair' | 'quality' | 'training' | 'cohorts';
};

export class Crew extends Sheet {
  name: string = 'Untitled Crew';
  reputationType: string = 'Ambitious'; // Ambitious, Brutal, Daring, Honorable, Professional, Savvy, Subtle, or Strange
  lair: string = 'An abandoned warehouse';
  lairDistrict: string = "Crow's Foot";
  huntingGroundsDistrict: string = "Crow's Foot";

  reputation: number = 0; // 0-6
  turf: number = 0; // 0-6
  hold: 'weak' | 'strong' = 'strong';
  tier: number = 0; // 0-4

  heat: number = 0; // 0-9
  wantedLevel: number = 0; // 0-4

  coin: number = 0; // 0-4
  vaults: number = 0; // 0-12

  crewExperience: number = 0; // 0-10

  constructor() {
    super();
    this.sheetType = 'crew';
  }
}

interface CrewBook {
  crewType: string;
  crewTypeDescription: string;
  specialAbilities: Effectable[];
  contacts: Person[];
  upgrades: Effectable[];
  claims: Claim[];
}

export class Assassins extends Crew implements CrewBook {
  crewType: string = 'Assassins';
  crewTypeDescription: string = 'Murderers for hire';
  specialAbilities: Effectable[] = [
    {
      id: 'assassins-deadly',
      name: 'Deadly',
      description:
        'Each PC may add +1 action rating to Hunt, Prowl, or Skirmish (up to a max rating of 3).',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-crows-veil',
      name: "Crow's Veil",
      description:
        "Due to hard-won experience or occult ritual, your activities are hidden from the notice of the death-seeker crows. You don't take extra heat when killing is involved on a score.",
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-emberdeath',
      name: 'Emberdeath',
      description:
        "Due to hard-won experience or occult ritual, you know the arcane method to destroy a living victim's spirit at the moment you kill them. Take 3 stress to channel electroplasmic energy from the ghost field to disintegrate the spirit and dead body in a shower of sparking embers.",
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-no-traces',
      name: 'No Traces',
      description:
        'When you keep an operation quiet or make it look like an accident, you get half the rep value of the target (round up) instead of zero. When you end downtime with zero heat, take +1 rep.',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-patron',
      name: 'Patron',
      description:
        'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-predators',
      name: 'Predators',
      description:
        'When you use stealth or subterfuge to commit murder, take +1d to the engagement roll.',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-vipers',
      name: 'Vipers',
      description:
        'When you acquire or craft poisons, you get +1 result level to your roll. When you employ a poison, you are specially prepared to be immune to its effects.',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'assassins-veteran',
      name: 'Veteran',
      description: 'Choose a special ability from another crew.',
      quantity: 0,
      maxQuantity: 3
    }
  ];

  contacts: Person[] = [];
  upgrades: Effectable[] = [];
  claims: Claim[] = [];
}

export class Bravos extends Crew implements CrewBook {
  crewType: string = 'Bravos';
  crewTypeDescription: string = 'Mercenaries, thugs, & killers';
  specialAbilities: Effectable[] = [];
  contacts: Person[] = [];
  upgrades: Effectable[] = [];
  claims: Claim[] = [];
}

export class Cult extends Crew implements CrewBook {
  crewType: string = 'Cult';
  crewTypeDescription: string = 'Acolytes of a deity';
  specialAbilities: Effectable[] = [];
  contacts: Person[] = [];
  upgrades: Effectable[] = [];
  claims: Claim[] = [];
}

export class Hawkers extends Crew implements CrewBook {
  crewType: 'Hawkers';
  crewTypeDescription: 'Vice dealers';
  specialAbilities: Effectable[] = [];
  contacts: Person[] = [];
  upgrades: Effectable[] = [];
  claims: Claim[] = [];
}

export class Shadows extends Crew implements CrewBook {
  crewType: 'Shadows';
  crewTypeDescription: 'Thieves, spies, and saboteurs';
  specialAbilities: Effectable[] = [];
  contacts: Person[] = [];
  upgrades: Effectable[] = [];
  claims: Claim[] = [];
}

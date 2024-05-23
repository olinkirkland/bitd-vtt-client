import { Effect, SpecialAbility } from '../game-data-types';

export type Claim = Effect & {
  position: { x: number; y: number };
  prerequisites: string[]; // IDs of other claims, which must be owned first
};

export type Upgrade = Effect & {
  upgradeType: 'book' | 'lair' | 'quality' | 'training' | 'cohorts';
};

export class CrewBook {
  book: {
    name: string;
    description: string;
    specialAbilities: SpecialAbility[];
    contacts: string[];
    upgrades: Upgrade[];
    claims: Claim[];
  };

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
    chosenContacts: string[];
  };
}

export class AssassinCrewBook extends CrewBook {}
export class BravoCrewBook extends CrewBook {}
export class CultCrewBook extends CrewBook {}
export class HawkerCrewBook extends CrewBook {}
export class ShadowCrewBook extends CrewBook {}

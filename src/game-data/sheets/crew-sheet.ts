import { useGameStore } from '@/stores/game-store';
import { Effectable, Person } from '../game-data-types';
import Sheet from './sheet';

export type Claim = Effectable & {
  position: { x: number; y: number };
  prerequisites: string[]; // IDs of other claims, which must be owned first
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

  // This is modified by the specific crew type
  crewType: string = '';
  crewTypeDescription: string = '';
  specialAbilities: Effectable[] = [];
  image: string = 'e52f27b1-e5f6-42de-9889-c2d9aeeb3b0d';
  contacts: Person[] = [];
  crewUpgrades: Effectable[] = [];
  lairUpgrades: Effectable[] = [
    {
      id: 'carriage-house',
      name: 'Carriage',
      description: '',
      quantity: 0,
      maxQuantity: 2
    },
    {
      id: 'boat-house',
      name: 'Boat',
      description: '',
      quantity: 0,
      maxQuantity: 2
    },
    {
      id: 'hidden-lair',
      name: 'Hidden',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'quarters',
      name: 'Quarters',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'secure-lair',
      name: 'Secure',
      description: '',
      quantity: 0,
      maxQuantity: 2
    },
    {
      id: 'vault',
      name: 'Vault',
      description: '',
      quantity: 0,
      maxQuantity: 2
    },
    {
      id: 'workshop',
      name: 'Workshop',
      description: '',
      quantity: 0,
      maxQuantity: 1
    }
  ];
  trainingUpgrades: Effectable[] = [
    {
      id: 'insight',
      name: 'Insight',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'prowess',
      name: 'Prowess',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'resolve',
      name: 'Resolve',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'personal',
      name: 'Personal',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'mastery',
      name: 'Mastery',
      description: '',
      quantity: 0,
      maxQuantity: 4
    }
  ];
  qualityUpgrades: Effectable[] = [
    {
      id: 'documents',
      name: 'Documents',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'gear',
      name: 'Gear',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'implements',
      name: 'Implements',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'supplies',
      name: 'Supplies',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'tools',
      name: 'Tools',
      description: '',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'weapons',
      name: 'Weapons',
      description: '',
      quantity: 0,
      maxQuantity: 1
    }
  ];
  claims: Claim[] = [];

  constructor() {
    super();
    this.sheetType = 'crew';
  }

  applyUpgradesDescriptionsFromCodex() {
    const descriptions =
      useGameStore().game?.codex.sheets.crew['upgrade-descriptions'];

    // Crew Upgrades
    this.crewUpgrades.forEach((upgrade: Effectable) => {
      const upgradeDescription = descriptions?.crew?.[upgrade.id];
      if (upgradeDescription) upgrade.description = upgradeDescription;
      else if (!upgrade.description)
        upgrade.description = 'no description found for ' + upgrade.id;
    });

    // Lair Upgrades
    this.lairUpgrades.forEach((upgrade: Effectable) => {
      const upgradeDescription = descriptions.lair[upgrade.id];
      if (upgradeDescription) upgrade.description = upgradeDescription;
      else if (!upgrade.description)
        upgrade.description = 'no description found for ' + upgrade.id;
    });

    // Training Upgrades
    this.trainingUpgrades.forEach((upgrade: Effectable) => {
      const upgradeDescription = descriptions.training[upgrade.id];
      if (upgradeDescription) upgrade.description = upgradeDescription;
      else if (!upgrade.description)
        upgrade.description = 'no description found for ' + upgrade.id;
    });

    // Quality Upgrades
    this.qualityUpgrades.forEach((upgrade: Effectable) => {
      const upgradeDescription = descriptions.quality[upgrade.id];
      if (upgradeDescription) upgrade.description = upgradeDescription;
      else if (!upgrade.description)
        upgrade.description = 'no description found for ' + upgrade.id;
    });
  }
}

export class Assassins extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Assassins';
    this.crewType = 'Assassins';
    this.crewTypeDescription = 'Murderers for hire';
    this.image = 'e52f27b1-e5f6-42de-9889-c2d9aeeb3b0d';
    this.specialAbilities = [
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
    this.crewUpgrades = [
      {
        id: 'assassin-rigging',
        name: 'Assassin Rigging',
        description: '2 free load of weapons or gear.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ironhook-contacts',
        name: 'Ironhook Contacts',
        description: '+1 Tier in prison.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-skulks',
        name: 'Elite Skulks',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-thugs',
        name: 'Elite Thugs',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'hardened',
        name: 'Hardened',
        description: '+1 trauma box.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.contacts = [
      {
        id: 'assassins-trev',
        name: 'Trev',
        description: 'A gang boss',
        attitude: 0
      },
      {
        id: 'assassins-contact-lydra',
        name: 'Lydra',
        description: 'A deal broker',
        attitude: 0
      },
      {
        id: 'assassins-contact-irimina',
        name: 'Irimina',
        description: 'A vicious noble',
        attitude: 0
      },
      {
        id: 'assassins-contact-karlos',
        name: 'Karlos',
        description: 'A bounty hunter',
        attitude: 0
      },
      {
        id: 'assassins-contact-exeter',
        name: 'Exeter',
        description: 'A spirit warden',
        attitude: 0
      },
      {
        id: 'assassins-contact-sevoy',
        name: 'Sevoy',
        description: 'A merchant lord',
        attitude: 0
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();

    this.claims = [
      {
        id: 'assassins-training-room',
        name: 'Training Room',
        description: '+1 scale for your Skulks cohorts',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-vice-den',
        name: 'Vice Den',
        description: '(Tier roll) - Heat = coin in downtime',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-fixer',
        name: 'Fixer',
        description: '+2 coin for lower-class targets',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-informants',
        name: 'Informants',
        description: '+1d gather info for scores',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-hagfish-farm',
        name: 'Hagfish Farm',
        description: 'Body disposal, +1d to reduce heat after killing',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-victim-trophies',
        name: 'Victim Trophies',
        description: '+1 rep per score',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-turf-1',
        name: 'Turf',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-lair',
        name: 'Lair',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 1,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-turf-2',
        name: 'Turf',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-cover-operation',
        name: 'Cover Operation',
        description: '-2 heat per score',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-protection-racket',
        name: 'Protection Racket',
        description: '(Tier roll) - Heat = coin in downtime',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-infirmary',
        name: 'Infirmary',
        description: '+1d to healing rolls',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-envoy',
        name: 'Envoy',
        description: '+2 coin for high-class targets',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-cover-identities',
        name: 'Cover Identities',
        description: '+1d engagement for deception and social plans',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: 'assassins-city-records',
        name: 'City Records',
        description: '+1d engagement for stealth plans',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];
  }
}

export class Bravos extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Bravos';
    this.crewType = 'Bravos';
    this.crewTypeDescription = 'Mercenaries, thugs, & killers';
    this.image = 'ab9c33a6-2710-41ff-a814-edf6b648af54';
    this.specialAbilities = [
      {
        id: 'dangerous',
        name: 'Dangerous',
        description:
          'Each PC may add +1 action rating to Hunt, Skirmish, or Wreck (up to a max rating of 3).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'blood-brothers',
        name: 'Blood Brothers',
        description:
          "When you fight alongside your cohorts in combat, they get +1d for teamwork rolls (setup and group actions). All of your cohorts get the Thugs type for free (if they're already Thugs, add another type).",
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'door-kickers',
        name: 'Door Kickers',
        description:
          'When you execute an assault plan, take +1d to the engagement roll.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'fiends',
        name: 'Fiends',
        description:
          'Fear is as good as respect. You may count each wanted level as if it was turf.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'forged-in-the-fire',
        name: 'Forged in the Fire',
        description:
          'Each PC has been toughened by cruel experience. You get +1d to resistance rolls.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'patron',
        name: 'Patron',
        description:
          'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'war-dogs',
        name: 'War Dogs',
        description:
          'When you’re at war (-3 faction status), your crew does not suffer -1 hold and PCs still get two downtime activities, instead of just one.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'veteran',
        name: 'Veteran',
        description: 'Choose a special ability from another crew.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.crewUpgrades = [
      {
        id: 'bravos-rigging',
        name: 'Bravos Rigging',
        description: '2 free load of weapons or armor.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-skulks',
        name: 'Elite Skulks',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-thugs',
        name: 'Elite Thugs',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'hardened',
        name: 'Hardened',
        description: '+1 trauma box.',
        quantity: 0,
        maxQuantity: 3
      },
      {
        id: 'ironhook-contacts',
        name: 'Ironhook Contacts',
        description: '+1 Tier in prison.',
        quantity: 0,
        maxQuantity: 1
      }
    ];
    this.contacts = [
      {
        id: 'bravos-contact-meg',
        name: 'Meg',
        description: 'A pit-fighter',
        attitude: 0
      },
      {
        id: 'bravos-contact-conway',
        name: 'Conway',
        description: 'A bluecoat',
        attitude: 0
      },
      {
        id: 'bravos-contact-keller',
        name: 'Keller',
        description: 'A blacksmith',
        attitude: 0
      },
      {
        id: 'bravos-contact-tomas',
        name: 'Tomas',
        description: 'A physicker',
        attitude: 0
      },
      {
        id: 'bravos-contact-walker',
        name: 'Walker',
        description: 'A ward boss',
        attitude: 0
      },
      {
        id: 'bravos-contact-lutes',
        name: 'Lutes',
        description: 'A tavern owner',
        attitude: 0
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();

    this.claims = [
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];
  }
}

export class Cult extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Cult';
    this.crewType = 'Cult';
    this.crewTypeDescription = 'Acolytes of a deity';
    this.image = '7544b3a4-0e4d-4758-9870-cd5b8f7774cb';
    this.specialAbilities = [
      {
        id: 'chosen',
        name: 'Chosen',
        description:
          'Each PC may add +1 action rating to Attune, Study, or Sway (up to a max rating of 3).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'anointed',
        name: 'Anointed',
        description:
          'You get +1d to resistance rolls against supernatural threats. You get +1d to healing rolls when you have supernatural harm.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'bound-in-darkness',
        name: 'Bound in Darkness',
        description:
          'You may use teamwork with any cult member, regardless of the distance separating you. By taking 1 stress, your whispered message is heard by every cultist.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'conviction',
        name: 'Conviction',
        description:
          "Each PC gains an additional Vice: Worship. When you indulge this vice and bring a pleasing sacrifice, you don't overindulge if you clear excess stress. In addition, your deity will assist any one action roll you make—from now until you indulge this vice again.",
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'glory-incarnate',
        name: 'Glory Incarnate',
        description:
          'Your deity sometimes manifests in the physical world. This can be a great boon, but the priorities and values of a god are not those of mortals. You have been warned.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'sealed-in-blood',
        name: 'Sealed in Blood',
        description:
          'Each human sacrifice yields -3 stress cost for any ritual you perform.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'zealotry',
        name: 'Zealotry',
        description:
          'Your cohorts have abandoned their reason to devote themselves to the cult. They will undertake any service, no matter how dangerous or strange. They gain +1d to rolls against enemies of the faith.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'veteran',
        name: 'Veteran',
        description: 'Choose a special ability from another crew.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.crewUpgrades = [
      {
        id: 'cult-rigging',
        name: 'Cult Rigging',
        description: '2 free load of documents or implements.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ritual-sanctum-in-lair',
        name: 'Ritual Sanctum in Lair',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-adepts',
        name: 'Elite Adepts',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-thugs',
        name: 'Elite Thugs',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ordained',
        name: 'Ordained',
        description: '+1 trauma box.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.contacts = [
      {
        id: 'cult-contact-gagan',
        name: 'Gagan',
        description: 'An academic',
        attitude: 0
      },
      {
        id: 'cult-contact-adikin',
        name: 'Adikin',
        description: 'An occultist',
        attitude: 0
      },
      {
        id: 'cult-contact-hutchins',
        name: 'Hutchins',
        description: 'An antiquarian',
        attitude: 0
      },
      {
        id: 'cult-contact-moriya',
        name: 'Moriya',
        description: 'A spirit trafficker',
        attitude: 0
      },
      {
        id: 'cult-contact-mateas-kline',
        name: 'Mateas Kline',
        description: 'A noble',
        attitude: 0
      },
      {
        id: 'cult-bennett',
        name: 'Bennett',
        description: 'An astronomer',
        attitude: 0
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();

    this.claims = [
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];
  }
}

export class Hawkers extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Hawkers';
    this.crewType = 'Hawkers';
    this.crewTypeDescription = 'Vice dealers';
    this.image = '13867125-73d8-4399-a550-db499a4eedfe';
    this.specialAbilities = [
      {
        id: 'silver-tongues',
        name: 'Silver Tongues',
        description:
          'Each PC may add +1 action rating to Command, Consort, or Sway (up to a max rating of 3).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'accord',
        name: 'Accord',
        description:
          'Sometimes friends are as good as territory. You may count up to three +3 faction statuses you hold as if they are turf.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'the-good-stuff',
        name: 'The Good Stuff',
        description:
          'Your merchandise is exquisite. The product quality is equal to your Tier+2. When you deal with a crew or faction, the GM will tell you who among them is hooked on your product (one, a few, many, or all).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ghost-market',
        name: 'Ghost Market',
        description:
          'Through arcane ritual or hard-won experience, you have discovered how to prepare your product for sale to ghosts and/or demons. They do not pay in coin. What do they pay with?',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'high-society',
        name: 'High Society',
        description:
          "It's all about who you know. Take -1 heat during downtime and +1d to gather info about the city's elite.",
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'hooked',
        name: 'Hooked',
        description:
          'Your gang members use your product. Add the savage, unreliable, or wild flaw to your gangs to give them +1 quality.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'patron',
        name: 'Patron',
        description:
          'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'veteran',
        name: 'Veteran',
        description: 'Choose a special ability from another crew.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.crewUpgrades = [
      {
        id: 'hawkers-rigging',
        name: 'Hawkers Rigging',
        description: '1 carried item is concealed and has no load',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ironhook-contacts',
        name: 'Ironhook Contacts',
        description: '+1 Tier in prison.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-rooks',
        name: 'Elite Rooks',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-thugs',
        name: 'Elite Thugs',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'composed',
        name: 'Composed',
        description: '+1 stress box.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.contacts = [
      {
        id: 'hawkers-contact-rolan-wott',
        name: 'Rolan Wott',
        description: 'A magistrate',
        attitude: 0
      },
      {
        id: 'hawkers-contact-laroze',
        name: 'Laroze',
        description: 'A bluecoat',
        attitude: 0
      },
      {
        id: 'hawkers-contact-lydra',
        name: 'Lydra',
        description: 'A deal broker',
        attitude: 0
      },
      {
        id: 'hawkers-contact-hoxley',
        name: 'Hoxley',
        description: 'A smuggler',
        attitude: 0
      },
      {
        id: 'hawkers-contact-anya',
        name: 'Anya',
        description: 'A dilettante',
        attitude: 0
      },
      {
        id: 'hawkers-contact-marlo',
        name: 'Marlo',
        description: 'A gang boss',
        attitude: 0
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();

    this.claims = [
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];
  }
}

export class Shadows extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Shadows';
    this.crewType = 'Shadows';
    this.crewTypeDescription = 'Thieves, spies, and saboteurs';
    this.image = 'bbc1bf16-dc4d-4e97-a898-0bf9e688d327';
    this.specialAbilities = [
      {
        id: 'everyone-steals',
        name: 'Everyone Steals',
        description:
          'Each PC may add +1 action rating to Prowl, Finesse, or Tinker (up to a max rating of 3).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ghost-echoes',
        name: 'Ghost Echoes',
        description:
          'From weird experience or occult ritual, all crew members gain the ability to see and interact with the ghostly structures, streets, and objects within the echo of Doskvol that exists in the ghost field.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'pack-rats',
        name: 'Pack Rats',
        description:
          'Your lair is a jumble of stolen items. When you roll to acquire an asset, take +1d.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'patron',
        name: 'Patron',
        description:
          'When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'second-story',
        name: 'Second Story',
        description:
          'When you execute a clandestine infiltration, you get +1d to the engagement roll.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'slippery',
        name: 'Slippery',
        description:
          'When you roll entanglements, roll twice and keep the one you want. When you reduce heat on the crew, take +1d.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'synchronized',
        name: 'Synchronized',
        description:
          'When you perform a group action, you may count multiple 6s from different rolls as a critical success.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'veteran',
        name: 'Veteran',
        description: 'Choose a special ability from another crew.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.crewUpgrades = [
      {
        id: 'thief-rigging',
        name: 'Thief Rigging',
        description: '2 free load of tools or gear.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'underground-maps-and-passkeys',
        name: 'Underground Maps and Passkeys',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-rooks',
        name: 'Elite Rooks',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-skulks',
        name: 'Elite Skulks',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'steady',
        name: 'Steady',
        description: '+1 stress box.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.contacts = [
      {
        id: 'shadows-contact-dowler',
        name: 'Dowler',
        description: 'An explorer',
        attitude: 0
      },
      {
        id: 'shadows-contact-laroze',
        name: 'Laroze',
        description: 'A bluecoat',
        attitude: 0
      },
      {
        id: 'shadows-contact-amancio',
        name: 'Amancio',
        description: 'A deal broker',
        attitude: 0
      },
      {
        id: 'shadows-contact-fitz',
        name: 'Fitz',
        description: 'A collector',
        attitude: 0
      },
      {
        id: 'shadows-contact-adelaide-phroaig',
        name: 'Adelaide Phroaig',
        description: 'A noble',
        attitude: 0
      },
      {
        id: 'shadows-contact-rigney',
        name: 'Rigney',
        description: 'A tavern owner',
        attitude: 0
      }
    ];

    this.claims = [
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();
  }
}

export class Smugglers extends Crew {
  constructor() {
    super();

    this.name = 'Untitled Smugglers';
    this.crewType = 'Smugglers';
    this.crewTypeDescription = 'Suppliers of illicit goods';
    this.image = 'de509b5c-f37c-4975-9768-5e123d24e19b';
    this.specialAbilities = [
      {
        id: 'like-part-of-the-family',
        name: 'Like Part of the Family',
        description:
          'Create one of your vehicles as a cohort (use the vehicle edges and flaws, below). Its quality is equal to your Tier +1.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'all-hands',
        name: 'All Hands',
        description:
          'During downtime, one of your cohorts may perform a downtime activity for the crew to acquire an asset, reduce heat, or work on a long-term project.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'ghost-passage',
        name: 'Ghost Passage',
        description:
          'From harsh experience or occult ritual, all crew members become immune to possession by spirits, but may choose to "carry" a second ghost as a passenger within their body.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'just-passing-through',
        name: 'Just Passing Through',
        description:
          'During downtime, take -1 heat. When your heat is 4 or less, you get +1d to deceive people when you pass yourselves off as ordinary citizens.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'leverage',
        name: 'Leverage',
        description:
          'Your crew supplies contraband for other factions. Your success is good for them. Whenever you gain rep, gain +1 rep.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'reavers',
        name: 'Reavers',
        description:
          'When you go into conflict aboard a vehicle, you gain +1 effect for vehicle damage and speed. Your vehicle gains armor.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'renegades',
        name: 'Renegades',
        description:
          'Each PC may add +1 action rating to Finesse, Prowl, or Skirmish (up to a max rating of 3).',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'veteran',
        name: 'Veteran',
        description: 'Choose a special ability from another crew.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.crewUpgrades = [
      {
        id: 'smugglers-rigging',
        name: 'Smugglers Rigging',
        description: '2 items carried are perfectly concealed.',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'camoflage',
        name: 'Camoflage',
        description: 'Vehicles are perfectly concealed at rest',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'elite-rovers',
        name: 'Elite Rovers',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'barge',
        name: 'Barge',
        description: '',
        quantity: 0,
        maxQuantity: 1
      },
      {
        id: 'steady',
        name: 'Steady',
        description: '+1 stress box.',
        quantity: 0,
        maxQuantity: 3
      }
    ];
    this.contacts = [
      {
        id: 'smugglers-contact-elynn',
        name: 'Elynn',
        description: 'A dock worker',
        attitude: 0
      },
      {
        id: 'smugglers-contact-rolan',
        name: 'Rolan',
        description: 'A drug dealer',
        attitude: 0
      },
      {
        id: 'smugglers-contact-sera',
        name: 'Sera',
        description: 'An arms dealer',
        attitude: 0
      },
      {
        id: 'smugglers-contact-nyelle',
        name: 'Nyelle',
        description: 'A spirit trafficker',
        attitude: 0
      },
      {
        id: 'smugglers-contact-decker',
        name: 'Decker',
        description: 'An anarchist',
        attitude: 0
      },
      {
        id: 'smugglers-contact-esme',
        name: 'Esme',
        description: 'A tavern owner',
        attitude: 0
      }
    ];

    this.applyUpgradesDescriptionsFromCodex();

    this.claims = [
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 0 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 1 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 0, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 1, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 2, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 3, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      },
      {
        id: '',
        name: '',
        description: '',
        position: { x: 4, y: 2 },
        quantity: 0,
        maxQuantity: 1,
        prerequisites: []
      }
    ];
  }
}

export function createCrewTemplates() {
  return {
    assassins: new Assassins(),
    bravos: new Bravos(),
    cult: new Cult(),
    hawkers: new Hawkers(),
    shadows: new Shadows(),
    smugglers: new Smugglers()
  };
}

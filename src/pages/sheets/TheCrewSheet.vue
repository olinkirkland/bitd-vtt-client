<template>
  <div class="sheet-layout__nested">
    <div
      class="crew-layout"
      ref="carouselRef"
      @scroll="updateCurrentIndex($event.target as HTMLElement)"
    >
      <div class="main-and-claims" :class="{ active: currentIndex == 0 }">
        <section>
          <div
            class="crew-type-card"
            :style="{
              backgroundColor: getSheetImage(sheet.image)?.commonColor
            }"
          >
            <img :src="getSheetImage(sheet.image)?.url" />
            <h2>Crew sheet</h2>
            <h1>{{ sheet.crewType }}</h1>
            <p>
              {{ sheet.crewTypeDescription }}
            </p>
          </div>

          <div class="input-group">
            <label for="crew-name">Name</label>
            <input
              id="crew-name"
              type="text"
              :value="props.sheet.name"
              @focus="focus = 'name'"
              @change="
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'name'
                )
              "
            />
            <CollapsingShelf :show="focus == 'name'">
              <p>Choose a name for your crew.</p>
            </CollapsingShelf>
          </div>
          <div class="input-group">
            <label for="reputation-type">Reputation</label>
            <input
              id="reputation-type"
              type="text"
              :value="props.sheet.reputationType"
              @focus="focus = 'reputation-type'"
              @change="
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'reputationType'
                )
              "
            />
            <CollapsingShelf :show="focus == 'reputation-type'">
              <p>Choose how other underworld factions see you.</p>
              <div class="text-list">
                <button
                  class="btn btn--text"
                  v-for="reputation in codex.sheets.crew.reputations"
                  @mousedown="onChangeValue(reputation, 'reputationType')"
                >
                  {{ reputation }}
                </button>
              </div>
            </CollapsingShelf>
          </div>
          <Divider />
          <div class="input-group">
            <label for="crew-lair">Lair</label>
            <input
              id="crew-lair"
              type="text"
              :value="props.sheet.lair"
              @focus="focus = 'lair'"
              @change="
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'lair'
                )
              "
            />
            <CollapsingShelf :show="focus == 'lair'">
              <p>What does your lair look like?</p>
              <button class="btn btn--icon" @mousedown="randomizeLair">
                <i class="fas fa-random"></i>
                <span>Randomize</span>
              </button>
            </CollapsingShelf>
            <div class="input-group">
              <label for="crew-lair-district">District</label>
              <input
                id="crew-lair-district"
                type="text"
                :value="props.sheet.lairDistrict"
                @focus="focus = 'lair-district'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'lair-district'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'lair-district'">
                <p>Where is your lair located?</p>
                <div class="text-list">
                  <button
                    class="btn btn--text"
                    v-for="district in codex.lexicon.districts.map((d:any) => d.name)"
                    :key="district"
                    @mousedown="onChangeValue(district, 'lairDistrict')"
                  >
                    {{ district }}
                  </button>
                </div>
              </CollapsingShelf>
            </div>
          </div>
          <label
            >{{ sheet.huntingGroundsLabel }}
            <label
              v-if="
                sheet.huntingGroundsLabel.toLowerCase() !== 'hunting grounds'
              "
              class="muted"
              >(Hunting Grounds)</label
            >
          </label>
          <div class="tile-list tile-list--mini">
            <EffectableTile
              v-for="ground in sheet.huntingGrounds"
              :ability="ground"
              :key="ground.id"
              :idPrefix="props.sheet.crewType"
              :propertyName="sheet.huntingGroundsLabel"
              :change="(quantity: number) => onChangeHuntingGround(ground, quantity)"
              :onEdit="onEditHuntingGround"
              :onDelete="() => {}"
            />
          </div>
        </section>
        <Divider />
        <section>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-rep">Rep</label>
              <input
                id="crew-rep"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.reputation"
                @focus="focus = 'reputation'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'reputation'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'reputation'">
                <p>How much rep does your crew have?</p>
              </CollapsingShelf>
            </div>
            <div class="input-group">
              <label for="crew-turf">Turf</label>
              <input
                id="crew-turf"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.turf"
                @focus="focus = 'turf'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'turf'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'turf'">
                <p>How much turf does your crew control?</p>
              </CollapsingShelf>
            </div>
          </div>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-hold">Hold</label>
              <div class="row">
                <button
                  class="btn btn--tab"
                  @click="onChangeValue('weak', 'hold')"
                  :class="{ active: props.sheet.hold == 'weak' }"
                >
                  Weak
                </button>
                <button
                  class="btn btn--tab"
                  @click="onChangeValue('strong', 'hold')"
                  :class="{ active: props.sheet.hold == 'strong' }"
                >
                  Strong
                </button>
              </div>
              <CollapsingShelf :show="focus == 'hold'">
                <p>How strong is your crew's hold on its turf?</p>
              </CollapsingShelf>
            </div>
            <div class="input-group">
              <label for="crew-tier">Tier</label>
              <input
                id="crew-tier"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.tier"
                @focus="focus = 'tier'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'tier'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'tier'">
                <p>What tier is your crew?</p>
              </CollapsingShelf>
            </div>
          </div>
        </section>
        <Divider />
        <section>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-heat">Heat</label>
              <input
                id="crew-heat"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.heat"
                @focus="focus = 'heat'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'heat'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'heat'">
                <p>How much heat is your crew generating?</p>
              </CollapsingShelf>
            </div>

            <div class="input-group">
              <label for="crew-wanted-level">Wanted Level</label>
              <input
                id="crew-wanted-level"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.wantedLevel"
                @focus="focus = 'wanted-level'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'wantedLevel'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'wanted-level'">
                <p>How much attention is the law giving your crew?</p>
              </CollapsingShelf>
            </div>
          </div>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-coin">Coin</label>
              <input
                id="crew-coin"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.coin"
                @focus="focus = 'coin'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'coin'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'coin'">
                <p>How much coin does your crew have squirreled away?</p>
              </CollapsingShelf>
            </div>

            <div class="input-group">
              <label for="crew-vaults">Vaults</label>
              <input
                id="crew-vaults"
                type="number"
                pattern="[0-9]*"
                :value="props.sheet.vaults"
                @focus="focus = 'vaults'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'vaults'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'vaults'">
                <p>
                  Vaults represent the storage capacity for your crew's coin.
                </p>
              </CollapsingShelf>
            </div>
          </div>
        </section>
        <Divider />
        <section>
          <label for="claims">Claims</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditClaimsModal, {
                  sheetId: props.sheet.id,
                  claims: props.sheet.claims
                })
              "
            >
              <span>Edit Claims</span>
            </button>
            <!-- <Checkbox
              icon="fa-check"
              v-model="lockClaimDependencies"
              label="Enforce roadmap"
            />| -->
          </div>
          <div class="claims-list">
            <ClaimTile
              v-for="claim in claims"
              :key="claim.id"
              :claim="claim"
              :idPrefix="props.sheet.crewType"
              propertyName="Claim"
              :neighborClaims="getNeighborClaims(claim)"
              :change="(quantity: number) => onChangeClaim(claim, quantity)"
            />
          </div>
        </section>
      </div>
      <div
        class="abilities-xp-and-contacts"
        :class="{ active: currentIndex == 1 }"
      >
        <section>
          <div class="input-group">
            <label for="crew-xp">Crew XP</label>
            <input
              id="crew-xp"
              type="number"
              pattern="[0-9]*"
              :value="props.sheet.crewExperience"
              @focus="focus = 'xp'"
              @change="
                onChangeValue(($event.target as HTMLInputElement)?.value, 'xp')
              "
            />
            <CollapsingShelf :show="focus == 'xp'">
              <p>How much experience has your crew accumulated?</p>
            </CollapsingShelf>
          </div>
        </section>
        <Divider />
        <section>
          <label for="crew-abilities">Special Abilities</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditEffectableModal, {
                  propertyName: 'Special Ability',
                  idPrefix: sheet.crewType,
                  onCreateNew: onCreateAbility
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedAbilities"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <EffectableTile
              v-for="ability in specialAbilities"
              :key="ability.id"
              :ability="ability"
              :idPrefix="props.sheet.crewType"
              :propertyName="'Special Ability'"
              :change="(quantity: number) => onChangeAbility(ability, quantity)"
              :onEdit="onEditAbility"
              :onDelete="onDeleteAbility"
              :class="{
                'wide-tile':
                  ability.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD
              }"
            />
          </div>
          <p v-if="specialAbilities.length == 0">
            <em>❖ No special abilities selected</em>
          </p>
        </section>
        <Divider />
        <section>
          <label for="contacts">Crew Contacts</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditPersonModal, {
                  propertyName: 'Crew Contact',
                  idPrefix: sheet.crewType + '-contact',
                  onCreateNew: onCreateContact
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedContacts"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <PersonTile
              v-for="contact in contacts"
              :key="contact.id"
              :idPrefix="props.sheet.crewType + '-contact'"
              propertyName="Crew Contact"
              :person="contact"
              :change="onChangeContact"
              :onEdit="onEditContact"
              :onDelete="onDeleteContact"
              :options="[
                // { value: -1, icon: 'fas fa-caret-down' },
                // { value: 1, icon: 'fas fa-caret-up' },
                { value: 1, text: '❖' }
              ]"
            />
          </div>
        </section>

        <Divider />

        <section>
          <span>COHORTS (TODO)</span>
        </section>
      </div>
      <div class="upgrades" :class="{ active: currentIndex == 2 }">
        <section>
          <label for="crew-upgrades">Crew Upgrades</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditEffectableModal, {
                  propertyName: 'Upgrade',
                  idPrefix: sheet.crewType + '-upgrade',
                  onCreateNew: (upgrade: Effectable) =>
                    onCreateUpgrade(upgrade, 'crew')
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedCrewUpgrades"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <EffectableTile
              v-for="upgrade in crewUpgrades"
              :key="upgrade.id"
              :ability="upgrade"
              :idPrefix="props.sheet.crewType + '-upgrade'"
              :propertyName="'Upgrade'"
              :change="
                (quantity) => {
                  onChangeUpgrade(upgrade, quantity, 'crew');
                }
              "
              :onEdit="
                (ability) => {
                  onEditUpgrade(ability, 'crew');
                }
              "
              :onDelete="(id) => onDeleteUpgrade(id, 'crew')"
              :class="{
                'wide-tile':
                  upgrade.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD
              }"
            />
          </div>
          <p v-if="crewUpgrades.length == 0">
            <em>❖ No crew upgrades selected</em>
          </p>
        </section>

        <Divider />

        <section>
          <label for="crew-lair-upgrades">Lair Upgrades</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditEffectableModal, {
                  propertyName: 'Upgrade',
                  idPrefix: sheet.crewType + '-lair-upgrade',
                  onCreateNew: (upgrade: Effectable) =>
                    onCreateUpgrade(upgrade, 'lair')
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedLairUpgrades"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <EffectableTile
              v-for="upgrade in lairUpgrades"
              :key="upgrade.id"
              :ability="upgrade"
              :idPrefix="props.sheet.crewType + '-lair-upgrade'"
              :propertyName="'Upgrade'"
              :change="
                (quantity) => {
                  onChangeUpgrade(upgrade, quantity, 'lair');
                }
              "
              :onEdit="
                (ability) => {
                  onEditUpgrade(ability, 'lair');
                }
              "
              :onDelete="(id) => onDeleteUpgrade(id, 'lair')"
              :class="{
                'wide-tile':
                  upgrade.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD
              }"
            />
          </div>
          <p v-if="lairUpgrades.length == 0">
            <em>❖ No lair upgrades selected</em>
          </p>
        </section>

        <Divider />

        <section>
          <label for="crew-training-upgrades">Training Upgrades</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditEffectableModal, {
                  propertyName: 'Upgrade',
                  idPrefix: sheet.crewType + '-training-upgrade',
                  onCreateNew: (upgrade: Effectable) =>
                    onCreateUpgrade(upgrade, 'training')
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedTrainingUpgrades"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <EffectableTile
              v-for="upgrade in trainingUpgrades"
              :key="upgrade.id"
              :ability="upgrade"
              :idPrefix="props.sheet.crewType + '-training-upgrade'"
              :propertyName="'Upgrade'"
              :change="
                (quantity) => {
                  onChangeUpgrade(upgrade, quantity, 'training');
                }
              "
              :onEdit="
                (ability) => {
                  onEditUpgrade(ability, 'training');
                }
              "
              :onDelete="(id) => onDeleteUpgrade(id, 'training')"
              :class="{
                'wide-tile':
                  upgrade.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD
              }"
            />
          </div>
          <p v-if="trainingUpgrades.length == 0">
            <em>❖ No training upgrades selected</em>
          </p>
        </section>

        <Divider />

        <section>
          <label for="crew-quality-upgrades">Quality Upgrades</label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditEffectableModal, {
                  propertyName: 'Upgrade',
                  idPrefix: sheet.crewType + '-quality-upgrade',
                  onCreateNew: (upgrade: Effectable) =>
                    onCreateUpgrade(upgrade, 'quality')
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-check"
              v-model="showOnlySelectedQualityUpgrades"
              label="Show only selected"
            />
          </div>
          <div class="tile-list">
            <EffectableTile
              v-for="upgrade in qualityUpgrades"
              :key="upgrade.id"
              :ability="upgrade"
              :idPrefix="props.sheet.crewType + '-quality-upgrade'"
              :propertyName="'Upgrade'"
              :change="
                (quantity) => {
                  onChangeUpgrade(upgrade, quantity, 'quality');
                }
              "
              :onEdit="
                (ability) => {
                  onEditUpgrade(ability, 'quality');
                }
              "
              :onDelete="(id) => onDeleteUpgrade(id, 'quality')"
              :class="{
                'wide-tile':
                  upgrade.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD
              }"
            />
          </div>
          <p v-if="qualityUpgrades.length == 0">
            <em>❖ No quality upgrades selected</em>
          </p>
        </section>
      </div>
    </div>
    <div class="row center mobile-nav">
      <button
        class="btn btn--tab"
        @click="scrollToIndex(0)"
        :class="{ active: currentIndex == 0 }"
      >
        1 <i class="fas fa-file-alt"></i>
      </button>
      <button
        class="btn btn--tab"
        @click="scrollToIndex(1)"
        :class="{ active: currentIndex == 1 }"
      >
        2 <i class="fas fa-file-alt"></i>
      </button>
      <button
        class="btn btn--tab"
        @click="scrollToIndex(2)"
        :class="{ active: currentIndex == 2 }"
      >
        3 <i class="fas fa-file-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/Checkbox.vue';
import ClaimTile from '@/components/ClaimTile.vue';
import CollapsingShelf from '@/components/CollapsingShelf.vue';
import EffectableTile from '@/components/EffectableTile.vue';
import PersonTile from '@/components/PersonTile.vue';
import EditClaimsModal from '@/components/modals/modal-content/EditClaimsModal.vue';
import EditEffectableModal from '@/components/modals/modal-content/EditEffectableModal.vue';
import EditPersonModal from '@/components/modals/modal-content/EditPersonModal.vue';
import { patch } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { Effectable, Person } from '@/game-data/game-data-types';
import { Claim, Crew, Direction } from '@/game-data/sheets/crew-sheet';
import { getSheetImage } from '@/game-data/sheets/sheet-util';
import { useGameStore } from '@/stores/game-store';
import { pick } from '@/util/rand-helper';
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';

const WIDE_TILE_DESCRIPTION_THRESHOLD = 200;
const codex = useGameStore().game?.codex;

onMounted(() => {
  document.addEventListener('blur', onBlur, true);
});

onUnmounted(() => {
  document.removeEventListener('blur', onBlur, true);
});

function onBlur(event: FocusEvent) {
  focus.value = null;
}

const props = defineProps<{
  sheet: Crew;
}>();

const currentIndex = ref(0);
const carouselRef = ref<HTMLElement | null>(null);

const focus = ref();

function onChangeValue(value: any, partialPath: string) {
  console.log('onChangeValue', value, partialPath);
  const path = `/data/sheets/${props.sheet.id}/${partialPath}`;
  patch([
    {
      op: 'replace',
      path,
      value
    }
  ]);
}

function updateCurrentIndex(carousel: HTMLElement) {
  // Get the current index from the scroll position
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex.value = index;
}

function scrollToIndex(index: number) {
  if (!carouselRef.value) return;
  carouselRef.value.scrollTo({
    top: 0
  });

  carouselRef.value.scrollTo({
    left: carouselRef.value.clientWidth * index,
    behavior: 'smooth'
  });
}

function randomizeLair() {
  const lairIdeas = codex.sheets.crew.lairs;
  const { name, districts } = pick(lairIdeas);
  const district = pick(districts);
  onChangeValue(name, 'lair');
  onChangeValue(district, 'lairDistrict');
}

/** Upgrades */

const showOnlySelectedCrewUpgrades = ref(false);
const crewUpgrades = computed(() => {
  return (
    showOnlySelectedCrewUpgrades.value
      ? props.sheet.crewUpgrades.filter((a) => a.quantity > 0)
      : props.sheet.crewUpgrades
  ).sort(sortByDescription);
});

const showOnlySelectedLairUpgrades = ref(false);
const lairUpgrades = computed(() => {
  return (
    showOnlySelectedLairUpgrades.value
      ? props.sheet.lairUpgrades.filter((a) => a.quantity > 0)
      : props.sheet.lairUpgrades
  ).sort(sortByDescription);
});

const showOnlySelectedTrainingUpgrades = ref(false);
const trainingUpgrades = computed(() => {
  return (
    showOnlySelectedTrainingUpgrades.value
      ? props.sheet.trainingUpgrades.filter((a) => a.quantity > 0)
      : props.sheet.trainingUpgrades
  ).sort(sortByDescription);
});

const showOnlySelectedQualityUpgrades = ref(false);
const qualityUpgrades = computed(() => {
  return (
    showOnlySelectedQualityUpgrades.value
      ? props.sheet.qualityUpgrades.filter((a) => a.quantity > 0)
      : props.sheet.qualityUpgrades
  ).sort(sortByDescription);
});

/** Upgrades Functions */

function onEditUpgrade(
  upgrade: Effectable,
  upgradeType: 'crew' | 'lair' | 'training' | 'quality'
) {
  const upgradeIndex = props.sheet.crewUpgrades.findIndex(
    (a) => a.id === upgrade.id
  );
  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheet.id}/${upgradeType}Upgrades/${upgradeIndex}`,
      value: upgrade
    }
  ]);
}
function onDeleteUpgrade(
  id: string,
  upgradeType: 'crew' | 'lair' | 'training' | 'quality'
) {
  const upgradeIndex = props.sheet.crewUpgrades.findIndex((a) => a.id === id);
  patch([
    {
      op: 'remove',
      path: `/data/sheets/${props.sheet.id}/${upgradeType}Upgrades/${upgradeIndex}`
    }
  ]);
}
function onChangeUpgrade(
  upgrade: any,
  quantity: number,
  upgradeType: 'crew' | 'lair' | 'training' | 'quality'
) {
  const upgradeIndex = props.sheet[`${upgradeType}Upgrades`].findIndex(
    (a) => a.id === upgrade.id
  );

  if (upgradeIndex === -1) return console.error('Upgrade not found', upgrade);

  const path = `/data/sheets/${props.sheet.id}/${upgradeType}Upgrades/${upgradeIndex}/quantity`;
  patch([
    {
      op: 'replace',
      path,
      value: quantity
    }
  ]);
}
function onCreateUpgrade(
  upgrade: Effectable,
  upgradeType: 'crew' | 'lair' | 'training' | 'quality'
) {
  patch([
    {
      op: 'add',
      path: `/data/sheets/${props.sheet.id}/${upgradeType}Upgrades/-`,
      value: upgrade
    }
  ]);
}

/** Contacts */

const showOnlySelectedContacts = ref(false);
const contacts = computed(() => {
  return showOnlySelectedContacts.value
    ? props.sheet.contacts.filter((a) => a.attitude !== 0)
    : props.sheet.contacts;
});

/** Contacts Functions */

function onEditContact(contact: Person) {
  const contactIndex = props.sheet.contacts.findIndex(
    (a) => a.id === contact.id
  );
  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheet.id}/contacts/${contactIndex}`,
      value: contact
    }
  ]);
}
function onDeleteContact(id: string) {
  const contactIndex = props.sheet.contacts.findIndex((a) => a.id === id);
  patch([
    {
      op: 'remove',
      path: `/data/sheets/${props.sheet.id}/contacts/${contactIndex}`
    }
  ]);
}
function onChangeContact(contact: Person, attitude: number) {
  const contactIndex = props.sheet.contacts.findIndex(
    (a) => a.id === contact.id
  );
  const path = `/data/sheets/${props.sheet.id}/contacts/${contactIndex}/attitude`;
  patch([
    {
      op: 'replace',
      path,
      value: attitude
    }
  ]);
}
function onCreateContact(contact: Person) {
  patch([
    {
      op: 'add',
      path: `/data/sheets/${props.sheet.id}/contacts/-`,
      value: contact
    }
  ]);
}

/** Special Abilities */

const showOnlySelectedAbilities = ref(false);
const specialAbilities = computed(() => {
  return (
    showOnlySelectedAbilities.value
      ? props.sheet.specialAbilities.filter((a) => a.quantity > 0)
      : props.sheet.specialAbilities
  ).sort(sortByDescription);
});

/** Special Abilities Functions */

function onChangeAbility(ability: any, quantity: number) {
  const abilityIndex = props.sheet.specialAbilities.findIndex(
    (a) => a.id === ability.id
  );
  const path = `/data/sheets/${props.sheet.id}/specialAbilities/${abilityIndex}/quantity`;
  patch([
    {
      op: 'replace',
      path,
      value: quantity
    }
  ]);
}
function onEditAbility(ability: Effectable) {
  const abilityIndex = props.sheet.specialAbilities.findIndex(
    (a) => a.id === ability.id
  );
  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheet.id}/specialAbilities/${abilityIndex}`,
      value: ability
    }
  ]);
}
function onDeleteAbility(id: string) {
  const abilityIndex = props.sheet.specialAbilities.findIndex(
    (a) => a.id === id
  );
  patch([
    {
      op: 'remove',
      path: `/data/sheets/${props.sheet.id}/specialAbilities/${abilityIndex}`
    }
  ]);
}
function onCreateAbility(ability: Effectable) {
  patch([
    {
      op: 'add',
      path: `/data/sheets/${props.sheet.id}/specialAbilities/-`,
      value: ability
    }
  ]);
}

/** Helper Functions */

function sortByDescription(a: Effectable, b: Effectable) {
  const aExceeds = a.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD;
  const bExceeds = b.description.length > WIDE_TILE_DESCRIPTION_THRESHOLD;
  if (aExceeds && !bExceeds) return -1;
  if (bExceeds && !aExceeds) return 1;
  return 0;
}

function sortClaimsByPosition(a: Claim, b: Claim) {
  if (a.position.x !== b.position.x) return a.position.x - b.position.x;
  return b.position.y - a.position.y;
}

/** Claims */

const lockClaimDependencies = ref(true);
const claims = computed(() => {
  return props.sheet.claims.sort(sortClaimsByPosition);
});

/** Claims Functions */

function getNeighborClaims(claim: Claim): { [key: string]: Claim } {
  const neighbors: { [key: string]: Claim } = {};
  const relativePositions = {
    [Direction.NORTH]: { x: 0, y: -1 },
    [Direction.EAST]: { x: 1, y: 0 },
    [Direction.SOUTH]: { x: 0, y: 1 },
    [Direction.WEST]: { x: -1, y: 0 }
  };

  claim.adjacent.forEach((direction) => {
    const relativePosition = relativePositions[direction];
    const neighborPosition = {
      x: claim.position.x + relativePosition.x,
      y: claim.position.y + relativePosition.y
    };

    const neighborClaim = props.sheet.claims.find(
      (c) =>
        c.position.x === neighborPosition.x &&
        c.position.y === neighborPosition.y
    );

    if (neighborClaim) neighbors[direction] = neighborClaim;
  });

  return neighbors;
}
function onChangeClaim(claim: any, quantity: number) {
  const claimIndex = props.sheet.claims.findIndex((a) => a.id === claim.id);
  const path = `/data/sheets/${props.sheet.id}/claims/${claimIndex}/quantity`;
  patch([
    {
      op: 'replace',
      path,
      value: quantity
    }
  ]);
}

/** Hunting Grounds */
const huntingGrounds = computed(() => {
  return props.sheet.huntingGrounds;
});
function onChangeHuntingGround(ground: Effectable, quantity: number) {
  const huntingGroundIndex = props.sheet.huntingGrounds.findIndex(
    (a) => a.id === ground.id
  );
  const path = `/data/sheets/${props.sheet.id}/huntingGrounds/${huntingGroundIndex}/quantity`;
  patch([
    {
      op: 'replace',
      path,
      value: quantity
    }
  ]);
}

/** Hunting Grounds Functions */
function onEditHuntingGround(ground: Effectable) {
  const huntingGroundIndex = props.sheet.huntingGrounds.findIndex(
    (a) => a.id === ground.id
  );

  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheet.id}/huntingGrounds/${huntingGroundIndex}`,
      value: ground
    }
  ]);
}
</script>

<style scoped lang="scss">
.sheet-layout__nested {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.crew-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;

  > div {
    padding: 1rem;

    // dividing vertical lines between divs
    &:not(:last-child) {
      border-right: 1px solid var(--dark-2);
    }

    section {
      padding: 1rem;
      color: yellow;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.mobile-nav {
  display: none;

  justify-content: center;
  padding: 0.4rem;
  width: 100%;

  background-color: var(--dark);
  box-shadow: var(--shadow);
  z-index: 1;
}

.tile-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  > * {
    min-width: 100%;
  }
  > .wide-tile {
    grid-column: 1 / -1;
  }
  &--mini {
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  }
}

.claims-list {
  // Claim must always be a 3x5 grid
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1.6rem;
}

.crew-type-card {
  position: relative;
  box-shadow: var(--shadow);
  overflow: hidden;
  border-radius: 5px;
  height: 20rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  > h1,
  h2,
  p {
    z-index: 1;
    color: var(--light);
  }

  h1 {
    font-size: 4.8rem;
  }

  h2 {
    font-size: 1.2rem;
    letter-spacing: 4px;
    opacity: 0.6;
  }

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    z-index: 0;
    filter: brightness(0.6);
  }
}

@media (min-width: 1080px) {
  .tile-list {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
}

@media (max-width: 1079px) {
  .crew-layout {
    display: flex;
    overflow-x: hidden;

    > div {
      min-width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }

  .mobile-nav {
    display: flex;
  }
}
</style>

<template>
  <div class="sheet-layout__nested">
    <div
      class="crew-layout"
      ref="carouselRef"
      @scroll="updateCurrentIndex($event.target as HTMLElement)"
    >
      <div class="main-and-claims" :class="{ active: currentIndex == 0 }">
        <section>
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
          <span>CLAIMS (TODO)</span>
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
      </div>
      <div
        class="abilities-xp-and-contacts"
        :class="{ active: currentIndex == 1 }"
      >
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
              v-model="showOnlySelectedAbilities"
              label="Show only selected"
            />
          </div>
          <AbilityTile
            v-for="ability in specialAbilities"
            :key="ability.id"
            :ability="ability"
            :idPrefix="props.sheet.crewType"
            :propertyName="'Special Ability'"
            :change="(quantity: number) => onChangeSpecialAbility(ability, quantity)"
            :onEdit="onEditAbility"
            :onDelete="onDeleteAbility"
          />
          <p v-if="specialAbilities.length == 0">
            <em> No special abilities selected.</em>
          </p>
        </section>
        <Divider />
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
          <span>CONTACTS (TODO)</span>
        </section>
      </div>
      <div class="upgrades-and-cohorts" :class="{ active: currentIndex == 2 }">
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
              v-model="showOnlySelectedCrewUpgrades"
              label="Show only selected"
            />
          </div>
          <AbilityTile
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
          />
          <p v-if="crewUpgrades.length == 0">
            <em> No crew upgrades selected.</em>
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
              v-model="showOnlySelectedLairUpgrades"
              label="Show only selected"
            />
          </div>
          <AbilityTile
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
          />
          <p v-if="lairUpgrades.length == 0">
            <em> No lair upgrades selected.</em>
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
              v-model="showOnlySelectedTrainingUpgrades"
              label="Show only selected"
            />
          </div>
          <AbilityTile
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
          />
          <p v-if="trainingUpgrades.length == 0">
            <em> No training upgrades selected.</em>
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
              v-model="showOnlySelectedQualityUpgrades"
              label="Show only selected"
            />
          </div>
          <AbilityTile
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
          />
          <p v-if="qualityUpgrades.length == 0">
            <em> No quality upgrades selected.</em>
          </p>
        </section>

        <Divider />

        <section>
          <span>COHORTS (TODO)</span>
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
import AbilityTile from '@/components/AbilityTile.vue';
import Checkbox from '@/components/Checkbox.vue';
import CollapsingShelf from '@/components/CollapsingShelf.vue';
import Divider from '@/components/Divider.vue';
import EditEffectableModal from '@/components/modals/modal-content/EditEffectableModal.vue';
import { patch } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { Effectable } from '@/game-data/game-data-types';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { useGameStore } from '@/stores/game-store';
import { pick } from '@/util/rand-helper';
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';

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

function onChangeSpecialAbility(ability: any, quantity: number) {
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

const showOnlySelectedCrewUpgrades = ref(false);
const crewUpgrades = computed(() => {
  return showOnlySelectedCrewUpgrades.value
    ? props.sheet.crewUpgrades.filter((a) => a.quantity > 0)
    : props.sheet.crewUpgrades;
});

const showOnlySelectedLairUpgrades = ref(false);
const lairUpgrades = computed(() => {
  return showOnlySelectedLairUpgrades.value
    ? props.sheet.lairUpgrades.filter((a) => a.quantity > 0)
    : props.sheet.lairUpgrades;
});

const showOnlySelectedTrainingUpgrades = ref(false);
const trainingUpgrades = computed(() => {
  return showOnlySelectedTrainingUpgrades.value
    ? props.sheet.trainingUpgrades.filter((a) => a.quantity > 0)
    : props.sheet.trainingUpgrades;
});

const showOnlySelectedQualityUpgrades = ref(false);
const qualityUpgrades = computed(() => {
  return showOnlySelectedQualityUpgrades.value
    ? props.sheet.qualityUpgrades.filter((a) => a.quantity > 0)
    : props.sheet.qualityUpgrades;
});

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

const showOnlySelectedAbilities = ref(false);
const specialAbilities = computed(() => {
  return showOnlySelectedAbilities.value
    ? props.sheet.specialAbilities.filter((a) => a.quantity > 0)
    : props.sheet.specialAbilities;
});
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

@media (max-width: 768px) {
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

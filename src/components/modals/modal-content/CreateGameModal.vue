<template>
  <ModalFrame :class="{ disabled: busyCreating }">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>New Game</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="game">
        <p>
          Create a new <em>Blades in the Dark</em> game.
          <br />
          <span class="muted">
            You can invite players once the game has been created.
          </span>
        </p>
        <div class="inputs">
          <div class="input-group">
            <label for="gameName">Game Name</label>
            <input
              type="text"
              @input="gameNameTouched = true"
              placeholder="Enter a name"
              v-model="gameName"
            />
            <span class="reminder shake-once" v-if="gameNameError">
              {{ gameNameError }}
            </span>
          </div>
          <div class="input-group">
            <label for="coverImage">Cover Image</label>
            <ul class="cover-image-list">
              <li
                v-for="image in coverImages"
                :key="image.id"
                :class="{ selected: coverImage === image.id }"
              >
                <button
                  @click="coverImage = image.id"
                  :style="{ backgroundColor: image.commonColor }"
                >
                  <img
                    :src="image.url"
                    @load="image.loaded = true"
                    @error="image.loaded = true"
                    :class="{ loaded: image.loaded }"
                    v-show="image.loaded"
                  />
                  <div class="caption">
                    <span>{{ image.name }}</span>
                  </div>
                  <i
                    v-if="coverImage === image.id"
                    class="fas fa-check-circle"
                  ></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="alert" v-if="createError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ createError }}</span>
          <button class="btn icon close" @click="createError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="row center">
          <button class="btn mobile-full-width" @click="onClickCreate">
            <i v-if="busyCreating" class="fas fa-circle-notch fa-spin"></i>
            <span>Create Game</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { createNewGame } from '@/api/games';
import coverImagesJson from '@/assets/data/cover-images.json';
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const coverImages = ref(
  coverImagesJson.map((image) => ({ ...image, loaded: false }))
);

const createError = ref('');
const busyCreating = ref(false);

const gameName = ref('');
const gameNameTouched = ref(false);
const gameNameError = computed(() => {
  if (!gameNameTouched.value) return null;
  if (gameName.value.length === 0) return 'Every game should have a name';
  return null;
});

const coverImage = ref(coverImages.value[0].id);
// Cover image can't be empty, so we don't need to validate it

const canCreate = computed(() => {
  return gameName.value.length > 0;
});

async function onClickCreate() {
  if (!canCreate.value) {
    if (!gameNameTouched.value || gameNameError.value) {
      gameNameTouched.value = true;

      // Force restart each animation
      const reminders = document.querySelectorAll('.reminder');
      reminders.forEach((reminder) => {
        reminder.classList.remove('shake-once');
        // @ts-ignore
        reminder.offsetWidth; // => This is a hack to force a reflow
        reminder.classList.add('shake-once');
      });

      return;
    }
  }

  busyCreating.value = true;
  createError.value = '';
  const response = await createNewGame(gameName.value, coverImage.value);
  busyCreating.value = false;
  if (!response.refreshToken) createError.value = response;
  else ModalController.close();
}
</script>

<style scoped lang="scss">
.game {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background-color: var(--translucent-light);
    padding: 2rem;
  }
}

ul.cover-image-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;

  > li {
    min-width: 12rem;
    max-width: 12rem;
    height: 12rem;
    overflow: hidden;
    border-radius: 5px;

    &.selected > button {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--translucent-heavy);
      }
    }

    button {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: transparent;

      > i {
        color: var(--light);
        position: absolute;
        top: calc(50% - 1rem);
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
        transition: opacity 0.3s;
        opacity: 0;

        &.loaded {
          opacity: 1;
        }
      }

      .caption {
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: var(--translucent-heavy);
        padding: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;

        > span {
          color: var(--light);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.8;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

// on screens smaller than 1200, hide the scrollbar for the cover image list
@media (max-width: 1200px) {
  ul.cover-image-list {
    scrollbar-width: none;
  }
}
</style>

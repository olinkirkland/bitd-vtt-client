<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>What kind of {{ sheetType }} do you want to create?</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="template-picker">
        <p>
          The crew type you choose determines the group's purpose, their special
          abilities, and how they advance.
        </p>
        <div
          class="scroll-container"
          ref="carouselRef"
          @scroll="updateCurrentIndex($event.target as HTMLElement)"
        >
          <div
            class="template-card"
            v-for="(template, key, index) in templates"
            :key="template.id"
            @click="onClickChooseTemplate(template)"
            :class="{ active: currentIndex == index }"
          >
            <img :src="template[templateTypeKey + 'Image']" />
            <h3>{{ template[templateTypeKey as keyof typeof template] }}</h3>
            <div class="template-card__content">
              <p>
                {{
                  template[
                    (templateTypeKey + 'Description') as keyof typeof template
                  ]
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts" setup>
import ModalController from '@/controllers/modal-controller';
import { PropType, defineProps, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps({
  sheetType: String,
  templateTypeKey: String,
  templates: Object, // Object of key/value pairs like { assassins: new Assassins() }
  onConfirm: {
    type: Function as PropType<(sheetType: string, template: any) => void>,
    required: true
  }
});

function onClickChooseTemplate(template: any) {
  props.onConfirm(props.sheetType as string, template);
  ModalController.close();
}

const currentIndex = ref(0);
function updateCurrentIndex(carousel: HTMLElement) {
  // Get the current index from the scroll position
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex.value = index;
}
</script>

<style lang="scss" scoped>
.modal {
  min-width: 64rem;
}

.template-picker {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .scroll-container {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
    gap: 1.6rem;
  }
}

.template-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;

  overflow: hidden;
  box-shadow: var(--shadow);

  &:hover {
    filter: brightness(1.2);
  }

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    filter: brightness(0.8);
  }

  > h3 {
    text-align: center;
    width: 100%;
    color: var(--light);
    margin: 2.4rem 0;
    font-size: 3.2rem;
    font-weight: bold;
    text-shadow: 2px 2px 2px var(--dark);
  }

  > .template-card__content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    z-index: 1;
    margin-top: auto;
    width: 100%;
    background-color: var(--translucent-heavy);
    padding: 1rem;
    color: var(--light);

    > p {
      font-style: italic;
      text-align: center;
    }
  }
}

@media (max-width: 768px) {
  .template-picker > .scroll-container {
    height: 100%;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    align-items: center;

    .template-card {
      min-width: calc(100% - 4rem);
      // min-width: 100%;
      transition: height 0.2s;
      scroll-snap-align: start;
      > h3 {
        margin-top: 3.2rem;
      }

      filter: brightness(0.4);
      height: calc(100% - 4rem);

      &.active {
        filter: brightness(1);
        height: 100%;
      }
    }
  }
}
</style>

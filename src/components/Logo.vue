<template>
  <h1
    class="logo"
    :class="{ 'logo--vertical': props.vertical, 'logo--big': props.big }"
  >
    <span>online</span>
    <span>in the Dark</span>
  </h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  vertical?: boolean;
  big?: boolean;
}>();
</script>

<style lang="scss" scoped>
h1.logo {
  display: flex;
  align-items: center;
  color: var(--primary);
  span:first-child {
    font-size: 3.6rem;
    font-family: 'Kristi', cursive;
    text-transform: lowercase;
    display: inline-block;
    font-weight: normal;
    margin-right: 0.6rem;
  }
  span:last-child {
    font-size: 1.2rem;
  }

  &--vertical {
    flex-direction: column;
    span:first-child {
      font-size: 4rem;
    }
  }

  &--big {
    > span:first-child {
      font-size: 12rem;
    }
    > span:last-child {
      font-size: 2rem;
      letter-spacing: 0.8rem;
    }
  }
}
</style>

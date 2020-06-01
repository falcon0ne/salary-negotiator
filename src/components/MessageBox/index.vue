<template>
  <div class="message-box-overlay absolute top-0 left-0 bottom-0 right-0 z-10" :style="style">
    <transition name="animation-message-box" appear>
      <div v-if="show" class="message-box absolute" :class="{ 'message-box__error': hasError }">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    hasError: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        display: (this.show ? 'block' : 'contents'),
        opacity: (this.show ? 1 : 0),
        'transition-delay': (this.show ? '0s' : '0.65s')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-box {
  &-overlay {
    background: rgba(0, 0, 0, 0.76);
    transition: opacity .126s ease;
  }

  @apply bg-white
         border
         border-solid
         border-green-600
         p-5 rounded-md;
  left: 50%;
  max-width: 400px;
  min-width: 320px;
  top: 50%;
  transform: translate(-50%, -50%);
  // width: 100%;
  width: auto;
  z-index: 10;

  &__error {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    backface-visibility: hidden;
    border-color: theme('colors.red.700');
  }
}

.animation-message-box {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, 25%);
  }

  &-enter-active {
    transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &-leave-active {
    transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.65s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(calc(-50% - 1px), -50%, 0);
  }

  20%,
  80% {
    transform: translate3d(calc(-50% + 2px), -50%, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(calc(-50% - 4px), -50%, 0);
  }

  40%,
  60% {
    transform: translate3d(calc(-50% + 4px), -50%, 0);
  }
}
</style>

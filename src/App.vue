<template>
  <div id="app" class="font-body bg-gray-100 h-screen text-base flex flex-col">
    <main class="flex flex-1 items-center justify-center">
      <salary-negotiation />
    </main>
  </div>
</template>

<script>
import SalaryNegotiation from './components/SalaryNegotiation'

export default {
  name: 'App',
  components: {
    SalaryNegotiation
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.button,
.button-ghost {
  @apply border-orange-500
         border-solid
         border
         px-4
         py-1
         shadow
         rounded;
  
  &:disabled {
    @apply cursor-auto
           opacity-75;
  }
}

.button {
  @apply bg-orange-500
         text-white;
}

.button-ghost {
  @apply text-orange-500;
}
</style>

<template>
  <component :is="wrapper" class="bg-white shadow rounded">
    <div class="tabs flex w-full">
      <template v-for="(tab, idx) in tabs">
        <a :href="tab.href"
           :key="`tabItem_${idx}`"
           @click="selectTab(tab)"
           class="flex-1 no-underline uppercase font-bold text-center p-3 text-sm border-b border-solid hover:text-orange-500"
           :class="{ 'border-orange-500 text-orange-500': tab.isActive, 'border-gray-400': !tab.isActive }"
        >
          {{ tab.name }}
        </a>
      </template>
    </div>

    <div class="tabs-details px-6 py-8">
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'TabsContainer',
  props: {
    wrapper: {
      type: String,
      default: 'section',
      validator: value => {
        return value.match(/(div|section)/)
      }
    }
  },
  data() {
    return {
      tabs: []
    }
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name)
      })
    }
  }
}
</script>
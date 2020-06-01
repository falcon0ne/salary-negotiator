import { shallowMount } from '@vue/test-utils'
import Tab from './index.vue'

describe('Tab', () => {
  const wrapper = shallowMount(Tab, {
    propsData: {
      name: 'Mytab'
    },
    slots: {
      default: ['My Tab Content']
    }
  })

  it('Should have propper data', async () => {
    expect(wrapper.text()).toContain('My Tab Content')
    expect(wrapper.vm.href).toBe('#mytab')

    await wrapper.setProps({ name: 'My new Tab' })
    expect(wrapper.vm.href).toBe('#my-new-tab')
  })

  it('Should toggle visibillity', async () => {
    expect(wrapper.attributes('style')).toBe('display: none;')
    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapper.attributes('style')).toBe('')
  })
})

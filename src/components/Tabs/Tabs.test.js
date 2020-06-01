import { mount } from '@vue/test-utils'
import Tabs from './index.vue'

describe('Tabs', () => {
  const createWrapper = async () => {
    const wrapper = mount(Tabs)
    await wrapper.setData({
      tabs: [{
        name: 'Tab1'
      }, {
        name: 'Tab2',
        isActive: true
      }]
    })
    return wrapper
  }

  it('Should have two tabs', async () => {
    const wrapper = await createWrapper()
    const tabs = wrapper.findAll('a')
    expect(tabs.length).toBe(2)
    expect(tabs.at(0).classes()).toContain('border-gray-400')
    expect(tabs.at(1).classes()).not.toContain('border-gray-400')
    expect(tabs.at(0).text()).toBe('Tab1')
    expect(tabs.at(1).text()).toBe('Tab2')
  })

  it('Should switch the tabs', async () => {
    const wrapper = await createWrapper()
    const tabs = wrapper.findAll('a')
    await tabs.at(0).trigger('click')
    expect(tabs.at(0).classes()).not.toContain('border-gray-400')
    expect(tabs.at(1).classes()).toContain('border-gray-400')
  })
})
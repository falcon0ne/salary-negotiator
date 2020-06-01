import { shallowMount } from '@vue/test-utils'
import MessageBox from './index.vue'

describe('MessageBox', () => {
  const wrapper = shallowMount(MessageBox, {
    propsData: {
      show: true
    },
    slots: {
      default: ['My Message']
    }
  })

  it('Should display display content', () => {
    expect(wrapper.text()).toContain('My Message')
  })

  it('Should be success', () => {
    const div = wrapper.find('.message-box-overlay div')
    expect(div.classes()).toContain('message-box')
    expect(div.classes()).not.toContain('message-box__error')
  })

  it('Should be a failure', async () => {
    await wrapper.setProps({ hasError: true })
    const div = wrapper.find('.message-box-overlay div')
    expect(div.classes()).toContain('message-box')
    expect(div.classes()).toContain('message-box__error')
  })
})

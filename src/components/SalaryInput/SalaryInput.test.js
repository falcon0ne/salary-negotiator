import { shallowMount } from '@vue/test-utils'
import SalaryInput from './index.vue'

describe('SalaryInput', () => {
  const $emit = jest.fn()
  let wrapper

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    const div = document.createElement('div')
    document.body.appendChild(div)

    wrapper = shallowMount(SalaryInput, {
      attachTo: div,
      mocks: {
        $emit
      },
      propsData: {
        value: 0
      }
    })
  })

  it('Should setup as employer', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()
    expect(button.attributes('disabled')).toBeTruthy()
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.vm.placeholder).toContain('maximally')
  })

  it('Should submit as employer and hide input', async () => {
    const input = wrapper.find('input')
    await input.setValue(999)
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeFalsy()
    expect(wrapper.find('.overlay').exists()).toBeFalsy()

    button.trigger('click')
    expect($emit.mock.calls[0][0]).toBe('salarySubmit')
    expect($emit.mock.calls[0][1]).toEqual({
      type: 'employer',
      salary: 999
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.overlay').exists()).toBeTruthy()
  })

  it('Should work also as employee', async () => {
    await wrapper.setProps({
      type: 'employee'
    })

    expect(wrapper.vm.placeholder).not.toContain('maximally')
    expect(wrapper.vm.placeholder).toContain('minimally')

    const input = wrapper.find('input')
    await input.setValue(999)
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeFalsy()
    expect(wrapper.find('.overlay').exists()).toBeFalsy()

    button.trigger('click')
    expect($emit.mock.calls[0][0]).toBe('salarySubmit')
    expect($emit.mock.calls[0][1]).toEqual({
      type: 'employee',
      salary: 999
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.overlay').exists()).toBeTruthy()
  })
})

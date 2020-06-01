import { mount } from '@vue/test-utils'
import SalaryNegotiation from './index.vue'

describe('SalaryNegotiation', () => {
  let wrapper
  const errorLog = jest.fn()

  // Mock fetch
  const mockSuccessResponse = {
    main: {
      temp: 273.25
    }
  }

  const mockJsonPromise = Promise.resolve(mockSuccessResponse)
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  })
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

  const getElements = () => {
    const tabs = wrapper.findAll('tab-stub')
    const employerInput = tabs.at(0).find('input')
    const employerButton = tabs.at(0).find('button')
    const employeeInput = tabs.at(1).find('input')
    const employeeButton = tabs.at(1).find('button')

    return {
      employeeInput,
      employerInput,
      employeeButton,
      employerButton
    }
  }

  const setFailedValues = async () => {
    const { employeeButton, employeeInput, employerInput, employerButton } = getElements()
    await employerInput.setValue('900')
    await employerButton.trigger('click')
    await employeeInput.setValue('910')
    await employeeButton.trigger('click')
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    console.error = errorLog

    wrapper = mount(SalaryNegotiation, {
      attachToDocument: true,
      stubs: ['tab', 'tabs']
    })
  })

  it('Should startup correctly', () => {
    expect(wrapper.findAll('tab-stub').length).toBe(2)
    expect(wrapper.find('.message-box').exists()).toBeFalsy()
  })

  it('Should have a successfull negotiation', async () => {
    const { employeeButton, employeeInput, employerInput, employerButton } = getElements()

    // Set employer max
    await employerInput.setValue('900')
    await employerButton.trigger('click')
    expect(wrapper.vm.employerMax).toBe(900)
    expect(wrapper.find('.message-box').exists()).toBeFalsy()
    
    // Set employee min
    await employeeInput.setValue('800')
    await employeeButton.trigger('click')
    const messageBox = wrapper.find('.message-box')
    expect(wrapper.vm.employeeMin).toBe(800)
    expect(messageBox.exists()).toBeTruthy()
    
    // Check the message box
    expect(messageBox.classes()).not.toContain('message-box__error')
    expect(messageBox.text()).toContain('Success')
    expect(messageBox.text()).toContain('Employer: $900')
    expect(messageBox.text()).toContain('Employee: $800')
  })

  it('Should have a successfull negotiation (inputs are equal)', async () => {
    const { employeeButton, employeeInput, employerInput, employerButton } = getElements()

    // Set employer max
    await employerInput.setValue('900')
    await employerButton.trigger('click')
    expect(wrapper.vm.employerMax).toBe(900)
    expect(wrapper.find('.message-box').exists()).toBeFalsy()
    
    // Set employee min
    await employeeInput.setValue('910')
    await employeeButton.trigger('click')
    const messageBox = wrapper.find('.message-box')
    expect(wrapper.vm.employeeMin).toBe(910)
    expect(messageBox.exists()).toBeTruthy()
    
    // Check the message box
    expect(messageBox.classes()).toContain('message-box__error')
    expect(messageBox.text()).not.toContain('Success')
    expect(messageBox.text()).toContain('Failure')
    expect(messageBox.text()).toContain('Employer: $900')
    expect(messageBox.text()).toContain('Employee: $910')
  })

  it('Should have a failed negotiation', async () => {
    const { employeeButton, employeeInput, employerInput, employerButton } = getElements()

    // Set employer max
    await employerInput.setValue('900')
    await employerButton.trigger('click')
    expect(wrapper.vm.employerMax).toBe(900)
    expect(wrapper.find('.message-box').exists()).toBeFalsy()
    
    // Set employee min
    await employeeInput.setValue('910')
    await employeeButton.trigger('click')
    const messageBox = wrapper.find('.message-box')
    expect(wrapper.vm.employeeMin).toBe(910)
    expect(messageBox.exists()).toBeTruthy()
    
    // Check the message box
    expect(messageBox.classes()).toContain('message-box__error')
    expect(messageBox.text()).not.toContain('Success')
    expect(messageBox.text()).toContain('Failure')
    expect(messageBox.text()).toContain('Employer: $900')
    expect(messageBox.text()).toContain('Employee: $910')
  })

  it('Should reset the SalaryNegotiation', async () => {
    await setFailedValues()

    const resetButton = wrapper.find('.message-box button')
    await resetButton.trigger('click')

    expect(wrapper.find('.message-box').exists()).toBeFalsy()
    expect(wrapper.findAll('.overlay').length).toBe(0)
    expect(wrapper.vm.employerMax).toBe(0)
    expect(wrapper.vm.employeeMin).toBe(0)
  })

  it('Should show weather informations for london', async () => {
    expect(global.fetch.mock.calls[0][0]).toContain('api.openweathermap.org/data/2.5/weather?q=London,uk')
    await setFailedValues()

    const messageBox = wrapper.find('.message-box')
    expect(wrapper.vm.temperature).toBe(273.25)
    expect(messageBox.text()).toContain('London is 0 degrees')

    // Prepare failing fetch for the next test
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Some Error',
    }))
  })

  it('Should not show weather informations for london', async () => {
    expect(global.fetch.mock.calls[0][0]).toContain('api.openweathermap.org/data/2.5/weather?q=London,uk')
    await setFailedValues()

    const messageBox = wrapper.find('.message-box')
    expect(wrapper.vm.temperature).toBe(null)
    expect(messageBox.text()).not.toContain('London is 0 degrees')
    expect(errorLog).toBeCalled()
  })
})
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

function createForm(slot) {
  return {
    template: `
      <form @submit.prevent="submitted = true">
        ${slot}
      </form>
    `,
    data: () => ({ submitted: false }),
  }
}

describe('jsdom', () => {
  test('Clicking a <button> should submit the parent form', () => {
    const vm = createApp(createForm('<button></button>')).mount('body')

    document.querySelector('button').dispatchEvent(
      new window.MouseEvent('click'),
    )

    expect(vm.submitted).toBe(true)
  })

  test('Clicking a <button type="button"> should _not_ submit the parent form', () => {
    const vm = createApp(
      createForm('<button type="button"></button>')
    ).mount('body')

    document.querySelector('button').dispatchEvent(
      new window.MouseEvent('click'),
    )

    expect(vm.submitted).toBe(false)
  })
})

describe('@vue/test-utils', () => {
  test('Clicking a type="submit" should submit the parent form', async () => {
    const wrapper = mount(createForm('<button></button>'))

    await wrapper.get('button').trigger('click')

    expect(wrapper.vm.submitted).toBe(true)
  })
})

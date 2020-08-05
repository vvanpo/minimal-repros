import { createLocalVue, mount } from '@vue/test-utils'
import { JSDOM } from 'jsdom'

describe('@vue/test-utils', () => {
  test('Clicking a type="submit" should submit the parent form', async () => {
    const localVue = createLocalVue()
    let submitted = false
    const wrapper = mount(
      {
        template: `
          <form @submit.prevent="submitted">
            <button type="submit"></button>
          </form>
        `,
        methods: {
          submitted() { submitted = true },
        },
      },
      { localVue },
    )

    await wrapper.get('button').trigger('click')

    expect(submitted).toBe(true)
  })
})

describe('jsdom', () => {
  test('Clicking a type="submit" should submit the parent form', () => {
    const { window } = new JSDOM(`
      <form>
        <button type="submit"></button>
      </form>
    `)
    const { document } = window
    let submitted = false

    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      submitted = true
    })

    const submit = document.querySelector('button')
    submit.dispatchEvent(new window.MouseEvent('click'))

    expect(submitted).toBe(true)
  })
})

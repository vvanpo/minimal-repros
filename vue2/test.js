import Vue from 'vue/dist/vue.common.js'

test('Pressing "enter" on an input should submit the parent form', () => {
  document.body.innerHTML = '<div id="#app"></div>'

  Vue.config.errorHandler = (err) => {
    console.log(err.toString())
  }

  new Vue({
    template: `<div />`,
    data: () => ({ foo: false, bar: false }),
    mounted() {
      this.foo = true
      this.bar = true
    },
    watch: {
      foo: async () => { throw new Error('foo') },
      bar: () => { throw new Error('bar') },
    },
  }).$mount(document.body.querySelector('#app'))
})

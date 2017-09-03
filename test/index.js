import Vue from 'vue'
import { expect } from 'chai'
import JsonTree from '../src/json-tree.vue'

Vue.config.productionTip = false

describe('Vue JSON Tree', () => {
  it('Should render JSON', done => {
    let vm = new Vue({
      components: { JsonTree },
      render: h => h('json-tree', { props: { raw: '{"foo": "bar"}' } })
    }).$mount()

    vm.$nextTick(() => {
      const tree = vm.$el
      expect(tree.classList.contains('json-tree')).to.equal(true)
      expect(tree.classList.contains('json-tree-root')).to.equal(true)
      expect(tree.querySelectorAll('.json-tree-key').length).to.equal(1)
      expect(tree.querySelector('.json-tree-key').textContent).to.equal('"foo"')
      expect(tree.querySelectorAll('.json-tree-value-string').length).to.equal(1)
      expect(tree.querySelector('.json-tree-value-string').textContent).to.equal('"bar"')
      done()
    })
  })

  it('Should render JavaScript data', done => {
    let vm = new Vue({
      components: { JsonTree },
      render: h => h('json-tree', { props: { data: { baz: 7 } } })
    }).$mount()

    vm.$nextTick(() => {
      const tree = vm.$el
      expect(tree.classList.contains('json-tree')).to.equal(true)
      expect(tree.classList.contains('json-tree-root')).to.equal(true)
      expect(tree.querySelectorAll('.json-tree-key').length).to.equal(1)
      expect(tree.querySelector('.json-tree-key').textContent).to.equal('"baz"')
      expect(tree.querySelectorAll('.json-tree-value-number').length).to.equal(1)
      expect(tree.querySelector('.json-tree-value-number').textContent).to.equal('7')
      done()
    })
  })

  it('Should render collapsed branch', done => {
    let data = { foo: { bar: { baz: [ 1, [ true, false ] ] } } }
    let vm = new Vue({
      components: { JsonTree },
      render: h => h('json-tree', { props: { data, level: 2 } })
    }).$mount()

    Vue.nextTick(() => {
      const tree = vm.$el
      const collapsible = tree.querySelectorAll('.json-tree-collapsed')
      const deeper = tree.querySelectorAll('.json-tree-deeper')
      const collapsed = Array.from(collapsible).filter(el => el.style.display !== 'none')
      const expanded = Array.from(deeper).filter(el => el.style.display !== 'none')
      expect(tree.classList.contains('json-tree')).to.equal(true)
      expect(tree.classList.contains('json-tree-root')).to.equal(true)
      expect(collapsible.length).to.equal(5)
      expect(deeper.length).to.equal(5)
      expect(collapsed.length).to.equal(3)
      expect(expanded.length).to.equal(2)
      done()
    })
  })

  it('Should warn no data', done => {
    let vm = new Vue({
      components: { JsonTree },
      render: h => h('json-tree')
    }).$mount()

    vm.$nextTick(() => {
      const tree = vm.$el
      expect(tree.classList.contains('json-tree')).to.equal(true)
      expect(tree.classList.contains('json-tree-root')).to.equal(true)
      expect(tree.innerText.trim()).to.equal('"[Vue JSON Tree] No data passed."')
      done()
    })
  })

  it('Should warn invalid data', done => {
    let vm = new Vue({
      components: { JsonTree },
      render: h => h('json-tree', { props: { raw: 'invalid' } })
    }).$mount()

    vm.$nextTick(() => {
      const tree = vm.$el
      expect(tree.classList.contains('json-tree')).to.equal(true)
      expect(tree.classList.contains('json-tree-root')).to.equal(true)
      expect(tree.innerText.trim()).to.equal('"[Vue JSON Tree] Invalid raw JSON."')
      done()
    })
  })
})

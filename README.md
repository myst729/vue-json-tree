# vue-json-tree

[![CircleCI](https://img.shields.io/circleci/project/myst729/vue-json-tree/master.svg)](https://circleci.com/gh/myst729/vue-json-tree/tree/master)
[![NPM](https://img.shields.io/npm/v/vue-json-tree.svg)](https://www.npmjs.com/package/vue-json-tree)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/myst729/Vuelog/blob/master/LICENSE)

> Vue component that renders JSON data in a collapsible tree structure.


## usage

#### use in browsers

- Include the CSS and JS along with Vue, so you get a `<json-tree>` component.

```html
<link href="https://unpkg.com/vue-json-tree@0.3.3/dist/json-tree.css" rel="stylesheet">
<script src="https://unpkg.com/vue@2.4.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-json-tree@0.3.3/dist/json-tree.js"></script>
```

- Instantiate the component with your data.

```html
<div id="app"></div>
<script>
  new Vue({
    template: '<json-tree :raw="sample"></json-tree>',
    el: '#app',
    data: {
      sample: '{"foo": "bar"}'
    }
  })
</script>
```

#### use with **webpack** and **vue-loader**

- Install the `vue-json-tree` package via NPM.

```bash
npm install --save vue-json-tree
```

- Import the SFC (with CSS embedded) and register it as a component, either globally or in another component.

```js
import JsonTree from 'vue-json-tree'
Vue.component('json-tree', JsonTree)
```

## props

#### `raw` (`string`, optional)

The data you want to present in the tree view. Must be a valid JSON string, otherwise it fails.

#### `data` (`any`, optional)

If your JSON data has already been parsed, bind this one instead. Must be something that can be produced by `JSON.parse()`.

#### `level` (`number`, optional)

Sometimes the data structure is very deep. You could set them to collapsed on load. By default all levels are expanded.

## demo

**https://myst729.github.io/vue-json-tree**

## development

#### Want to fix bugs or implement new features?

```bash
# Grab the source code from GitHub
git clone git@github.com:myst729/vue-json-tree.git

# Install dependencies via NPM
npm install

# Run in dev mode and start to hack
npm run dev

# Make sure you run the tests
npm run test

# Build the dist files
npm run dist
```


MIT © [**Leo Deng**](https://myst729.github.io/)

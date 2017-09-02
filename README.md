# vue-json-tree

> Vue component that renders JSON data in a collapsible tree structure.

## usage

#### use in browsers

- Include the CSS and JS along with Vue, so you get a `<json-tree>` component.

```html
<link href="https://unpkg.com/vue-json-tree@0.2.2/dist/json-tree.css" rel="stylesheet">
<script src="https://unpkg.com/vue@2.4.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-json-tree@0.2.2/dist/json-tree.js"></script>
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

#### `raw` (`String`, optional)

The data you want to present in the tree view. Must be a valid JSON string, otherwise it fails.

#### `data` (`any`, optional)

If your JSON data has already been parsed, bind this one instead. Must be something that can be produced by `JSON.parse()`.

#### `level` (`Number`, optional)

Sometimes the data structure is very deep. You could set them to collapsed on load. By default all levels are expanded.

## demo

**https://myst729.github.io/vue-json-tree**

## development

#### Want to fix bugs or implement new features?

```bash
# grab the source code from GitHub
git clone git@github.com:myst729/vue-json-tree.git

# install dependencies via NPM
npm install

# run in dev mode and start to hack
npm run dev

# build the dist files
npm run build
```


MIT © [Leo Deng](https://myst729.github.io/)

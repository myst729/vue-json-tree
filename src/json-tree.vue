<template>
  <span class="json-tree" :class="{'json-tree-root': parsed.depth === 0}">
    <span class="json-tree-row" v-if="parsed.primitive">
      <span class="json-tree-indent" v-for="n in (parsed.depth * 2 + 3)" :key="n">&nbsp;</span>
      <span class="json-tree-key" v-if="parsed.key">{{ parsed.key }}</span>
      <span class="json-tree-colon" v-if="parsed.key">:&nbsp;</span>
      <span class="json-tree-value" :class="'json-tree-value-' + parsed.type" :title="`${parsed.value}`">{{ `${parsed.value}` }}</span>
      <span class="json-tree-comma" v-if="!parsed.last">,</span>
      <span class="json-tree-indent">&nbsp;</span>
    </span>
    <span class="json-tree-deep" v-if="!parsed.primitive">
      <span class="json-tree-row json-tree-expando" @click="expanded = !expanded" @mouseover="hovered = true" @mouseout="hovered = false">
        <span class="json-tree-indent">&nbsp;</span>
        <span class="json-tree-sign">{{ expanded ? '-' : '+' }}</span>
        <span class="json-tree-indent" v-for="n in (parsed.depth * 2 + 1)" :key="n">&nbsp;</span>
        <span class="json-tree-key" v-if="parsed.key">{{ parsed.key }}</span>
        <span class="json-tree-colon" v-if="parsed.key">:&nbsp;</span>
        <span class="json-tree-open">{{ parsed.type === 'array' ? '[' : '{' }}</span>
        <span class="json-tree-collapsed" v-show="!expanded">&nbsp;/*&nbsp;{{ format(parsed.value.length) }}&nbsp;*/&nbsp;</span>
        <span class="json-tree-close" v-show="!expanded">{{ parsed.type === 'array' ? ']' : '}' }}</span>
        <span class="json-tree-comma" v-show="!expanded && !parsed.last">,</span>
        <span class="json-tree-indent">&nbsp;</span>
      </span>
      <span class="json-tree-deeper" v-show="expanded">
        <json-tree v-for="(item, index) in parsed.value" :key="index" :kv="item" :level="level"></json-tree>
      </span>
      <span class="json-tree-row" v-show="expanded">
        <span class="json-tree-ending" :class="{'json-tree-paired': hovered}">
          <span class="json-tree-indent" v-for="n in (parsed.depth * 2 + 3)" :key="n">&nbsp;</span>
          <span class="json-tree-close">{{ parsed.type === 'array' ? ']' : '}' }}</span>
          <span class="json-tree-comma" v-if="!parsed.last">,</span>
          <span class="json-tree-indent">&nbsp;</span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
function parse (data, depth = 0, last = true, key = undefined) {
  let kv = { depth, last, primitive: true, key: JSON.stringify(key) }
  if (typeof data !== 'object') {
    return Object.assign(kv, { type: typeof data, value: JSON.stringify(data) })
  } else if (data === null) {
    return Object.assign(kv, { type: 'null', value: 'null' })
  } else if (Array.isArray(data)) {
    let value = data.map((item, index) => {
      return parse(item, depth + 1, index === data.length - 1)
    })
    return Object.assign(kv, { primitive: false, type: 'array', value })
  } else {
    let keys = Object.keys(data)
    let value = keys.map((key, index) => {
      return parse(data[key], depth + 1, index === keys.length - 1, key)
    })
    return Object.assign(kv, { primitive: false, type: 'object', value })
  }
}

export default {
  name: 'json-tree',

  props: {
    level: {
      type: Number,
      default: Infinity
    },
    kv: {
      type: Object
    },
    raw: {
      type: String
    },
    data: {},
    displayText: String
  },

  data () {
    return {
      expanded: true,
      hovered: false
    }
  },

  computed: {
    parsed () {
      if (this.kv) {
        return this.kv
      }
      let result
      try {
        if (this.raw) {
          result = JSON.parse(this.raw)
        } else if (typeof this.data !== 'undefined') {
          result = this.data
        } else {
          result = '[Vue JSON Tree] No data passed.'
          console.warn(result)
        }
      } catch (e) {
        result = '[Vue JSON Tree] Invalid raw JSON.'
        console.warn(result)
      } finally {
        return parse(result)
      }
    }
  },

  methods: {
    format (n) {
      if (this.displayText) return this.displayText;
      if (n > 1) return `${n} items`
      return n ? '1 item' : 'no items'
    }
  },

  created () {
    this.expanded = this.parsed.depth < this.level
  }
}
</script>

<style>
.json-tree {
  color: #394359;
  display: flex;
  flex-direction: column;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 20px;
}

.json-tree-root {
  background-color: #f7f8f9;
  border-radius: 3px;
  margin: 2px 0;
  min-width: 560px;
  padding: 10px;
}

.json-tree-ending,
.json-tree-row {
  border-radius: 2px;
  display: flex;
}

.json-tree-paired,
.json-tree-row:hover {
  background-color: #bce2ff;
}

.json-tree-expando {
  cursor: pointer;
}

.json-tree-sign {
  font-weight: 700;
}

.json-tree-collapsed {
  color: gray;
  font-style: italic;
}

.json-tree-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.json-tree-value-string {
  color: #9aab3a;
}

.json-tree-value-boolean {
  color: #ff0080;
}

.json-tree-value-number {
  color: #4f7096;
}

.json-tree-value-null {
  color: #c7444a;
}
</style>

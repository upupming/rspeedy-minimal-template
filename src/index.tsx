import { root } from '@lynx-js/react'

import { App } from './App.js'

if (__LEPUS__) {
  const old = globalThis.rLynxChange
  globalThis.rLynxChange = function (...args) {
    console.log('rLynxChange', ...args)
    old && old(...args)
  }
}

root.render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

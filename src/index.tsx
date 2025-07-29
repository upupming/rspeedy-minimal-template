import '@lynx-js/preact-devtools'
import 'tailwindcss/utilities.css?common';
import '@lynx-js/react/experimental/lazy/import';
import { root } from '@lynx-js/react'

import { App } from './App.js'

// const old = lynx.getNativeApp().callLepusMethod.bind(lynx.getNativeApp())

// lynx.getNativeApp().callLepusMethod = function (...args) {
//   console.log('callLepusMethod', args)
//   return old(...args)
// }

if (__LEPUS__) {
  const old = globalThis.rLynxChange
  globalThis.rLynxChange = function (...args) {
    console.log('rLynxChange', args)
    return old(...args)
  }
}

root.render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

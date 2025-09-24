import '@lynx-js/react/experimental/lazy/import';
import { root, useState } from '@lynx-js/react'

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

const AAA = () => {
  const [id, setId] = useState('123')
  return <view bindtap={() => {
    console.log('tap')
    setId('456')
  }}>
    <App id={id}/>
  </view>
}

root.render(<AAA/>)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

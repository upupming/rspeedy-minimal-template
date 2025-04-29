import { lazy, Suspense, useCallback, useEffect, useState } from '@lynx-js/react'

import './App.css'
import Sub from './subdir/index.jsx'

const Foo = lazy(() => import('./Foo.jsx', { with: { type: "component" } }))

export function App() {
  const [alterLogo, setAlterLogo] = useState(false)

  useEffect(() => {
    console.info('Hello, ReactLynx')
  }, [])

  const onTap = useCallback(() => {
    'background only'
    setAlterLogo(!alterLogo)
  }, [alterLogo])

  return (
    <view style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Suspense>
        <Foo />
      </Suspense>
      <Sub />
    </view>
  )
}

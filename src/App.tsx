import { useCallback, useEffect, useState } from '@lynx-js/react';
import Foo from './Foo.jsx'

import './App.css';

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info('Hello, ReactLynx');
  }, []);

  const onTap = useCallback(() => {
    'background-only';
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view style={{
      padding: '48px',
      backgroundColor: '#fff',
      width: '100%',
      height: '100%'
    }}>
      <text className='text-black bg-white'>Hello, ReactLynx</text>
      <Foo/>
    </view>
  );
}

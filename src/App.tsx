import { useEffect, useState, lazy, Suspense } from '@lynx-js/react';
import { Common } from './Common.jsx';

const Foo = lazy(async () => {
	console.log('importing Foo')
	const ans = await import('./Foo.jsx')
	console.log('imported Foo')
	return ans
})

import './App.css';

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info('Hello, ReactLynx');
  }, []);

  return (
    <view className='root'>
      <Common />
      <Suspense fallback={<text>loading</text>}>
        <Foo />
      </Suspense>
    </view>
  );
}

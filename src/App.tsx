import { useCallback, useEffect, useState } from '@lynx-js/react';

import './App.css';
import arrow from './assets/arrow.png';
import lynxLogo from './assets/lynx-logo.png';
import reactLynxLogo from './assets/react-logo.png';

export function App({ id }) {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info('Hello, ReactLynx');
  }, []);

  const onTap = useCallback(() => {
    'background-only';
    setAlterLogo(!alterLogo);
  }, [alterLogo]);
  
   useEffect(() => {
    console.log('id', id)
    const observer = lynx.createIntersectionObserver({
       componentId: ""
    }, { thresholds: [0, 0.25, 0.5, 0.75, 1.0] });
    observer.relativeTo('#banner', { left: 10, right: 10 });
    observer.observe(`#content-${id}`, (res) => {
      console.log('IntersectionObserver: ', JSON.stringify(res));
    });
    return () => observer.disconnect();
  }, [id]);
  
  lynx.performance.createObserver()

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner' id='banner'>
          <view className='Logo' bindtap={onTap}>
            {alterLogo
              ? <image src={reactLynxLogo} className='Logo--react' />
              : <image src={lynxLogo} className='Logo--lynx' />}
          </view>
          <text className='Title'>React</text>
          <text className='Subtitle'>on Lynx</text>
        </view>
        <view className='Content' id={`content-${id}`}>
          <image src={arrow} className='Arrow' />
          <text className='Description'>Tap the logo and have fun!</text>
          <text className='Hint'>
            Edit<text
              style={{
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {' src/App.tsx '}
            </text>
            to see updates!
          </text>
        </view>
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
}

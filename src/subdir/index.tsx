import { lazy, Suspense } from 'react';

const Foo = lazy(() => import('../Foo.jsx'))
const Foo1 = lazy(() => import('@/Foo.jsx'))

export default function () {
  return <view>
    <text>Hello from subdir</text>
    <Suspense>
      <Foo />
    </Suspense>
    <Suspense>
      <Foo1 />
    </Suspense>
  </view>;
}

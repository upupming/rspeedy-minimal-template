import './Foo.css';
import './common.css';

export default () => {
  return <>
    <text className='common'>Hello Lazy Bundle (common)</text>
    <text className='foo'>Hello Lazy Bundle (foo)</text>
  </>;
}

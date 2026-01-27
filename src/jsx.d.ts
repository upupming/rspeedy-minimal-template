export { }

interface Props {
  xxx: string
  children: string
}
declare module 'react' {
  namespace JSX {
    // Should copy from above IntrinsicElements
    interface IntrinsicElements {
      'button': Props
    }
  }
}

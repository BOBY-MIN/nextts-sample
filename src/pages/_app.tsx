// global css 는 전체 엘리먼트에 영향을 미칠 수 있으므로 단위 구성요소 컴포넌트가 아닌 _app.tsx 에서만 선언되어야 함.
// _app.tsx 가 수정될 경우 서버를 재수행해야 함.
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

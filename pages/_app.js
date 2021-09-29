import '../styles/globals.css'

import { AppProvider } from '../lib/appstate'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
    )
}

export default MyApp

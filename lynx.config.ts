import { defineConfig } from '@lynx-js/rspeedy'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

export default defineConfig({
  // output: {
  //   filenameHash: 'contenthash:8',
  //   minify: false,
  // },
  source: {
    define: {
      'process.env.REACT_APP_LYNX_BUNDLE_URL': JSON.stringify(process.env.REACT_APP_LYNX_BUNDLE_URL),
    }
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
  ],
})

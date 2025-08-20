import { defineConfig } from '@lynx-js/rspeedy'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

export default defineConfig({
  output: {
    filenameHash: 'contenthash:8',
    inlineScripts: /background\./,
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx({
      firstScreenSyncTiming: 'jsReady'
    }),
  ],
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      override: {
        cacheGroups: {
          'lib-common': {
            test: /Common/,
            priority: 0,
            name: 'lib-common',
            enforce: true,
          },
        },
      }
    }
  }
})

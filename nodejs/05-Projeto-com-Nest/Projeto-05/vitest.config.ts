import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // quando está true conseguimos usar como variável global, semprecisar importá-las, mas para isso acontecer tem que ir no arquivo tsconfig.json e colocar "types":["vitest/globals"]
    root: './',
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})

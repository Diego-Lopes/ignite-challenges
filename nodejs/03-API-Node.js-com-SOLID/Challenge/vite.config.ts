import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
// configurando o plugin vite-tsconfig-paths para ser possível ler os caminhos com @ nas importações.

export default defineConfig({
  plugins: [tsconfigPaths()],
})

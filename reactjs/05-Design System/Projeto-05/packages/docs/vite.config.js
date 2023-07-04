/// <reference types= "vite/client" />
// faz com que typescript reconhece algumas tipagens globais do vite
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react()],
})

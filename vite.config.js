import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Precisa bater com o nome do repositório, porque o GitHub Pages
  // publica projetos em https://<usuario>.github.io/<repositorio>/
  base: '/ney-portfolio/',
})

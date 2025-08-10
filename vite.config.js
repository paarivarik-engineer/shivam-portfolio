import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/shivam-portfolio/',   // required for GH Pages under subpath
})


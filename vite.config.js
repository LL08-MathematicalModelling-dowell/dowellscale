import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8003,
  },
  plugins: [react()],
  base: '/dowellscale/'
})

// http://localhost:8004/npslitescale/?workspace_id=ABC&scale_type=npslite&score=0
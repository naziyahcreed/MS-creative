import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiRequestHandler } from './scripts/save-invitation.mjs'

/**
 * Vite plugin that mounts the local file persistence API directly into the dev server.
 * This enables seamless saving of photos and JSON data straight to project folders
 * when running `npm run dev`, with no secondary terminal required!
 */
function localFilePersistencePlugin() {
  return {
    name: 'local-file-persistence',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          apiRequestHandler(req, res).catch((err) => {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, error: err.message }))
          })
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localFilePersistencePlugin()],
  server: {
    port: 5174,
    host: true,
  },
})

import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(() => {
  return {
      plugins: [react(), tailwindcss()],
      resolve: {
          alias: {
              "@": path.resolve(__dirname, "./src"),
          },
      },
      server: {
          proxy: {
              // Proxy API requests to the backend server
              '/api': {
                  target: "http://localhost:8000", // The backend server URL
                  changeOrigin: true, // Ensures the host header is changed to the target URL
                  secure: false,
                  rewrite: (path) => path,
                  configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                      console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                      console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                      console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                  },
              },
          },
      },
       cors: false,
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import svgrPlugin from 'vite-plugin-svgr'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dotenv from 'dotenv'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dotenv.config()],

  base: process.env.VITE_BASE_PATH,
  
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@lang': path.resolve(__dirname, 'src/lang'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    }
  }

})

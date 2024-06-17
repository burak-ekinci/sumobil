import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_KEY_DB": JSON.stringify(process.env.VITE_KEY_DB),
    "process.env.VITE_KEY_CONNECTION_STRING": JSON.stringify(process.env.VITE_KEY_CONNECTION_STRING),
  }
})

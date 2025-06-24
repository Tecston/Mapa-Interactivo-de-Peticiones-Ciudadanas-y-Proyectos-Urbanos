<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// ya no necesitas importar 'path' si solo lo usabas para los alias
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)

export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
})
=======
  // Ya no necesitas la sección 'resolve.alias'
  plugins: [
    react(),
    tsconfigPaths(), // Este plugin leerá la configuración de tsconfig.json por ti
  ]
})
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)

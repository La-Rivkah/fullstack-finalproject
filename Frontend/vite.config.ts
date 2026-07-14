import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    dedupe: [
      'react',
      'react-dom',
    ],
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',

    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],

    exclude: [
      '**/node_modules/**',
      '**/.git/**',
      'e2e/**',
      '**/*.e2e.{js,jsx,ts,tsx}',
    ],

    coverage: {
      provider: 'v8',

      reporter: [
        'text',
        'html',
      ],

      include: [
        'src/components/FormularioTarea.jsx',
        'src/utils/validaciones.js',
      ],

      exclude: [
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/test/**',
        'src/main.{js,jsx,ts,tsx}',
        'src/vite-env.d.ts',
      ],

      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})
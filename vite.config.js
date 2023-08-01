import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/components/index.js',
      name: 'vue-gantt',
      fileName: 'vue-gantt',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    include: ["vue-gantt"],
  },
  build: {
    rollupOptions: {
      external: ['vue-moment'],
    },
  },
});

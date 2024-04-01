import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: '/index.html',
        contacts: '/contacts.html',
        whoWeAre: '/who-we-are.html',
        services: '/services.html',
      },
    },
  },
});

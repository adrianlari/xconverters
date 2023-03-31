/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [react()],
	define: {
		global: {},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
	},
});

import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        // https://github.com/axe-me/vite-plugin-node#get-started
        ...VitePluginNode({
            adapter: 'express',
            appPath: './app.ts',
        })
    ]
})

import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'web-module',
        configKey: 'web-module',
    },

    setup(options: any, nuxt: Nuxt) {


        // nuxt.hook('components:dirs', (dirs) => {
        //     dirs.push({
        //         path: join(__dirname, 'components/base'),
        //         prefix: 'Base'
        //     })
        // })


        // nuxt.hook('autoImports:dirs', (dirs) => {
        //     dirs.push(resolve(__dirname, './composables'))
        // })


        nuxt.hook('pages:extend', (pages) => {
            pages.push(
                {
                    name: 'home',
                    path: '/',
                    file: resolve(__dirname, './pages/home.vue')
                },
                {
                    name: '403',
                    path: '/403',
                    file: resolve(__dirname, './pages/errors/403.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})
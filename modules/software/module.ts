import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'software-module',
        configKey: 'software-module',
    },

    setup(options: any, nuxt: Nuxt) {
        nuxt.hook('pages:extend', (pages) => {
            pages.push(
                {
                    name: 'software-projects-pages-index',
                    path: '/software/projects/:id/pages',
                    file: resolve(__dirname, './pages/software/projects/pages/index.vue')
                },
                {
                    name: 'software-projects-pages-show',
                    path: '/software/projects/:id/pages/:page',
                    file: resolve(__dirname, './pages/software/projects/pages/show.vue')
                },
            )
        })
    }
})
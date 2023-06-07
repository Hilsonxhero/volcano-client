import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'portal-module',
        configKey: 'portal-module',
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
                    name: 'portal-dashboard',
                    path: '/portal/dashboard',
                    file: resolve(__dirname, './pages/portal/dashboard.vue')
                },
                {
                    name: 'portal-projects-index',
                    path: '/portal/projects',
                    file: resolve(__dirname, './pages/portal/projects/projects.vue')
                },
                {
                    name: 'portal-projects-create',
                    path: '/portal/projects/create',
                    file: resolve(__dirname, './pages/portal/projects/create.vue')
                },
                {
                    name: 'portal-projects-show',
                    path: '/portal/projects/:id/:slug',
                    file: resolve(__dirname, './pages/portal/projects/show.vue')
                },

                {
                    name: 'portal-projects-pages-index',
                    path: '/portal/projects/:id/:slug/pages',
                    file: resolve(__dirname, './pages/portal/projects/pages/index.vue')
                },

                {
                    name: 'portal-projects-pages-create',
                    path: '/portal/projects/:id/:slug/pages/create',
                    file: resolve(__dirname, './pages/portal/projects/pages/create.vue')
                },
                {
                    name: 'portal-projects-pages-edit',
                    path: '/portal/projects/:id/:slug/pages/edit/:page',
                    file: resolve(__dirname, './pages/portal/projects/pages/edit.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})
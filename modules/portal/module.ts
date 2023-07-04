import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'portal-module',
        configKey: 'portal-module',
    },

    setup(options: any, nuxt: Nuxt) {

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
                    name: 'portal-projects-users-index',
                    path: '/portal/projects/:id/:slug/users',
                    file: resolve(__dirname, './pages/portal/projects/users/index.vue')
                },
                {
                    name: 'portal-invite-confirmation',
                    path: '/portal/projects/invite/confirmation',
                    file: resolve(__dirname, './pages/portal/projects/users/invite/confirmation.vue')
                },

            )
        })

        // Pinia store modules are auto imported
    }
})
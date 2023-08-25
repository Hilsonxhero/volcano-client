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
                    path: '/portal/projects/:id',
                    file: resolve(__dirname, './pages/portal/projects/show.vue')
                },
                {
                    name: 'portal-projects-pages-index',
                    path: '/portal/projects/:id/pages',
                    file: resolve(__dirname, './pages/portal/projects/pages/index.vue')
                },
                {
                    name: 'portal-projects-users-index',
                    path: '/portal/projects/:id/users',
                    file: resolve(__dirname, './pages/portal/projects/users/index.vue')
                },
                {
                    name: 'portal-projects-roles-index',
                    path: '/portal/projects/:id/roles',
                    file: resolve(__dirname, './pages/portal/projects/roles/index.vue')
                },
                {
                    name: 'portal-projects-roles-create',
                    path: '/portal/projects/:id/roles/create',
                    file: resolve(__dirname, './pages/portal/projects/roles/create.vue')
                },
                {
                    name: 'portal-projects-roles-edit',
                    path: '/portal/projects/:id/roles/edit/:role',
                    file: resolve(__dirname, './pages/portal/projects/roles/edit.vue')
                },
                {
                    name: 'portal-invite-confirmation',
                    path: '/portal/projects/invite/confirmation',
                    file: resolve(__dirname, './pages/portal/projects/users/invite/confirmation.vue')
                },
                {
                    name: 'portal-projects-enumerations-index',
                    path: '/portal/projects/:id/enumerations',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/index.vue')
                },
                {
                    name: 'portal-projects-time-categories-index',
                    path: '/portal/projects/:id/enumerations/time/categories',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/time/index.vue')
                },
                {
                    name: 'portal-projects-time-categories-create',
                    path: '/portal/projects/:id/enumerations/time/categories/create',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/time/create.vue')
                },
                {
                    name: 'portal-projects-time-categories-edit',
                    path: '/portal/projects/:id/enumerations/time/categories/edit/:category',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/time/edit.vue')
                },

                {
                    name: 'portal-projects-trackers-index',
                    path: '/portal/projects/:id/enumerations/trackers',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/tracker/index.vue')
                },
                {
                    name: 'portal-projects-trackers-create',
                    path: '/portal/projects/:id/enumerations/trackers/create',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/tracker/create.vue')
                },
                {
                    name: 'portal-projects-trackers-edit',
                    path: '/portal/projects/:id/enumerations/trackers/edit/:tracker',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/tracker/edit.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})
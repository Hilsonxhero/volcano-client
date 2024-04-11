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
                {
                    name: 'portal-projects-issue-statuses-index',
                    path: '/portal/projects/:id/enumerations/issue/statuses',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/issue-statuses/index.vue')
                },
                {
                    name: 'portal-projects-issue-statuses-create',
                    path: '/portal/projects/:id/enumerations/issue/statuses/create',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/issue-statuses/create.vue')
                },
                {
                    name: 'portal-projects-issue-statuses-edit',
                    path: '/portal/projects/:id/enumerations/issue/statuses/edit/:status',
                    file: resolve(__dirname, './pages/portal/projects/enumerations/issue-statuses/edit.vue')
                },
                {
                    name: 'portal-projects-issues-index',
                    path: '/portal/projects/:id/issues',
                    file: resolve(__dirname, './pages/portal/projects/issues/index.vue')
                },
                {
                    name: 'portal-projects-issues-create',
                    path: '/portal/projects/:id/issues/create',
                    file: resolve(__dirname, './pages/portal/projects/issues/create.vue')
                },
                {
                    name: 'portal-projects-issues-show',
                    path: '/portal/projects/:id/issues/:issue',
                    file: resolve(__dirname, './pages/portal/projects/issues/show.vue')
                },
                {
                    name: 'portal-projects-issues-edit',
                    path: '/portal/projects/:id/issues/edit/:issue',
                    file: resolve(__dirname, './pages/portal/projects/issues/edit.vue')
                },
                {
                    name: 'portal-projects-setting-variables',
                    path: '/portal/projects/:id/setting/variables',
                    file: resolve(__dirname, './pages/portal/projects/setting/variables.vue')
                },

                {
                    name: 'portal-projects-issue-times-index',
                    path: '/portal/projects/:id/issue/times',
                    file: resolve(__dirname, './pages/portal/projects/issues/times/index.vue')
                },
                {
                    name: 'portal-projects-times-report',
                    path: '/portal/projects/:id/time/report',
                    file: resolve(__dirname, './pages/portal/projects/issues/times/report.vue')
                },
                {
                    name: 'portal-projects-boards-index',
                    path: '/portal/projects/:id/boards',
                    file: resolve(__dirname, './pages/portal/projects/boards/index.vue')
                },
                {
                    name: 'portal-projects-boards-show',
                    path: '/portal/projects/:id/boards/:board',
                    file: resolve(__dirname, './pages/portal/projects/boards/show.vue')
                },
                {
                    name: 'portal-projects-boards-confirmation',
                    path: '/portal/projects/board/confirmation',
                    file: resolve(__dirname, './pages/portal/projects/boards/confirmation.vue')
                },

                {
                    name: 'portal-projects-dashboard',
                    path: '/portal/projects/:id/dashboard',
                    file: resolve(__dirname, './pages/portal/projects/dashboard/dashboard.vue')
                },
            )
        })

        // Pinia store modules are auto imported
    }
})
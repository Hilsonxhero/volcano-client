import { defineNuxtModule } from '@nuxt/kit'
import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'management-module',
        configKey: 'management-module',
    },

    setup(options: any, nuxt: Nuxt) {
        nuxt.hook('pages:extend', (pages) => {
            pages.push(
                {
                    name: 'management-dashboard',
                    path: '/management/dashboard',
                    file: resolve(__dirname, './pages/dashboard/dashboard.vue')
                },
                {
                    name: 'management-categories-index',
                    path: '/management/categories',
                    file: resolve(__dirname, './pages/categories/index.vue')
                },
                {
                    name: 'management-categories-create',
                    path: '/management/categories/create',
                    file: resolve(__dirname, './pages/categories/create.vue')
                },
                {
                    name: 'management-categories-edit',
                    path: '/management/categories/edit/:id',
                    file: resolve(__dirname, './pages/categories/edit.vue')
                },
                {
                    name: 'management-users-index',
                    path: '/management/users',
                    file: resolve(__dirname, './pages/users/index.vue')
                },
                {
                    name: 'management-users-create',
                    path: '/management/users/create',
                    file: resolve(__dirname, './pages/users/create.vue')
                },
                {
                    name: 'management-users-edit',
                    path: '/management/users/edit/:id',
                    file: resolve(__dirname, './pages/users/edit.vue')
                },

                {
                    name: 'management-roles-index',
                    path: '/management/roles',
                    file: resolve(__dirname, './pages/roles/index.vue')
                },
                {
                    name: 'management-roles-create',
                    path: '/management/roles/create',
                    file: resolve(__dirname, './pages/roles/create.vue')
                },
                {
                    name: 'management-roles-edit',
                    path: '/management/roles/edit/:id',
                    file: resolve(__dirname, './pages/roles/edit.vue')
                },

                {
                    name: 'management-permissions-index',
                    path: '/management/permissions',
                    file: resolve(__dirname, './pages/permissions/index.vue')
                },
                {
                    name: 'management-permissions-edit',
                    path: '/management/permissions/edit/:id',
                    file: resolve(__dirname, './pages/permissions/edit.vue')
                },

                {
                    name: 'management-articles-index',
                    path: '/management/articles',
                    file: resolve(__dirname, './pages/articles/index.vue')
                },
                {
                    name: 'management-articles-create',
                    path: '/management/articles/create',
                    file: resolve(__dirname, './pages/articles/create.vue')
                },
                {
                    name: 'management-articles-edit',
                    path: '/management/articles/edit/:id',
                    file: resolve(__dirname, './pages/articles/edit.vue')
                },
                // projects
                {
                    name: 'management-projects-index',
                    path: '/management/projects',
                    file: resolve(__dirname, './pages/projects/index.vue')
                },
                {
                    name: 'management-projects-create',
                    path: '/management/projects/create',
                    file: resolve(__dirname, './pages/projects/create.vue')
                },
                {
                    name: 'management-projects-edit',
                    path: '/management/projects/edit/:id',
                    file: resolve(__dirname, './pages/projects/edit.vue')
                },

                // project pages
                {
                    name: 'management-project-pages-index',
                    path: '/management/projects/:project/pages',
                    file: resolve(__dirname, './pages/projects/pages/index.vue')
                },
                {
                    name: 'management-project-pages-create',
                    path: '/management/projects/:project/pages/create',
                    file: resolve(__dirname, './pages/projects/pages/create.vue')
                },
                {
                    name: 'management-project-pages-edit',
                    path: '/management/projects/:project/pages/edit/:id',
                    file: resolve(__dirname, './pages/projects/pages/edit.vue')
                },

                // project members
                {
                    name: 'management-project-members-index',
                    path: '/management/projects/:project/members',
                    file: resolve(__dirname, './pages/projects/members/index.vue')
                },
                {
                    name: 'management-project-members-create',
                    path: '/management/projects/:project/members/create',
                    file: resolve(__dirname, './pages/projects/members/create.vue')
                },
                {
                    name: 'management-project-members-edit',
                    path: '/management/projects/:project/members/edit/:id',
                    file: resolve(__dirname, './pages/projects/members/edit.vue')
                },

                {
                    name: 'management-pages-index',
                    path: '/management/pages',
                    file: resolve(__dirname, './pages/pages/index.vue')
                },
                {
                    name: 'management-pages-create',
                    path: '/management/pages/create',
                    file: resolve(__dirname, './pages/pages/create.vue')
                },
                {
                    name: 'management-pages-edit',
                    path: '/management/pages/edit/:id',
                    file: resolve(__dirname, './pages/pages/edit.vue')
                },

                {
                    name: 'management-setting-index',
                    path: '/management/setting',
                    file: resolve(__dirname, './pages/setting/index.vue')
                },

                {
                    name: 'management-services-index',
                    path: '/management/services',
                    file: resolve(__dirname, './pages/services/index.vue')
                },
                {
                    name: 'management-services-create',
                    path: '/management/services/create',
                    file: resolve(__dirname, './pages/services/create.vue')
                },
                {
                    name: 'management-services-edit',
                    path: '/management/services/edit/:id',
                    file: resolve(__dirname, './pages/services/edit.vue')
                },

            )
        })
    }
})
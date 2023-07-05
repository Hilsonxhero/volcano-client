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
            )
        })
    }
})
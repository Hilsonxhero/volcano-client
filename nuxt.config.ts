export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-icons',
        // '~/modules/i18n',
        '@nuxtjs/i18n',
        '~/modules/web/module',
        '~/modules/auth/module',
        '~/modules/portal/module',
        '~/modules/software/module',
        '~/modules/management/module',
    ],

    i18n: {
        vueI18n: './core/plugins/i18n.config.ts'
    },


    css: ["@/assets/sass/main.scss", "@/assets/css/tailwind.css"],


    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_API_BASE_URL,
        },
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    vite: {
        // plugins: [

        // ]
    }

})

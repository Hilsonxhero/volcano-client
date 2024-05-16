export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-icons',

        '@nuxtjs/i18n',
        '~/modules/web/module',
        '~/modules/auth/module',
        '~/modules/portal/module',
        '~/modules/software/module',
        '~/modules/management/module',
        '~/modules/i18n',
    ],

    i18n: {
        vueI18n: './core/plugins/i18n.config.ts',
        defaultLocale: 'fa',
    },
    ssr: false,


    css: ["@/assets/sass/main.scss", "@/assets/css/tailwind.css", "@/assets/sass/master.scss"],


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

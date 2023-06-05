// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-icons',
        '@nuxtjs/i18n',
        '~/modules/web/module',
        '~/modules/auth/module',
        '~/modules/portal/module',
    ],

    i18n: {
        vueI18n: './core/plugins/i18n.config.ts' // if you are using custom path, default 
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

})

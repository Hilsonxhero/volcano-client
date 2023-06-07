
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-swiper',
        'nuxt-icons',
        // '@nuxtjs/i18n',
        '~/modules/web/module',
        '~/modules/auth/module',
        '~/modules/portal/module',
    ],


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

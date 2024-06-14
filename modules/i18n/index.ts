// import { createResolver, defineNuxtModule } from '@nuxt/kit'

// export default defineNuxtModule({
//     async setup(options, nuxt) {
//         const { resolve } = createResolver(import.meta.url)

//         nuxt.hook('i18n:registerModule', register => {
//             register({

//                 langDir: resolve('./locales'),
//                 locales: [
//                     {
//                         code: 'en',
//                         file: 'en.json',
//                     },
//                 ],
//                 legacy: false,
//                 locale: 'en',
//             })
//         })
//     }
// })

import { createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url)
        nuxt.hook('i18n:registerModule', register => {
            register({
                // langDir path needs to be resolved
                langDir: resolve('./locales'),
                locales: [
                    {
                        code: 'fa',
                        file: 'fa.json',
                    },
                    {
                        code: 'en',
                        file: 'en.json',
                    },

                ],
                legacy: false,
                locale: 'fa',
            })
        })
    }
})

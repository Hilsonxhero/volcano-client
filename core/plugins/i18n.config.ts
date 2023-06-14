import en from "@/locales/en.json"

const locales = {
    en
}

export default defineI18nConfig(() => ({
    defaultLocale: 'en',
    legacy: false,
    locale: 'en',
    messages: locales
}))
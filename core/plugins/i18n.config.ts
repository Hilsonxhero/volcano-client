import fa from "@/locales/fa.json"
const locales = {
    fa
}

export default defineI18nConfig(() => ({
    defaultLocale: 'fa',
    fallbackLocale: 'fa',
    legacy: true,
    locale: 'fa',
    messages: locales
}))
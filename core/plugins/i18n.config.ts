import en from "@/locales/en.json"
import fa from "@/locales/fa.json"
const locales = {
    fa
}

export default defineI18nConfig(() => ({
    defaultLocale: 'fa',
    legacy: false,
    locale: 'fa',
    messages: locales
}))
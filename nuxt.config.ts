// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@element-plus/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-icon'
    ],
    googleFonts: {
        Montserrat: true
    },
    app: {
        baseURL: '/kpfu-shop-task/'
    }
})

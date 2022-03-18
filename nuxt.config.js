import messages from './locales/index.js'
export default {
  head() {
    return {
      title: this.$t('head'),
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: this.$t('keywords') },
        { hid: 'description', name: 'description', content: this.$t('description') },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/common.css'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/axios',
    '@/plugins/filters',
    { src: '@/plugins/echarts', ssr: false },
    { src: '~plugins/ga.js', ssr: false }
  ],
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(src => src === '@/plugins/i18n.js')
    const shouldBeFirstPlugin = plugins[pluginIndex]
    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)
    return plugins
  },
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    ...process.env.NODE_ENV === 'production' ? [
      ['@nuxtjs/google-analytics', { id: process.env.GOOGLE_ANALYTICS }],
      '@nuxtjs/pwa'
    ] : []
  ],
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],
  axios: {
    baseURL: 'https://test.ethsta.com/api/'
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages
    },
    detectBrowserLanguage: {
      useCookie: true,
      // alwaysRedirect: true,
    },
    seo: true,
  },
  build: {
    transpile: [/^element-ui/],
  }
}

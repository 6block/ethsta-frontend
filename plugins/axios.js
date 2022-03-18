export default function({ $axios, app, req }) {
  $axios.interceptors.request.use(config => {
    if (process.server) {
      if (req.headers['user-agent']) {
        config.headers['User-Agent'] = req.headers['user-agent']
      }
      if (req.headers['x-forwarded-for']) {
        config.headers['X-Forwarded-For'] = req.headers['x-forwarded-for']
      }
    }
    config.headers.Locale = app.i18n.locale
    return config
  })
}

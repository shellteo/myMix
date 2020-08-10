import path from 'path'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'

function resolve(dir) {
  return path.join(__dirname, dir)
}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Social Money',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '实现独立于平台的网络价值' },
      { hid: 'keywords', name: 'keywords', content: 'Social Money,社交,以太坊,去中心化,DApp,价值' },
      /* <!--  Meta for OpenGraph --> */
      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: '实现独立于平台的网络价值' },
      { hid: 'og:title', property: 'og:title', content: '实现独立于平台的网络价值' },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://ssimg.frontenduse.top/avatar/2019/08/30/c1d6ae7ed4e6102cb45d0a8f656d5569.png' },
      { hid: 'og:description', name: 'description', property: 'og:description', content: '实现独立于平台的网络价值' },
      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'article' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/global.css',
    './assets/css/style.css',
    './assets/css/screen.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue_components.js',
    '~/plugins/element-ui.js',
    '~/plugins/combined-inject.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.forEach((rule) => { // 移除默认处理svg的配置
          if (~rule.test.source.indexOf('|svg')) {
            rule.exclude = [resolve('icons/svg')]
          }
        })
        config.module.rules.push(
          { // 使用svg
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('icons/svg')], // include => 只处理指定的文件夹下的文件
            options: {
              symbolId: 'icon-[name]'
            }
          })
        // console.log(config.module.rules)
      // set svg-sprite-loader end
      }
    },
    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false
      }
    },
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    },
    plugins: [
      new SpriteLoaderPlugin()
    ]
  }
}

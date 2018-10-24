const bodyParser = require('body-parser')
const session = require('express-session')
module.exports = {
	/*
  ** Headers of the page
  */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost'
  },
	head: {
		title: 'TNT-Project',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'LIMITLESS' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/tnticon.ico' },
			{
				rel: 'stylesheet',
				type: 'text/css',
				href:
					'https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900'
			}
		]
	},
	css: [
		'~/assets/css/icons/icomoon/styles.css',
		'~/assets/css/bootstrap.css',
		'~/assets/css/core.css',
		'~/assets/css/components.css',
		'~/assets/css/colors.css',
		'element-ui/lib/theme-chalk/index.css',
		'~/assets/css/style.css',
		'~/assets/css/pnotify.min.css'
	],
	/*
  ** Customize the progress bar color
  */
  loading: { color: 'red' },
	/*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/assets/js/core/jquery.min.js',
      '~/assets/js/core/bootstrap.min.js',
      '~/assets/js/core/pnotify.js',
      'jwt-decode',
      'element-ui',
      'axios',
      'lodash'
    ],
		/*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: [
    {src: '~/plugins/fireauth.js'},
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/moment.js' },
    { src: '~/plugins/vue-gmaps.js',ssr:false },
    { src: '~/plugins/vue-currency-filter.js' },
  ],
  router: {
    middleware: ['check-auth']
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'amdskfmdlkfdklfndfmdfndsmfndfnejnjheheuewytwgssa',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000, secure: false }
    }),
    '~/api'
  ]
};

import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    app: {
        // pageTransition: {name: 'page', mode: 'out-in'},
        // layoutTransition: {name: 'layout', mode: 'out-in'},
        head: {
            title: 'پنل مدیریت فروشگاه اینترنتی',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                {
                    name: 'description',
                    content: 'پنل مدیریت فروشگاه اینترنتی'
                }
            ],
            script: [],
            link: [],
            noscript: [{children: 'This website requires JavaScript.'}]
        }
    },
    ssr: false,
    css: ['~/assets/fontiran.css', '~/assets/scss/main.scss'],
    plugins: [],
    components: true,
    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_PUBLIC_API_URL,
        },
    },
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
        '@vite-pwa/nuxt',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        "nuxt-lodash",
        '@nuxt/image',
        '@sidebase/nuxt-auth'
    ],
    auth: {
        globalAppMiddleware: {
            isEnabled: true,
        },
        baseURL: process.env.NUXT_PUBLIC_API_URL || 'https://localhost:5001/',
        provider: {
            type: 'local',
            endpoints: {
                signIn: {path: '/Users/ApproveOtp', method: 'post'},
                getSession: {path: '/Users/Info', method: 'get'}
            },
            pages: {
                login: '/auth/login'
            },
            token: {
                signInResponseTokenPointer: '/successMessages/0/token',
                maxAgeInSeconds: 3600 * 24 * 30 * 365,
                sameSiteAttribute: 'lax',
                type: 'Bearer',
                headerName: "Authorization",
            },
            sessionDataType: {
                firstName: 'string',
                lastName: 'string',
                nationalCode: 'string',
                isActive: 'integer',
                lastModified: 'string',
                created: 'string',
                email: 'string',
                phoneNumber: 'string',
                isAdmin: 'boolean',
            }
        },
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        },
        storage: 'localStorage',
        debug: true
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config',
        injectPosition: 'last',
        viewer: true,
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Nuxt Vite PWA',
            short_name: 'NuxtVitePWA',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
    },

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})

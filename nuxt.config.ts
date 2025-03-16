// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: [
    "vuetify/lib/styles/main.sass",
    "assets/css/main.css",
    "assets/css/responsive.css",
  ],
  plugins: ["~/plugins/axios.js", "~/plugins/socialShare.ts"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@nuxt/image-edge", "nuxt-simple-sitemap", "nuxt-jsonld"],
  // modules: ["@nuxt/image-edge", "sitemap", "nuxt-jsonld"],
  app: {
    head: {
      title: "Chợ OTC Việt Nam - Mua bán USDT giá rẻ, uy tín số 1 Việt Nam",
      meta: [
        {
          name: "keywords",
          content:
            "mua bán usdt, bitcoin, btc, eth, otc, crypto, tỷ giá, ngoại tệ, giá vàng, chứng khoán",
        },
        {
          name: "news_keywords",
          content:
            "mua bán usdt, bitcoin, btc, eth, otc, crypto, tỷ giá, ngoại tệ, giá vàng, chứng khoán",
        },
        {
          name: "description",
          content:
            "Mua bán USDT giá rẻ, uy tín số 1 Việt Nam. Cập nhật tỷ giá & tin tức thị trường nhanh chóng, chính xác",
        },
        { hid: "og:title", property: "og:title", content: "Chợ OTC Việt Nam" },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Mua bán USDT giá rẻ, uy tín số 1 Việt Nam. Cập nhật tỷ giá & tin tức thị trường nhanh chóng, chính xác",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://chootc.com/img/thumbnail.jpg",
        },
        { hid: "og:url", property: "og:url", content: "https://chootc.com" },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "Chợ OTC Việt Nam",
        },
        { hid: "og:image:height", property: "og:image:height", content: "628" },
        { hid: "og:image:width", property: "og:image:width", content: "1200" },
        { hid: "og:type", property: "og:type", content: "article" },
        {
          name: "google-site-verification",
          content: "RVRV7yV3NVcrTJk9zPJLs3isxpN5erzbQk8dT7FDaDc",
        },
        { name: "robots", content: "index,follow,all" },
        { name: "copyright", content: "chootcvn" },
        { name: "distribution", content: "Global" },
        { name: "revisit-after", content: "1 days" },
        { name: "GENERATOR", content: "http://chootc.com" },
        { name: "author", content: "chootcvn" },
        { name: "site_path", content: "http://chootc.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Chợ OTC Việt Nam" },
        { name: "twitter:url", content: "https://chootc.com" },
        {
          name: "twitter:description",
          content:
            "Mua bán USDT giá rẻ, uy tín số 1 Việt Nam. Cập nhật tỷ giá & tin tức thị trường nhanh chóng, chính xác",
        },
        { name: "twitter:site", content: "@chootcvn" },
        { name: "twitter:creator", content: "@chootcvn" },
      ],
      link: [
        { rel: "icon", href: "https://chootc.com/img/logo.png" },
        { rel: "shortcut icon", href: "https://chootc.com/img/logo.png" },
        {
          rel: "apple-touch-icon",
          href: "https://chootc.com/img/logo.png",
          sizes: "114x114",
        },
        { rel: "canonical", href: "https://chootc.com" },
        { rel: "alternate", href: "https://chootc.com" },
      ],
      script: [
        {
          hid: "gtm-script1",
          src: "https://www.googletagmanager.com/gtag/js?id=G-VZ17QS1KLX",
          defer: true,
        },
        {
          hid: "gtm-script2",
          innerHTML: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                
                    gtag('config', 'G-VZ17QS1KLX');
                    `,
          type: "text/javascript",
        },
      ],
      htmlAttrs: {
        lang: "vi",
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/feed.xml", "/sitemap.xml"],
    },
  },
  sitemap: {
    siteUrl: "https://chootc.com",
  },
});

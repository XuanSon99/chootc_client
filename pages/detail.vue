<template>
  <main class="news detail">
    <div class="mowtainer">
      <div class="space mowpad">
        <div class="main-content">
          <div v-if="info.title">
            <h1>
              {{ info.title }}
            </h1>
            <p class="author">
              <span>
                <i class="fas fa-user-edit"></i>
                {{ info.author || "Admin" }}
              </span>
              <span>
                <i class="far fa-calendar-alt"></i>
                {{ formatTime(info.created_at) }}
              </span>
            </p>
            <div class="details">
              <div v-html="configBody(info.created_at, info.body)"></div>
              <div v-if="checkToAddFoot(info.created_at)">
                <br>
                <p>Hy vọng bài viết sẽ mang đến cho bạn đọc những kiến thức hữu ích. Đừng quên liên hệ ngay với Admin <a
                    href="https://chootc.com" target="_blank" rel="noopener noreferrer">chợ OTC Việt Nam</a> nếu quý khách
                  đang có nhu cầu mua bán <a
                    href="https://chootc.com/dong-tether-usdt-la-gi-cach-phan-biet-mang-luoi-blockchain" target="_blank"
                    rel="noopener noreferrer">USDT</a> giá tốt và uy tín nhất tại Việt Nam.</p>
                <p><i>Tham gia giao dịch OTC tại:</i></p>
                <ul>
                  <li>Telegram: <a href="https://t.me/chootcvn" target="_blank" rel="noopener noreferrer">@chootcvn</a>
                  </li>
                  <li>Website: <a href="https://chootc.com" target="_blank" rel="noopener noreferrer">chootc.com</a></li>
                  <li>Facebook: <a href="https://www.facebook.com/chootcvietnam" target="_blank"
                      rel="noopener noreferrer">fb.com/chootcvietnam</a></li>
                </ul>
                <div>
                  <!-- <ShareNetwork network="facebook" url="https://news.vuejs.org/issues/180"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                    Share on Facebook
                  </ShareNetwork> -->
                </div>
              </div>
            </div>
          </div>
          <div class="details loader" v-else></div>
        </div>
        <div class="feature" v-if="post_list.data[0]">
          <h1>Bài viết mới nhất</h1>
          <div class="space" v-for="(item, index) in post_list.data" :key="index">
            <nuxt-img format="webp" :src="$image(item.image)" loading="lazy" alt="" />
            <div class="title">
              <h3 @click="toDetail(item.slug)">{{ formatTitle(item.title) }}</h3>
              <p class="space">
                <span>
                  <i class="far fa-calendar-alt"></i>
                  {{ formatTime(item.created_at) }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="feature" v-else>
          <h1>Bài viết mới nhất</h1>
          <div class="loader" v-for="i in 6" :key="i"></div>
        </div>
      </div>
      <div v-if="related_list.data[0]">
        <div class="mowtit big-title">
          Bài viết liên quan
        </div>
        <div class="mowgrid">
          <div class="item" v-for="(item, index) in related_list.data" :key="index">
            <div class="image">
              <nuxt-img format="webp" :src="$image(item.image)" @click="toDetail(item.slug)" :alt="item.title"
                loading="lazy" />
            </div>
            <div class="content">
              <h2 @click="toDetail(item.slug)">{{ item.title }}</h2>
              <div class="space">
                <p class="author">
                  <i class="fas fa-user-edit"></i>
                  <span>{{ item.author || "Admin" }}</span>
                </p>
                <p class="time">
                  <i class="far fa-calendar-alt"></i>
                  <span>{{ formatTime(item.created_at) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <router-link tag="div" class="btn-all shadow" :to="'/danh-muc/' + info.category">
          Đọc thêm
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import moment from "moment";

const api_url = 'https://hi.muabanusdt.xyz/api'
const { id } = useRoute().params

const { data: info } = await useFetch(`${api_url}/posts/${id}`)

const { data: post_list } = await useFetch(`${api_url}/posts`)

const { data: related_list } = await useFetch(`${api_url}/categories/${info.value.category}`)

const formatTitle = (value) => {
  if (!value) return
  let array = value.split(" ")
  if (array.length <= 10) {
    return value
  }
  return array.slice(0, 10).join(" ") + "..."
}

const formatTime = (date) => {
  var value = new Date(date);
  if (!date) return;
  return moment(value).format("MMMM D, YYYY");
}

const toDetail = (slug) => {
  const router = useRouter();
  router.push("/" + slug);
}

const configBody = (date, body) => {
  const time = new Date(date).getTime()
  if (time < 1684400071000) {
    return body.replaceAll('<img src=\"https://chootc.com', '<img src=\"https://api.chootc.com')
  }
  return body
}

const checkToAddFoot = (date) => {
  const time = new Date(date).getTime()
  if (time >= 1685758964000) {
    return true
  }
  return false
}

const default_keywords = 'mua bán usdt, bitcoin, btc, eth, otc, crypto, tỷ giá, ngoại tệ, giá vàng, chứng khoán'
const keywords = info.value.meta_keywords ? info.value.meta_keywords.replaceAll("\r\n", ", ") : default_keywords

useHead({
  title: info.value.title,
  meta: [
    { hid: 'og:title', property: 'og:title', content: info.value.title },
    { name: 'description', content: info.value.meta_description },
    { hid: 'og:description', property: 'og:description', content: info.value.meta_description },
    { name: 'keywords', content: keywords },
    { name: 'news_keywords', content: keywords },
    { hid: 'og:image', property: 'og:image', content: `https://api.chootc.com/storage${info.value.image}` },
    { name: 'twitter:title', content: info.value.title },
    { name: 'twitter:description', property: 'og:description', content: info.value.meta_description },
    { name: 'twitter:image', content: `https://api.chootc.com/storage${info.value.image}` },
    { name: 'twitter:url', content: `https://chootc.com/${info.value.slug}` },
  ],
  link: [
    { rel: 'canonical', href: `https://chootc.com/${info.value.slug}` },
    { rel: 'alternate', href: `https://chootc.com/${info.value.slug}` }
  ],
})

useJsonld([
  {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://chootc.com"
        }
      ],
      [
        {
          "@type": "ListItem",
          "position": 2,
          "name": info.value.cate_name,
          "item": `https://chootc.com/danh-muc/${info.value.category}`
        }
      ],
    ]
  },
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@context": "http://schema.org",
      "@type": "WebPage",
      "@id": `https://chootc.com/${info.value.slug}`
    },
    "headline": info.value.title,
    "description": info.value.meta_description,
    "image": {
      "@context": "http://schema.org",
      "@type": "ImageObject",
      "url": `https://api.chootc.com/storage${info.value.image}`,
    },
    "author": {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": info.value.author,
      "url": "https://dantri.com.vn"
    },
    "datePublished": info.value.created_at,
    "dateModified": info.value.created_at,
    "publisher": {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Chợ OTC Việt Nam",
      "logo": {
        "@context": "http://schema.org",
        "@type": "ImageObject",
        "url": "https://chootc.com/img/logo.png",
        "height": "60px",
        "width": "60px"
      }
    },
    "about": keywords.split(", ")
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": info.value.title,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "ratingCount": info.value.body.split(" ").length
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://chootc.com",
    "logo": 'https://chootc.com/img/logo.png'
  },
]);

</script>

<style></style>
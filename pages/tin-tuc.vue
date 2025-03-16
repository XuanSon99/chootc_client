<template>
  <main class="blog">
    <Head>
      <Title>Chợ OTC Việt Nam | Tin tức tài chính mới nhất</Title>
      <Meta name="description" content="Tin tức cập nhật thị trường tài chính Việt Nam, tài chính quốc tế, chính sách tiền tệ của ngân hàng nhà nước, tỷ giá, lãi suất, giá vàng, thị trường ngoại hối."></Meta>
      <Meta hid="og:description" property="og:description" content="Tin tức cập nhật thị trường tài chính Việt Nam, tài chính quốc tế, chính sách tiền tệ của ngân hàng nhà nước, tỷ giá, lãi suất, giá vàng, thị trường ngoại hối."></Meta>
    </Head>
    <section class="news mowpad">
      <div class="mowtainer">
        <div class="blog-head">
          <div class="mowtit big-title">
            {{ cateName }}
          </div>
          <div v-if="title" class="search-title">
            <span>Tìm kiếm: {{ title }}</span>
          </div>
          <div v-if="!postList[0]" class="search-title">
            <span>Hiện chưa có bài viết nào</span>
          </div>
        </div>
        <div class="mowgrid" v-if="postList[0]">
          <div class="item" v-for="(item, index) in postList" :key="index">
            <div class="image">
              <nuxt-img format="webp"
                :src="$image(item.image)"
                @click="toDetail(item.slug)"
                :alt="item.title"
                loading="lazy"
              />
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
        <div class="mowgrid" v-else>
          <div class="item loader" v-for="i in 6" :key="i"></div>
        </div>
        <v-pagination
          class="mt-10"
          v-if="total_post"
          v-model="page"
          :length="total_post"
          :total-visible="7"
        >
        </v-pagination>
      </div>
    </section>
  </main>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      postList: [],
      query: "",
      title: "",
      cateName: "Tin tức",
      page: 1,
      total_post: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    toDetail(slug) {
      this.$router.push("/" + slug);
    },
    getList() {
      if (this.$route.path.includes("danh-muc/")) {
        this.$callAPI(
          "get",
          `categories/${this.$route.params.id}?page=${this.page}`,
          {},
          (res) => {
            if (!res.data.data[0]) {
              return;
            }
            this.cateName = res.data.data[0].cate_name;
            this.postList = res.data.data;
            this.total_post = Math.ceil(res.data.total / 6);
          }
        );
        return;
      }
      if (this.$route.path.includes("tim-kiem")) {
        this.query = this.$route.params.id;
        this.searchHandle();
        return;
      }
      this.$callAPI(
        "get",
        `posts?page=${this.page}`,
        {},
        (res) => {
          if (!res.data.data[0]) {
            return;
          }
          this.postList = res.data.data;
          this.total_post = Math.ceil(res.data.total / 6);
        }
      );
    },
    searchHandle() {
      if (!this.query) return;
      this.title = this.query;
      this.$callAPI(
        "get",
        `search?query=${this.$route.params.id}`,
        {},
        (res) => {
          if (!res.data.data[0]) {
            return;
          }
          this.postList = res.data.data;
          this.total_post = 0;
          if (!res.data.status) {
            this.title = this.query + " không có kết quả";
          }
        }
      );
    },
    formatTime(date) {
      var value = new Date(date);
      if (!date) return;
      return moment(value).format("MMMM D, YYYY");
    },
  },
  watch: {
    page() {
      if (!this.title || this.page > 1) {
        this.getList();
        return;
      }
      this.searchHandle();
    },
    $route() {
      this.getList();
      this.cateName = "Tin tức";
      this.postList = [];
      this.query = "";
      this.title = "";
      this.page = 1;
    },
  },
};
</script>

<style></style>
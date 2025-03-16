<template>
  <main>

    <Head>
      <Title>Chợ OTC Việt Nam | Bảng giá thị trường chứng khoán trực tuyến hôm nay</Title>
      <Meta name="description" content="Thông tin bảng giá thị trường chứng khoán trực tuyến hôm nay. Tìm hiểu cách chơi, cách đầu tư, giá cổ phiếu, tin nhanh chứng khoán."></Meta>
      <Meta hid="og:description" property="og:description" content="Thông tin bảng giá thị trường chứng khoán trực tuyến hôm nay. Tìm hiểu cách chơi, cách đầu tư, giá cổ phiếu, tin nhanh chứng khoán."></Meta>
    </Head>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit mb-2">
              <span>Chứng khoán</span>
              <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="getStock" aria-label="Làm mới">
                <v-icon size="25">mdi:mdi-cached</v-icon>
              </v-btn>
            </div>
          </div>
          <v-data-table :headers="headers.stock" :items="stock" :page.sync="page.stock" :items-per-page="7"
            hide-default-footer :mobile-breakpoint="0">
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.columns.code }}
                </td>
                <td>
                  {{ item.columns.name }}
                </td>
                <td>
                  {{ item.columns.price }}
                </td>
                <td>
                  <span :class="{
                    'price-up': item.columns.change.includes('+') ? true : false,
                    'price-down': item.columns.change.includes('-') ? true : false,
                  }">
                    {{ item.columns.change.substring(1) }}
                  </span>
                  <span class="ml-2">{{ item.columns.time }}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-pagination class="pt-3" v-model="page.stock" :length="Math.ceil(stock.length / 7)">
          </v-pagination>
        </div>
      </div>
    </section>
    <section class="news mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức thị trường</span>
          </div>
          <v-btn icon color="primary" size="35" variant="text" to="/danh-muc/tin-tuc-thi-truong"
            aria-label="Tin tức thị trường">
            <v-icon size="25">mdi:mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="mowgrid" v-if="crypto_post[0]">
          <div class="item" v-for="(item, index) in crypto_post.slice(0, 3)" :key="index">
            <div class="image">
              <nuxt-img format="webp" :src="$image(item.image)" @click="toDetail(item.slug)" :alt="item.title"
                loading="lazy" alt="" />
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
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      stock: [],
      headers: {
        stock: [
          { title: 'Mã', key: 'code', sortable: false },
          { title: 'Tên', key: 'name', sortable: false },
          { title: 'Giá', key: 'price', sortable: false },
          { title: 'Biến động', key: 'change', sortable: false },
          { key: "time" },
        ],
      },
      page: {
        stock: 1
      },
      crypto_post: []
    };
  },
  mounted() {
    this.getStock();
    this.getPost();
  },
  methods: {
    getPost() {
      this.$callAPI(
        "get",
        "categories/tin-tuc-thi-truong",
        {},
        (res) => {
          this.crypto_post = res.data.data;
        }
      );
    },
    getStock() {
      this.stock = []
      this.$callAPI("get", "rate/stock", {}, (res) => {
        this.stock = res.data;
      });
    },
    formatPrice(value) {
      if (!value) return 0;
      let val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatVNPrice(value) {
      if (!value) return 0;
      return String(parseFloat(value).toFixed(0))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatNumber(value) {
      if (Number.isInteger(value)) return value;
      return value.toFixed(2);
    },
    formatTime(date) {
      var value = new Date(date);
      if (!date) return;
      return moment(value).format("MMMM D, YYYY");
    },
    toDetail(slug) {
      this.$router.push("/" + slug);
    },
  },
};
</script>

<style></style>
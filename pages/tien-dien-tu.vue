<template>
  <main>
    <Head>
      <Title>Chợ OTC Việt Nam | Tiền điện tử</Title>
      <Meta name="description" content="Giá BTC, ETH, BNB, XRP, ADA, ... Tin tức crypto mới nhất."></Meta>
      <Meta hid="og:description" property="og:description" content="Giá BTC, ETH, BNB, XRP, ADA, ... Tin tức crypto mới nhất."></Meta>
    </Head>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit">
              <span>Crypto</span>
              <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="getCoin" aria-label="Làm mới">
                <v-icon size="25">mdi:mdi-cached</v-icon>
              </v-btn>
            </div>
            <v-responsive max-width="220">
              <v-text-field v-model="search" label="Tìm kiếm" variant="underlined" color="primary"
                  append-inner-icon="mdi:mdi-magnify">
                </v-text-field>
            </v-responsive>
          </div>
          <v-data-table :headers="headers.crypto" :items="crypto" :search="search" :page.sync="page.usdt_crypto"
            :items-per-page="10" hide-default-footer :mobile-breakpoint="0">
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  <div class="align-center">
                    <nuxt-img format="webp" :src="item.columns.image" class="table-image" alt="" loading="lazy" />
                    <span class="ml-2">{{ item.columns.symbol.toUpperCase() }}</span>
                  </div>
                </td>
                <td>
                  {{ formatPrice(item.columns.current_price) }}
                </td>
                <td>
                  <div :class="{
                    'price-up':
                      item.columns.price_change_percentage_24h > 0 ? true : false,
                    'price-down':
                      item.columns.price_change_percentage_24h < 0 ? true : false,
                  }">
                    {{
                      formatNumber(Math.abs(item.columns.price_change_percentage_24h))
                    }}
                    %
                  </div>
                </td>
                <td>
                  ${{ formatVNPrice(item.columns.market_cap) }}
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-pagination class="pt-3" v-model="page.usdt_crypto" :length="Math.ceil(crypto.length / 10)">
          </v-pagination>
        </div>
      </div>
    </section>
    <section class="news mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức crypto</span>
          </div>
          <v-btn icon color="primary" size="35" variant="text" to="/danh-muc/crypto" aria-label="Crypto">
            <v-icon size="25">mdi:mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="mowgrid" v-if="crypto_post[0]">
          <div class="item" v-for="(item, index) in crypto_post.slice(0, 3)" :key="index">
            <div class="image">
              <nuxt-img format="webp" :src="$image(item.image)" @click="toDetail(item.slug)" :alt="item.title" loading="lazy" />
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
      search: '',
      crypto: [],
      headers: {
        crypto: [
          { title: 'Tên', key: 'symbol', sortable: false },
          { title: 'Giá', key: 'current_price', sortable: false },
          { title: '24h', key: 'price_change_percentage_24h', sortable: false },
          { title: 'Vốn hóa', key: 'market_cap', sortable: false },
          { key: "image" },
        ],
      },
      page: {
        usdt_crypto: 1,
      },
      crypto_post: []
    };
  },
  mounted() {
    this.getCoin();
    this.getPost();
  },
  methods: {
    getPost() {
      this.$callAPI(
        "get",
        "categories/crypto",
        {},
        (res) => {
          this.crypto_post = res.data.data;
        }
      );
    },
    getCoin() {
      this.crypto = []
      this.$callAPI("get", "coins", {}, (res) => {
        this.crypto = res.data;
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
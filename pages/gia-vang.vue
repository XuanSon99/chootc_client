<template>
  <main>
    <Head>
      <Title>Chợ OTC Việt Nam | Giá vàng trong nước và thế giới</Title>
      <Meta name="description" content="Cập nhật giá vàng trong nước và thế giới. Tin tức giá vàng mới nhất."></Meta>
      <Meta hid="og:description" property="og:description" content="Cập nhật giá vàng trong nước và thế giới. Tin tức giá vàng mới nhất."></Meta>
    </Head>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="mowgrid grid-bot">
          <div class="item pd-30">
            <div class="space">
              <div class="mowtit mb-2">
                <span>Giá vàng</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="getGold" aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
            </div>
            <v-data-table class="gold-price" :headers="headers.gold" :items="gold" :page.sync="page.gold"
              :items-per-page="8" hide-default-footer :mobile-breakpoint="0">
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.columns.name }}</td>
                  <td>
                    <span v-if="item.columns.name == 'Thế giới'">
                      ${{ formatPrice(item.columns.buy) }}
                    </span>
                    <span class="mr-1" v-else>{{ formatVNPrice(item.columns.buy) }}</span>
                    <span v-if="item.columns.buy_change" :class="{
                      'price-up': item.columns.buy_change > 0 ? true : false,
                      'price-down': item.columns.buy_change < 0 ? true : false,
                    }">
                      {{ Math.abs(item.columns.buy_change) }}
                    </span>
                  </td>
                  <td>
                    <span v-if="item.columns.name == 'Thế giới'">
                      ${{ formatPrice(item.columns.sell) }}
                    </span>
                    <span class="mr-1" v-else>{{ formatVNPrice(item.columns.sell) }}</span>
                    <span v-if="item.columns.sell_change" :class="{
                      'price-up': item.columns.sell_change > 0 ? true : false,
                      'price-down': item.columns.sell_change < 0 ? true : false,
                    }">
                      {{ Math.abs(item.columns.sell_change) }}
                    </span>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-pagination class="pt-3" v-model="page.gold" :length="Math.ceil(gold.length / 8)">
            </v-pagination>
          </div>
          <div class="item pd-30">
            <div class="mowtit mb-6">
              <span>Quy đổi giá vàng</span>
            </div>
            <v-text-field variant="outlined" class="mb-3" color="primary" label="Số lượng"
              v-model="amount"></v-text-field>
            <v-autocomplete label="Mua/bán" variant="outlined" class="mb-3" color="primary" :items="types"
              item-title="title" item-value="value" v-model="type">
            </v-autocomplete>
            <v-autocomplete label="Loại vàng" variant="outlined" class="mb-3" color="primary" :items="gold"
              item-title="name" v-model="from" return-object>
            </v-autocomplete>
            <div class="justify-center flex mb-7">
              <v-btn icon color="primary" class="ml-2" size="35" variant="text" aria-label="Chuyển đổi">
                <v-icon size="25">mdi:mdi-arrow-down</v-icon>
              </v-btn>
            </div>
            <v-text-field variant="outlined" class="mb-3" color="primary" label="Thành tiền" v-model="result"
              readonly></v-text-field>
            <v-btn color="primary" size="large" variant="outlined" class="mb-3" block @click="convertHandle" aria-label="Chuyển đổi">Chuyển
              đổi</v-btn>
          </div>
        </div>
      </div>
    </section>
    <section class="news relative mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức thị trường</span>
          </div>
          <v-btn icon color="primary" size="35" variant="text" to="/danh-muc/tin-tuc-thi-truong" aria-label="Tin tức thị trường">
            <v-icon size="25">mdi:mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="mowgrid" v-if="market_post[0]">
          <div class="item" v-for="(item, index) in market_post.slice(0, 3)" :key="index">
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
      gold: [],
      headers: {
        gold: [
          { title: 'Tên', key: 'name', sortable: false },
          { title: 'Giá Mua', key: 'buy', sortable: false },
          { title: 'Giá Bán', key: 'sell', sortable: false },
          { key: "sell_change" },
          { key: "buy_change" },
        ],
      },
      page: {
        gold: 1,
      },
      amount: 1,
      from: "",
      result: "",
      type: "buy",
      types: [
        {
          title: "Mua",
          value: "buy"
        },
        {
          title: "Bán",
          value: "sell"
        }
      ],
      market_post: []
    };
  },
  mounted() {
    this.getGold();
    this.getPost();
  },
  methods: {
    convertHandle() {
      if (this.from.name == this.gold[0].name) {
        let usd = (Number(this.bank[0].buy.replace(",", "")) + Number(this.bank[0].sell.replace(",", ""))) / 2
        this.result = this.formatPrice(this.amount * Number(this.from.buy) * usd)
        return
      }
      if (this.type == 'buy') {
        this.result = this.formatVNPrice(this.amount * Number(this.from.buy) * 1000)
        return
      }
      this.result = this.formatVNPrice(this.amount * Number(this.from.sell) * 1000)
    },
    getPost() {
      this.$callAPI(
        "get",
        "categories/tin-tuc-thi-truong",
        {},
        (res) => {
          this.market_post = res.data.data;
        }
      );
    },
    getGold() {
      this.gold = []
      this.$callAPI("get", "rate/gold", {}, (res) => {
        this.gold = res.data;
        this.from = res.data[0]
        this.$callAPI("get", "rate/bank", {}, (res) => {
          this.bank = res.data;
          this.bank.unshift(res.data[19])
          this.bank.splice(-1)
          this.convertHandle()
        });
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
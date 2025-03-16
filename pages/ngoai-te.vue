<template>
  <main>
    <Head>
      <Title>Chợ OTC Việt Nam | Tỷ giá ngoại tệ</Title>
      <Meta name="description" content="Cập nhật tỷ giá ngoại tệ ngân hàng, thế giới. Lực mua bán thị trường."></Meta>
      <Meta hid="og:description" property="og:description" content="Cập nhật tỷ giá ngoại tệ ngân hàng, thế giới. Lực mua bán thị trường."></Meta>
    </Head>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="mowgrid grid-bot">
          <div class="item pd-30">
            <div class="space mb-5">
              <div class="mowtit">
                <span>Tỷ giá ngoại tệ</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(1)" aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-tabs v-model="rate_tab" color="primary" right>
                <v-tab value="1">Ngân hàng</v-tab>
                <v-tab value="2">Thế giới</v-tab>
              </v-tabs>
            </div>
            <v-window v-model="rate_tab">
              <v-window-item value="1">
                <v-data-table :headers="headers.bank" :items="bank" :page.sync="page.bank_rate" :items-per-page="8"
                  hide-default-footer :mobile-breakpoint="0">
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.columns.code }}</td>
                      <td><span class="up-color">{{ item.columns.buy }}</span></td>
                      <td>{{ item.columns.transfer }}</td>
                      <td><span class="down-color">{{ item.columns.sell }}</span></td>
                    </tr>
                  </template>
                </v-data-table>
                <v-pagination class="pt-3" v-model="page.bank_rate" :length="Math.ceil(bank.length / 8)">
                </v-pagination>
              </v-window-item>
              <v-window-item value="2">
                <v-data-table :headers="headers.world" :items="world" hide-default-footer :mobile-breakpoint="0">
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.columns.name }}</td>
                      <td>{{ item.columns.buy.toFixed(5) }}</td>
                      <td>
                        <div :class="{
                          'price-up': item.columns.change > 0 ? true : false,
                          'price-down': item.columns.change < 0 ? true : false,
                        }">
                          {{ Math.abs(item.columns.change) }} %
                        </div>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-window-item>
            </v-window>
          </div>
          <div class="item pd-30">
            <div class="mowtit mb-10 mt-2">
              <span>Quy đổi ngoại tệ</span>
            </div>
            <v-text-field variant="outlined" class="mb-3" color="primary" label="Số lượng"
              v-model="amount"></v-text-field>
            <v-autocomplete label="Mua/bán" variant="outlined" class="mb-3" color="primary" :items="types"
              item-title="title" item-value="value" v-model="type">
            </v-autocomplete>
            <v-autocomplete label="Loại tiền tệ" variant="outlined" class="mb-3" color="primary" :items="bank"
              item-title="code" v-model="from" return-object>
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
    <section class="mt-8">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit mb-2">
              <span>Lực thị trường</span>
              <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(4)" aria-label="Làm mới">
                <v-icon size="25">mdi:mdi-cached</v-icon>
              </v-btn>
            </div>
          </div>
          <v-data-table class="market-force" :headers="headers.market_force" :items="market_force" hide-default-footer
            :mobile-breakpoint="0">
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.columns.name }}
                </td>
                <td>
                  {{ item.columns.price }}
                </td>
                <td>
                  <div :class="{
                    'up-color': item.columns.five_minutes.includes('Mua')
                      ? true
                      : false,
                    'down-color': item.columns.five_minutes.includes('Bán')
                      ? true
                      : false,
                  }">
                    {{ item.columns.five_minutes }}
                  </div>
                </td>
                <td>
                  <div :class="{
                    'up-color': item.columns.fifteen_minutes.includes('Mua')
                      ? true
                      : false,
                    'down-color': item.columns.fifteen_minutes.includes('Bán')
                      ? true
                      : false,
                  }">
                    {{ item.columns.fifteen_minutes }}
                  </div>
                </td>
                <td>
                  <div :class="{
                    'up-color': item.columns.one_hour.includes('Mua') ? true : false,
                    'down-color': item.columns.one_hour.includes('Bán')
                      ? true
                      : false,
                  }">
                    {{ item.columns.one_hour }}
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
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
      bank: [],
      world: [],
      market_force: [],
      headers: {
        bank: [
          { title: 'Tên', key: 'code', sortable: false },
          { title: 'Giá Mua', key: 'buy', sortable: false },
          { title: 'Chuyển Khoản', key: 'transfer', sortable: false },
          { title: 'Giá Bán', key: 'sell', sortable: false },
        ],
        world: [
          { title: 'Tên', key: 'name', sortable: false },
          { title: 'Giá', key: 'buy', sortable: false },
          { title: 'Thay đổi', key: 'change', sortable: false },
        ],
        market_force: [
          { title: 'Tên', key: 'name', sortable: false },
          { title: 'Giá', key: 'price', sortable: false },
          { title: '5m', key: 'five_minutes', sortable: false },
          { title: '15m', key: 'fifteen_minutes', sortable: false },
          { title: '1h', key: 'one_hour', sortable: false },
        ],
      },
      rate_tab: 0,
      page: {
        bank_rate: 1,
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
        },
        {
          title: "Chuyển khoản",
          value: "transfer"
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    convertHandle() {
      if (this.type == 'buy') {
        this.result = this.amount * Number(this.from.buy.replace(",", ""))
      }
      if (this.type == 'sell') {
        this.result = this.amount * Number(this.from.sell.replace(",", ""))
      }
      if (this.type == 'transfer') {
        this.result = this.amount * Number(this.from.transfer.replace(",", ""))
      }
      this.result = this.formatPrice(this.result)
    },
    refreshHandle(value) {
      if (value == 1) {
        this.bank = []
        this.world = []
        this.getBank();
        this.getWorld();
      }
      if (value == 4) {
        this.market_force = []
        this.getMarketForce();
      }
    },
    getList() {
      this.getBank();
      this.getWorld();
      this.getMarketForce();
    },
    getBank() {
      this.$callAPI("get", "rate/bank", {}, (res) => {
        this.bank = res.data;
        this.bank.unshift(res.data[19])
        this.bank.splice(-1)
        this.from = this.bank[0]
        this.convertHandle()
      });
    },
    getWorld() {
      this.$callAPI("get", "rate/world", {}, (res) => {
        this.world = res.data;
      });
    },
    getMarketForce() {
      this.$callAPI("get", "rate/market-force", {}, (res) => {
        this.market_force = res.data;
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
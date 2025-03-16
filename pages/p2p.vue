<template>
    <main>
      <v-container class="mt-3">
        <v-row>
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title class="pb-0">
                <span class="buy">Mua</span>
                <v-spacer></v-spacer>
                <div class="averate">Giá TB: ({{ formatVNPrice(buy_price) }} + {{ formatVNPrice(sell_price) }}) / 2 = {{
                  averageRate }}</div>
              </v-card-title>
              <v-data-table :headers="headers" :items="buy_data" :items-per-page="20"
                :footer-props="{ 'items-per-page-options': [20, 20] }" :page.sync="page.buy"
                :server-items-length="totalItems">
                <template v-slot:[`item.name`]="{ item }">
                  <div class="align-center d-flex name mb-1">
                    <span class="mr-1">{{ item.advertiser.nickName }}</span>
                    <!-- <img src="/img/authentication_icon.svg" alt="" v-if="item.adv.classify == 'profession'"> -->
                  </div>
                  <div class="overview">
                    <span class="mr-2">{{ formatVNPrice(item.advertiser.monthOrderCount) }} lệnh</span>
                    <span>{{ toFixedValue(item.advertiser.monthFinishRate * 100) }}% hoàn tất</span>
                  </div>
                </template>
                <template v-slot:[`item.price`]="{ item }">
                  <div class="price" @click="buy_price = item.adv.price">{{ formatVNPrice(item.adv.price) }}
                    <span>VND</span>
                  </div>
                </template>
                <template v-slot:[`item.limit`]="{ item }">
                  <div class="limit">
                    <div class="mb-1">Khả dụng: <b>{{ formatPrice(item.adv.tradableQuantity) }} USDT</b></div>
                    <div>
                      <span>Giới hạn: <b>₫{{ formatPrice(item.adv.minSingleTransAmount) }}</b></span>
                      -
                      <span>
                        <b>₫{{ formatPrice(item.adv.dynamicMaxSingleTransAmount) }}</b>
                      </span>
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.payments`]="{ item }">
                  <div class="payments" v-for="(method, index) in item.adv.tradeMethods.slice(0, 2)" :key="index"
                    :style="{ color: method.tradeMethodBgColor }">
                    {{ method.tradeMethodName }}
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title class="pb-0">
                <span class="sell">Bán</span>
                <v-spacer></v-spacer>
                <div class="averate">Số dư: {{ balance }}</div>
              </v-card-title>
              <v-data-table :headers="headers" :items="sell_data" :items-per-page="20"
                :footer-props="{ 'items-per-page-options': [20, 20] }" :page.sync="page.sell"
                :server-items-length="totalItems">
                <template v-slot:[`item.name`]="{ item }">
                  <div class="align-center d-flex name mb-1">
                    <span class="mr-1">{{ item.advertiser.nickName }}</span>
                    <!-- <img src="/img/authentication_icon.svg" alt="" v-if="item.adv.classify == 'profession'"> -->
                  </div>
                  <div class="overview">
                    <span class="mr-2">{{ formatVNPrice(item.advertiser.monthOrderCount) }} lệnh</span>
                    <span>{{ toFixedValue(item.advertiser.monthFinishRate * 100) }}% hoàn tất</span>
                  </div>
                </template>
                <template v-slot:[`item.price`]="{ item }">
                  <div class="price" @click="sell_price = item.adv.price">{{ formatVNPrice(item.adv.price) }}
                    <span>VND</span>
                  </div>
                </template>
                <template v-slot:[`item.limit`]="{ item }">
                  <div class="limit">
                    <div class="mb-1">Khả dụng: <b>{{ formatPrice(item.adv.tradableQuantity) }} USDT</b></div>
                    <div>
                      <span>Giới hạn: <b>₫{{ formatPrice(item.adv.minSingleTransAmount) }}</b></span>
                      -
                      <span>
                        <b>₫{{ formatPrice(item.adv.dynamicMaxSingleTransAmount) }}</b>
                      </span>
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.payments`]="{ item }">
                  <div class="payments" v-for="(method, index) in item.adv.tradeMethods.slice(0, 2)" :key="index"
                    :style="{ color: method.tradeMethodBgColor }">
                    {{ method.tradeMethodName }}
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <!-- <div class="d-flex justify-center align-center mt-5">
          <v-btn class="primary mr-3" @click="refreshHandle">Làm mới</v-btn>
          <v-card class="d-flex align-center justify-center" width="180">
            <v-checkbox v-model="is_refresh"></v-checkbox>
            <span class="mr-1">Làm mới sau</span>
            <span v-if="refresh == 0">
              <v-progress-circular :width="3" :size="13" color="blue" indeterminate></v-progress-circular>
            </span>
            <span v-else>{{ refresh }}s</span>
          </v-card>
        </div> -->
      </v-container>
    </main>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Tên',
            value: 'name',
            sortable: false
          },
          { text: 'Giá', value: 'price', sortable: false },
          { text: 'Giới hạn/Khả dụng', value: 'limit', sortable: false },
          { text: 'Thanh toán', value: 'payments', sortable: false },
        ],
        buy_search: "",
        buy_data: [],
        sell_search: "",
        sell_data: [],
        buy_top: [],
        sell_top: [],
        refresh: 10,
        is_refresh: false,
        totalItems: 99,
        page: {
          buy: 1,
          sell: 1
        },
        setInter: "",
        buy_price: 0,
        sell_price: 0,
        balance: 0
      }
    },
    computed: {
      averageRate() {
        return this.formatVNPrice(Math.round((Number(this.buy_price) + Number(this.sell_price)) / 2))
      }
    },
    mounted() {
      this.getBuyPrice()
      this.getSellPrice()
      // this.getBalance()
      setInterval(() => {
        this.getBuyPrice()
        this.getSellPrice()
      }, 5000);
      setInterval(() => {
        this.getBalance()
      }, 30000);
    },
    methods: {
      getBalance() {
        axios.get("https://apilist.tronscan.org/api/account?address=TLd1GNEvc3f3av3Q6vPNS6KARbdA5ge5tQ").then((res) => {
          let a = res.data.trc20token_balances.filter((i) => i.tokenId == "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
          this.balance = this.formatVNPrice(Math.round(parseFloat(a[0].balance) * Math.pow(10, -6)))
        })
      },
      getBuyPrice() {
        let params = `https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search`
        let data = {
          asset: 'USDT',
          fiat: 'VND',
          page: this.page.buy,
          rows: 20,
          tradeType: 'BUY',
          merchantCheck: true,
          publisherType: null,
        }
        // this.CallAPI("post", params, data, (res) => {
        //   this.buy_data = res.data.data
        // })
        axios.post(params, data).then((res) => {
          this.buy_data = res.data.data
        })
      },
      getSellPrice() {
        let params = `https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search`
        let data = {
          asset: 'USDT',
          fiat: 'VND',
          page: this.page.sell,
          rows: 20,
          tradeType: 'SELL',
          merchantCheck: true,
          publisherType: null,
        }
        axios.post(params, data).then((res) => {
          this.sell_data = res.data.data
        })
      },
      formatVNPrice(value) {
        let val = (value / 1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      toFixedValue(value) {
        if (Number.isInteger(value)) {
          return value
        }
        return value.toFixed(2)
      }
    },
    watch: {
      "page.buy"() {
        this.getBuyPrice()
      },
      "page.sell"() {
        this.getSellPrice()
      },
    }
  };
  </script>
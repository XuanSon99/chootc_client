<template>
  <main class="home">
    <section class="banner">
      <div class="mowtainer">
        <div class="space">
          <div class="content">
            <h1>
              Cập nhật
              <br />
              <span>tỷ giá</span> &
              <span>tin tức
                <br />
                thị trường</span>
              nhanh chóng
            </h1>
          </div>
          <div class="image">
            <!-- <img src="/img/home/banner.gif" alt="" /> -->
            <video autoplay loop muted playsinline>
              <source src="/img/home/banner.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </section>
    <section class="relative">
      <div class="mowtainer">
        <div class="mowgrid grid-top">
          <div class="item exchange">
            <div class="flex">
              <div :class="{ tab: true, active: tab == index }" v-for="(item, index) in tabs" :key="index"
                @click="tab = index">
                {{ item }}
              </div>
            </div>
            <div class="pd-30" v-if="tab == 0">
              <label for="buy_vnd">Tôi muốn trao đổi</label>
              <div class="input-box">
                <input type="text" id="buy_vnd" class="exchange-input" v-model="buy_vnd" @input="buyVND"
                  @focus="unFormatBuy" @blur="buy_vnd = formatVNPrice(buy_vnd)" />
                <div class="unit">
                  <v-select class="mt-7" variant="outlined" density="compact" color="primary" :items="p2p_currency_list"
                    v-model="p2p_currency.buy">
                    <template #item="{ item, props }">
                      <v-list-item v-bind="props">
                        <template #title>
                          <div class="d-flex align-center p2p-title">
                            <nuxt-img format="webp" :src="'/img/p2p/' + item.title + '.png'" alt="" loading="lazy" />
                            {{ item.title.toUpperCase() }}
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </div>
              <label for="buy_usdt">Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" id="buy_usdt" class="exchange-input" v-model="buy_usdt" @input="buyUSDT" />
                <div class="unit">
                  <v-select class="mt-7" variant="outlined" density="compact" color="primary" :items="p2p_token_list"
                    v-model="p2p_token.buy">
                    <template #item="{ item, props }">
                      <v-list-item v-bind="props">
                        <template #title>
                          <div class="d-flex align-center p2p-title">
                            <nuxt-img format="webp" :src="'/img/p2p/' + item.title + '.svg'" alt="" loading="lazy" />
                            {{ item.title.toUpperCase() }}
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="d-flex align-center">
                <span>Giá ước tính: 1 {{ p2p_token.buy.toUpperCase() }} ≈
                  {{ formatPrice(buy_price) }}
                  {{ p2p_currency.buy.toUpperCase() }}</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(2)"
                  aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
              <div class="detail-price">
                <div class="item">
                  <nuxt-img format="webp" src="/img/logo.png" alt="" loading="lazy" />
                  <h3>Chợ OTC VN</h3>
                  <h4>
                    <span>Giá mua:</span>
                    <b v-if="p2p_token.buy == 'usdt' && p2p_currency.buy == 'vnd'
                    ">{{ formatVNPrice(buy_price) }}</b>
                    <b v-else>{{ formatPrice(buy_price) }}</b>
                  </h4>
                </div>
                <div class="item">
                  <nuxt-img format="webp" src="/img/binance.png" alt="" loading="lazy" />
                  <h3>P2P Binance</h3>
                  <h4>
                    <span>Giá mua:</span>
                    <b v-if="p2p_token.buy == 'usdt' && p2p_currency.buy == 'vnd'
                    ">{{ formatVNPrice(buy_price + 5) }}</b>
                    <b v-else>{{ formatPrice(buy_price) }}</b>
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all" aria-label="Mua miễn phí">Mua miễn phí</a>
            </div>
            <div class="pd-30" v-else>
              <label for="sell_usdt">Tôi muốn trao đổi</label>
              <div class="input-box">
                <input type="text" id="sell_usdt" class="exchange-input" v-model="sell_usdt" @input="sellUSDT" />
                <div class="unit">
                  <v-select class="mt-7" variant="outlined" density="compact" color="primary" :items="p2p_token_list"
                    v-model="p2p_token.sell">
                    <template #item="{ item, props }">
                      <v-list-item v-bind="props">
                        <template #title>
                          <div class="d-flex align-center p2p-title">
                            <nuxt-img format="webp" :src="'/img/p2p/' + item.title + '.svg'" alt="" loading="lazy" />
                            {{ item.title.toUpperCase() }}
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </div>
              <label for="sell_vnd">Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" id="sell_vnd" class="exchange-input" v-model="sell_vnd" @input="sellVND"
                  @focus="unFormatSell" @blur="sell_vnd = formatVNPrice(sell_vnd)" />
                <div class="unit">
                  <v-select class="mt-7" variant="outlined" density="compact" color="primary" :items="p2p_currency_list"
                    v-model="p2p_currency.sell">
                    <template #item="{ item, props }">
                      <v-list-item v-bind="props">
                        <template #title>
                          <div class="d-flex align-center p2p-title">
                            <nuxt-img format="webp" :src="'/img/p2p/' + item.title + '.png'" alt="" loading="lazy" />
                            {{ item.title.toUpperCase() }}
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="d-flex align-center">
                <span>Giá ước tính: 1 {{ p2p_token.sell.toUpperCase() }} ≈
                  {{ formatPrice(sell_price) }}
                  {{ p2p_currency.sell.toUpperCase() }}</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(2)"
                  aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
              <div class="detail-price">
                <div class="item">
                  <nuxt-img format="webp" src="/img/logo.png" alt="" loading="lazy" />
                  <h3>Chợ OTC</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    <b v-if="p2p_token.sell == 'usdt' && p2p_currency.sell == 'vnd'
                    ">{{ formatVNPrice(sell_price) }}</b>
                    <b v-else>{{ formatPrice(sell_price) }}</b>
                  </h4>
                </div>
                <div class="item">
                  <nuxt-img format="webp" src="/img/binance.png" alt="" loading="lazy" />
                  <h3>P2P Binance</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    <b v-if="p2p_token.sell == 'usdt' && p2p_currency.sell == 'vnd'
                    ">{{ formatVNPrice(sell_price - 5) }}</b>
                    <b v-else>{{ formatPrice(sell_price) }}</b>
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all btn-sell" aria-label="Bán miễn phí">Bán miễn
                phí</a>
            </div>
          </div>
          <div class="item pd-30">
            <div class="space mb-5">
              <div class="mowtit">
                <span>Tỷ giá ngoại tệ</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(1)"
                  aria-label="Làm mới">
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
                <v-data-table :headers="headers.bank" :items="bank" :page.sync="page.bank_rate" :items-per-page="9"
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
                <v-pagination class="pt-3" v-model="page.bank_rate" :length="Math.ceil(bank.length / 9)">
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
        </div>
        <div class="mowgrid grid-bot mt-8">
          <div class="vertical-news">
            <div class="space mb-6">
              <div class="mowtit">
                <span>Hướng dẫn người mới</span>
              </div>
              <v-btn icon size="35" variant="text" color="primary" to="/danh-muc/huong-dan-nguoi-moi"
                aria-label="Hướng dẫn người mới">
                <v-icon size="25">mdi:mdi-arrow-right</v-icon>
              </v-btn>
            </div>
            <div class="item-news mt-5" v-for="(item, index) in tutorial_post" :key="index">
              <div class="image" @click="toDetail(item.slug)">
                <nuxt-img format="webp" :src="$image(item.image)" alt="" loading="lazy" />
              </div>
              <div class="content">
                <h3 @click="toDetail(item.slug)">{{ item.title }}</h3>
                <span><i class="far fa-calendar-alt"></i>
                  {{ formatTime(item.created_at) }}
                </span>
              </div>
            </div>
          </div>
          <div class="item pd-30">
            <div class="space mb-2">
              <div class="mowtit">
                <span>Giá vàng</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(5)"
                  aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-btn variant="text" to="/gia-vang" aria-label="Quy đổi">
                Quy đổi
                <v-icon class="ml-1" size="20" color="primary">
                  mdi:mdi-arrow-right
                </v-icon>
              </v-btn>
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
        </div>
      </div>
      <div class="planet"></div>
      <div class="bgr-planet"></div>
    </section>
    <section class="news relative mt-8">
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
        <div class="mowgrid" v-if="market_post[0]">
          <div class="item" v-for="(item, index) in market_post.slice(0, 3)" :key="index">
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
        <div class="mowgrid" v-else>
          <div class="item loader" v-for="i in 6" :key="i"></div>
        </div>
      </div>
    </section>
    <section class="relative mb-8">
      <div class="mowtainer">
        <div class="mowgrid grid-2 mt-8">
          <div class="item pd-30">
            <div class="space">
              <div class="mowtit">
                <span>Crypto</span>
                <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(3)"
                  aria-label="Làm mới">
                  <v-icon size="25">mdi:mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-responsive max-width="220">
                <v-text-field v-model="search" label="Tìm kiếm" variant="underlined" color="primary"
                  append-inner-icon="mdi:mdi-magnify">
                </v-text-field>
              </v-responsive>
            </div>
            <v-data-table :headers="headers.crypto" :items="coin_list" :search="search" :page.sync="page.usdt_crypto"
              :items-per-page="17" hide-default-footer :mobile-breakpoint="0" v-if="coin_list[0]">
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
                </tr>
              </template>
            </v-data-table>
            <v-pagination class="pt-3" v-model="page.usdt_crypto" :length="Math.ceil(coin_list.length / 17)"
              v-if="coin_list[0]">
            </v-pagination>
          </div>
          <div>
            <div class="item pd-30 mb-8">
              <div class="space">
                <div class="mowtit mb-2">
                  <span>Lực thị trường</span>
                  <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(4)"
                    aria-label="Làm mới">
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
            <div class="item pd-30">
              <div class="space">
                <div class="mowtit mb-2">
                  <span>Chứng khoán</span>
                  <v-btn icon color="primary" class="ml-2" size="35" variant="text" @click="refreshHandle(6)"
                    aria-label="Làm mới">
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
        </div>
      </div>
      <div class="earth"></div>
    </section>
    <!-- <section id="partner">
      <div class="mowtainer">
        <div class="mowtit big-title">
          Đối tác
        </div>
        <div class="mowgrid">
          <div class="image part">
            <img src="img/partner/1.png" alt="" />
            <h3>CoinGo24</h3>
          </div>
          <div class="image" v-for="(item, index) in exchanges" :key="index">
            <img :src="item.image" alt="" />
            <h3>{{ item.name.replace("Exchange", "") }}</h3>
          </div>
        </div>
      </div>
    </section> -->
  </main>
</template>

<script>
import moment from "moment";

export default {
  jsonld() {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://chootc.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://chootc.com/tim-kiem/{search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Về chúng tôi",
            "description": "Cộng đồng Chợ OTC Việt Nam được ra mắt nhằm tập trung tất cả các luồng giao dịch OTC hiện có trên thị trường.",
            "url": "https://chootc.com/ve-chung-toi"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Tỷ giá ngoại tệ",
            "description": "Cập nhật tỷ giá ngoại tệ ngân hàng, thế giới. Lực mua bán thị trường.",
            "url": "https://chootc.com/ngoai-te"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Giá vàng",
            "description": "Cập nhật giá vàng trong nước và thế giới. Tin tức giá vàng mới nhất.",
            "url": "https://chootc.com/gia-vang"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Tiền điện tử",
            "description": "Giá BTC, ETH, BNB, XRP, ADA, ... Tin tức crypto mới nhất.",
            "url": "https://chootc.com/tien-dien-tu"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "Chứng khoán",
            "description": "Thông tin bảng giá thị trường chứng khoán trực tuyến hôm nay. Tìm hiểu cách chơi, cách đầu tư, giá cổ phiếu, tin nhanh chứng khoán.",
            "url": "https://chootc.com/chung-khoan"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Tin tức tài chính",
            "description": "Tin tức cập nhật thị trường tài chính Việt Nam, tài chính quốc tế, chính sách tiền tệ của ngân hàng nhà nước, tỷ giá, lãi suất, giá vàng, thị trường ngoại hối.",
            "url": "https://chootc.com/tin-tuc"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 7,
            "name": "Hướng dẫn người mới",
            "description": "Bộ kiến thức đầu tư Crypto cho người mới sẽ giúp bạn hiểu rõ về thị trường Crypto, bật mí chiến lược, cách đầu tư Crypto đơn giản hiệu quả.",
            "url": "https://chootc.com/danh-muc/huong-dan-nguoi-moi"
          },
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWorkSeries",
        "name": "Chợ OTC Việt Nam - Mua bán USDT giá rẻ, uy tín số 1 Việt Nam",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "ratingCount": 3916
        }
      },
    ]
  },
  data() {
    return {
      search: "",
      coin_list: [],
      bank: [],
      world: [],
      gold: [],
      market_force: [],
      stock: [],
      sell_price: "",
      buy_price: "",
      tabs: ["Mua", "Bán"],
      tab: 0,
      buy_usdt: "",
      buy_vnd: 10000000,
      sell_usdt: 100,
      sell_vnd: "",
      exchanges: "",
      headers: {
        bank: [
          { title: "Tên", key: "code", sortable: false },
          { title: "Giá Mua", key: "buy", sortable: false },
          { title: "Chuyển Khoản", key: "transfer", sortable: false },
          { title: "Giá Bán", key: "sell", sortable: false },
        ],
        world: [
          { title: "Tên", key: "name", sortable: false },
          { title: "Giá", key: "buy", sortable: false },
          { title: "Thay đổi", key: "change", sortable: false },
        ],
        crypto: [
          { title: "Tên", key: "symbol", sortable: false },
          { title: "Giá", key: "current_price", sortable: false },
          { title: "Thay đổi", key: "price_change_percentage_24h", sortable: false },
          { key: "image" },
        ],
        gold: [
          { title: "Tên", key: "name", sortable: false },
          { title: "Giá Mua", key: "buy", sortable: false },
          { title: "Giá Bán", key: "sell", sortable: false },
          { key: "sell_change" },
          { key: "buy_change" },
        ],
        market_force: [
          { title: "Tên", key: "name", sortable: false },
          { title: "Giá", key: "price", sortable: false },
          { title: "5m", key: "five_minutes", sortable: false },
          { title: "15m", key: "fifteen_minutes", sortable: false },
          { title: "1h", key: "one_hour", sortable: false },
        ],
        stock: [
          { title: "Tên", key: "code", sortable: false },
          { title: "Giá", key: "price", sortable: false },
          { title: "Biến động", key: "change", sortable: false },
          { key: "time" },
        ],
      },
      rate_tab: 1,
      page: {
        usdt_crypto: 1,
        bank_rate: 1,
        gold: 1,
        stock: 1,
      },
      tutorial_post: [],
      market_post: [],
      p2p_token: {
        buy: "usdt",
        sell: "usdt",
      },
      p2p_token_list: ["usdt", "btc", "eth", "busd", "bnb", "ada"],
      p2p_currency: {
        buy: "vnd",
        sell: "vnd",
      },
      p2p_currency_list: ["vnd", "usd", "aud", "cad", "cny", "eur", "jpy"],
    };
  },
  mounted() {
    this.getList();
    this.getBuyPrice();
    this.getSellPrice();
    this.getPost();
  },
  methods: {
    getPost() {
      this.$callAPI("get", "categories/huong-dan-nguoi-moi", {}, (res) => {
        this.tutorial_post = res.data.data.reverse().slice(0, 4);
      });
      this.$callAPI("get", "categories/tin-tuc-thi-truong", {}, (res) => {
        this.market_post = res.data.data;
      });
    },
    refreshHandle(value) {
      if (value == 1) {
        this.bank = [];
        this.world = [];
        this.getBank();
        this.getWorld();
      }
      if (value == 2) {
        this.getBuyPrice();
        this.getSellPrice();
      }
      if (value == 3) {
        this.coin_list = [];
        this.getCoin();
      }
      if (value == 4) {
        this.market_force = [];
        this.getMarketForce();
      }
      if (value == 5) {
        this.gold = [];
        this.getGold();
      }
      if (value == 6) {
        this.stock = [];
        this.getStock();
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async getList() {
      this.$callAPI("get", "exchanges", {}, (res) => {
        this.exchanges = res.data.slice(0, 19);
      });
      this.getCoin();
      this.getBank();
      this.getWorld();
      this.getMarketForce();
      this.getGold();
      await this.sleep(3000);
      this.getStock();
    },
    getCoin() {
      this.$callAPI("get", "coins", {}, (res) => {
        this.coin_list = res.data;
      });
    },
    getBank() {
      this.$callAPI("get", "rate/bank", {}, (res) => {
        this.bank = res.data;
        this.bank.unshift(res.data[19]);
        this.bank.splice(-1);
      });
    },
    getWorld() {
      this.$callAPI("get", "rate/world", {}, (res) => {
        res.data.forEach(item => {
          this.world.push({
            name: item.from + " / " + item.to,
            buy: item.buy,
            change: item.change
          })
        });
      });
    },
    getGold() {
      this.$callAPI("get", "rate/gold", {}, (res) => {
        this.gold = res.data;
      });
    },
    getMarketForce() {
      this.$callAPI("get", "rate/market-force", {}, (res) => {
        this.market_force = res.data;
      });
    },
    getStock() {
      this.$callAPI("get", "rate/stock", {}, (res) => {
        this.stock = res.data;
      });
    },
    getBuyPrice() {
      this.buy_price = 0;
      const buy_params = `p2p?type=buy&asset=${this.p2p_token.buy}&fiat=${this.p2p_currency.buy}&page=1`;
      this.$callAPI("get", buy_params, {}, (res) => {
        this.buy_price = Number(res.data.data[4].adv.price);
        if (this.p2p_token.buy == "usdt" && this.p2p_currency.buy == "vnd") {
          this.buy_price = Number(res.data.data[4].adv.price) - 5;
        }
        this.buyVND();
        if (this.buy_vnd.toString().includes(",")) return;
        this.buy_vnd = this.formatVNPrice(this.buy_vnd);
      });
    },
    getSellPrice() {
      this.sell_price = 0;
      const sell_params = `p2p?type=sell&asset=${this.p2p_token.sell}&fiat=${this.p2p_currency.sell}&page=1`;
      this.$callAPI("get", sell_params, {}, (res) => {
        this.sell_price = Number(res.data.data[4].adv.price);
        if (this.p2p_token.sell == "usdt" && this.p2p_currency.sell == "vnd") {
          this.sell_price = Number(res.data.data[4].adv.price) + 5;
        }
        this.sellUSDT();
      });
    },
    buyUSDT() {
      this.buy_vnd = this.formatVNPrice(this.buy_usdt * this.buy_price);
    },
    buyVND() {
      let buy_vnd = this.buy_vnd;
      if (this.buy_vnd.toString().includes(",")) {
        buy_vnd = this.buy_vnd.replaceAll(",", "");
      }
      this.buy_usdt = this.formatNumber(buy_vnd / this.buy_price);
    },
    sellUSDT() {
      this.sell_vnd = this.formatVNPrice(this.sell_usdt * this.sell_price);
    },
    sellVND() {
      this.sell_usdt = this.formatNumber(this.sell_vnd / this.sell_price);
    },
    unFormatBuy() {
      this.buy_vnd = this.buy_vnd.replaceAll(",", "");
    },
    unFormatSell() {
      this.sell_vnd = this.sell_vnd.replaceAll(",", "");
    },
    formatPrice(value) {
      if (!value) return 0;
      let val = (value / 1).toFixed(2);
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
  watch: {
    "p2p_token.buy"() {
      this.getBuyPrice();
    },
    "p2p_currency.buy"() {
      this.getBuyPrice();
    },
    "p2p_token.sell"() {
      this.getSellPrice();
    },
    "p2p_currency.sell"() {
      this.getSellPrice();
    },
  },
};
</script>

<style></style>
import RSS from 'rss'
import axios from 'axios'

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: 'Chợ OTC Việt Nam',
        site_url: 'https://chootc.com',
        feed_url: `https://chootc.com/feed.xml`,
        image_url: 'https://chootc.com/img/logo.png',
        copyright: '@chootcvn',
        language: 'vi-vn',
        ttl: 15,
        categories: ['crypto', 'otc', 'usdt', 'btc', 'eth', 'bitcoin', 'tiền điện tử','chứng khoán', 'giá vàng', 'tỷ giá', 'ngoại tệ'],
    })

    const list = (await axios.get(`https://api.chootc.com/api/posts`)).data.data;

    for (const item of list) {
        feed.item({
            title: item.title,
            url: `https://chootc.com/${item.slug}`,
            date: item.created_at,
            description: item.meta_description,
            author: 'chootcvn',
            guid: `https://chootc.com/${item.slug}`,
        }) 
    }

    const feedString = feed.xml({ indent: true })
    event.res.setHeader('content-type', 'text/xml')
    event.res.end(feedString)
})
import axios from "axios";
export default cachedEventHandler(
  async (e) => {
    const list = (await axios.get(`https://api.chootc.com/api/all-post`))
      .data;
    const cate = (await axios.get(`https://api.chootc.com/api/categories`))
      .data;

    const [posts, pages] = await Promise.all([list, cate]);
    return [...posts, ...pages].map((p) => {
      if(p.name){
        return {
          loc: `danh-muc/${p.slug}`,
          lastmod: p.created_at,
          priority: 0.8,
          changefreq: "daily",
        };
      }
      return {
        loc: p.slug,
        lastmod: p.created_at,
        priority: 0.8,
        changefreq: "hourly",
      };
    });
  },
  {
    name: "sitemap-dynamic-url",
    maxAge: 60 * 10,
  }
);

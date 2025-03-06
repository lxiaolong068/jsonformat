/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.jsonformat.help",
  exclude: ["/widget"],
  autoLastmod: false,
  generateRobotsTxt: true,
  trailingSlash: true,
  changefreq: 'daily',
  priority: 0.7,
  alternateRefs: [
    {
      href: 'https://www.jsonformat.help',
      hreflang: 'en'
    },
    {
      href: 'https://www.jsonformat.help/zh',
      hreflang: 'zh'
    },
    {
      href: 'https://www.jsonformat.help/ja',
      hreflang: 'ja'
    },
    {
      href: 'https://www.jsonformat.help/ko',
      hreflang: 'ko'
    },
    {
      href: 'https://www.jsonformat.help/de',
      hreflang: 'de'
    }
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.jsonformat.help/sitemap-en.xml',
      'https://www.jsonformat.help/sitemap-zh.xml',
      'https://www.jsonformat.help/sitemap-ja.xml',
      'https://www.jsonformat.help/sitemap-ko.xml',
      'https://www.jsonformat.help/sitemap-de.xml'
    ],
  },
};

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '作品展示',
    works: [{ 
      name: "网站建设",
      content:"专业建站团队为您售后服务",
      ico:"fa-code"
    },
    {
      name: "域名注册",
      content:"个性化域名出售",
      ico:"fa-diamond"
    },
    {
      name: "虚拟主机",
      content:"快速稳定虚拟机空间出租",
      ico:"fa-cloud"
    },
    {
      name: "微信公众号",
      content:"微信公众号注册定制",
      ico:"fa-weixin"
    }]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

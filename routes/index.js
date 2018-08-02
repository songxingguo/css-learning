const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '作品展示',
    works: [{
     name: "网站建设",
     content:"专业建站团队为您售后服务"
    },{
      name: "虚拟主机",
      content:"快速稳定虚拟机空间出租"
    }]
  })
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })
//
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router

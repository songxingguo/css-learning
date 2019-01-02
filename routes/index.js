const router = require('koa-router')()
const { home } = require('./../public/data/index.json');

router.get('/', async (ctx, next) => {
  await ctx.render('index', home)
})

module.exports = router

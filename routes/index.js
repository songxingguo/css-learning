const router = require('koa-router')()
const works = require('./../public/data/index.json');

router.get('/', async (ctx, next) => {
  await ctx.render('index', works)
})

module.exports = router

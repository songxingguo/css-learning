const router = require('koa-router')()

const cssList = require('./../public/data/css.json');

router.prefix('/css')

router.get('/', async (ctx, next) => {
  await ctx.render('list', cssList)
})

router.get('/first', async (ctx, next) => {
  await ctx.render('code', cssList)
})

module.exports = router

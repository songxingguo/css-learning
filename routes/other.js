const router = require('koa-router')()

const otherList = require('./../public/data/other.json');

router.prefix('/other')

router.get('/', async (ctx, next) => {
  await ctx.render('list', otherList)
})

router.get('/first', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

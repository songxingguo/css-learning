const router = require('koa-router')()

const htmlList = require('./../public/data/html.json');

router.prefix('/html')

router.get('/', async (ctx, next) => {
  await ctx.render('list', htmlList)
})

router.get('/html/first', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

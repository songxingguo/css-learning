const router = require('koa-router')()

const cssList = require('./../public/data/css.json');

router.prefix('/css')

router.get('/', async (ctx, next) => {
  await ctx.render('list', cssList)
})

router.get('/first', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

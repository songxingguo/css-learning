const router = require('koa-router')()

const jsList = require('./../public/data/js.json');

router.prefix('/js')

router.get('/', async (ctx, next) => {
  await ctx.render('list', jsList)
})

router.get('/first', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

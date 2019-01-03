'use strict'

const { resolve, dirname, extname, join } = require('path')
const debug = require('debug')('koa-views')
const consolidate = require('consolidate')
const { stat } = require('mz/fs')
const send = require('koa-send')

const {mkdir, writeFileSync, readdirSync, statSync} = require('fs');
const compileFile = require('pug').compileFile;
const ncp = require('ncp').ncp;

module.exports = viewsMiddleware

function viewsMiddleware (path, {
  engineSource = consolidate,
  extension = 'html',
  options = {},
  map
} = {}) {
  return function views (ctx, next) {
    // console.log("测试一下")
    if (ctx.render) return next()

    ctx.render = function (relPath, locals = {}) {
      const suffix = (extname(relPath) || '.' + extension).slice(1)

      return getPaths(path, relPath, suffix)
        .then((paths) => {
          const state = Object.assign(locals, options, ctx.state || {})
          debug('render `%s` with %j', paths.rel, state)
          ctx.type = 'text/html'

          if (isHtml(suffix) && !map) {
            return send(ctx, paths.rel, {
              root: path
            })
          } else {
            const engineName = map && map[suffix]
              ? map[suffix]
              : suffix

            const render = engineSource[engineName]

            if (!engineName || !render) return Promise.reject(new Error(
              `Engine not found for the ".${extension}" file extension`
            ))

            return render(resolve(paths.abs, paths.rel), state)
              .then((html) => {
                console.log(html)
                copyDir();
                ctx.body = html
              })
          }
        })
    }

    return next()
  }
}

function getPaths(abs, rel, ext) {
  return stat(join(abs, rel)).then((stats) => {
    if (stats.isDirectory()) {
      // a directory
      return {
        rel: join(rel, toFile('index', ext)),
        abs: join(abs, dirname(rel), rel)
      }
    }

    // a file
    return { rel, abs }
  })
    .catch((e) => {
      // not a valid file/directory
      if (!extname(rel)) {
        // Template file has been provided without extension
        // so append to it to try another lookup
        return getPaths(abs, `${rel}.${ext}`, ext)
      }

      throw e
    })
}

function isHtml (ext) {
  return ext === 'html'
}

function toFile (fileName, ext) {
  return `${fileName}.${ext}`
}

function copyDir (dir = './public/', outdir = './dist/') {
  // 遍历所有子目录
  readdirSync(dir).forEach(function (file) {
    // 判断是否是目录
    if (statSync(join(dir, file)).isDirectory()) {
      // 创建根目录
      mkdir(join(outdir), function () {
        // 拷贝子目录
        ncp(resolve(dir, file), resolve(outdir, file));
      });
    }
  })
}

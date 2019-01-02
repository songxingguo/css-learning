const { resolve, join } = require('path')
const {mkdir, writeFileSync, readdirSync, statSync} = require('fs');
const compileFile = require('pug').compileFile;
const ncp = require('ncp').ncp;

const path = './../views/index.pug'; // 入口文件
const works = require('./../public/data/index.json');
const fieldArr = ['pcUrl', 'mbUrl', 'QRCodeUrl']; // 需要清洗的属性
const prefix = './../../public'; // 需要清洗数据的前缀
const dir = './../public/'; // 静态文件读取目录

(function translateToHtmls(path, {
  options = {},
  root = './dist/',
  prefix = '',
  fieldArr = [],
  dir = './../assets/',
  outdir = 'dist/'
} = {}) {
  // 创建根目录
  mkdir(join(root), function () {
    for(const item in options) {
      // 为数据中的路径添加前缀
      for (const field of fieldArr) {
        options[item][field] = prefix + options[item][field];
      }
      // 将 pug 转义成 html
      const html =  compileFile(resolve(__dirname, path))(options[item]);
      // 创建模块目录
      mkdir(join(root, item), function () {
        writeFileSync(join(root, item, '/index.html'), html)
      });
    }
  })

  copyDir();
})(path, {
  options: works,
  prefix: prefix,
  dir: dir
});

function clearField () {

}

function translateToHtml () {

}

function copyDir (dir = './public/', outdir = './dist/') {
  readdirSync(dir).forEach(function (file) {
    if (statSync(join(dir, file)).isDirectory()) {
      mkdir(join(outdir), function () {
        ncp(resolve(dir, file), resolve(outdir, file));
      });
    }
  })
}

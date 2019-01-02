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
      console.log(options[item]);
      translateToHtml(path, './dist/', item, {
        options: options[item]
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

function translateToHtml (path, outPath, muduleName, {
  options = {},
  fileName='index'
}) {
  // 将 pug 转义成 html
  const html =  compileFile(resolve(__dirname, path))(options);
  // 创建模块目录
  mkdir(join(outPath, muduleName), function () {
    writeFileSync(join(outPath, muduleName, '/' + fileName + '.html'), html)
  });
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

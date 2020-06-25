const gulp = require('gulp');
// js
const Babel = require('gulp-babel');
// css
const Less = require('gulp-less'); // 编译less
const Postcss = require('gulp-postcss');
const Px2vw = require('postcss-px-to-viewport');
// server
const Connect = require('gulp-connect'); //引入gulp-connect模块 
const Clean = require('gulp-clean'); // 清理目录
// 配置文件
const config = require('./config');
const Proxy = require('./proxy')
const { lessPath, jsPath, htmlPath, imgPath, output } = config;

// html
async function html() {
  return gulp.src(htmlPath)
    .pipe(gulp.dest(output)) // 拷贝 
    .pipe(Connect.reload())
}

// css
async function css() {
  return await gulp.src(lessPath)
    .pipe(Less()) //编译less
    .pipe(Postcss([
      Px2vw({
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 3,
      })
    ]))
    .pipe(gulp.dest(output + '/static/css')) //当前对应css文件
    .pipe(Connect.reload()); //更新
}

async function js() {
  return await gulp.src(jsPath)
    .pipe(Babel())
    .pipe(gulp.dest(output + '/static/js')) // 拷贝
    .pipe(Connect.reload()); //更新
}

// image
async function image() {
  return await gulp.src(imgPath)
    .pipe(gulp.dest(output + '/static/image'));
}

// clean dir
async function clean() {
  // 不设置allowEmpty: true会报File not found with singular glob
  return await gulp.src(output, { allowEmpty: true }).pipe(Clean());
}

// 服务器函数
async function server() {
  Connect.server({
    root: output, //根目录
    host: 'localhost',
    port: 3000, //端口
    livereload: true, //自动更新
    middleware: function(connect, opt) {
      return Proxy
    }
  })
}

module.exports = {
  html,
  css,
  js,
  image,
  clean,
  server
}
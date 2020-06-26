const gulp = require('gulp');
// js
const Babel = require('gulp-babel');
const Uglify = require('gulp-uglify'); // 压缩js
// css
const Less = require('gulp-less'); // 编译less
const Postcss = require('gulp-postcss');
const Autoprefixer = require('autoprefixer'); // 浏览器前缀
const Px2vw = require('postcss-px-to-viewport');
const CleanCss = require('gulp-clean-css'); // 压缩css
// html
const MinifyHtml = require("gulp-minify-html"); //压缩html
// image
const Cache = require('gulp-cache');
const Tiny = require('gulp-tinypng-nokey');
const Clean = require('gulp-clean'); // 清理目录
const Sftp = require('gulp-sftp');
// md5 发版本的时候为了避免浏览器读取了旧的缓存文件，需要为其添加md5戳
const md5 = require("gulp-md5-plus");
const config = require('./config');
const { lessPath, jsPath, htmlPath, imgPath, output } = config;

// html
async function html() {
  return gulp.src(htmlPath)
    .pipe(MinifyHtml())
    .pipe(gulp.dest(output)) // 拷贝 
}

// css
async function css() {
  return await gulp.src(lessPath)
    .pipe(Less()) //编译less
    .pipe(Postcss([Autoprefixer()]))
    .pipe(Postcss([
      Px2vw({
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 3,
      })
    ]))
    // .pipe(gulp.dest(output + '/static//css')) // 为压缩的css
    .pipe(CleanCss({ compatibility: 'ie8' }))
    .pipe(md5(6, output + '/*.html', {
      connector: '.min.' // 文件名和hash的连接符
    }))
    .pipe(gulp.dest(output + '/static/css')) //当前对应css文件
}

// js
async function js() {
  return await gulp.src(jsPath)
    // .pipe(gulp.dest(output + '/static/js')) // 源代码
    .pipe(Babel())
    .pipe(Uglify({
      compress: {
        pure_funcs: ['console.log'] //移除console
      }
    })) // 压缩js
    .pipe(md5(6, output + '/*.html', {
      connector: '.min.' // 文件名和hash的连接符
    }))
    .pipe(gulp.dest(output + '/static/js')) // 拷贝
}

// image
async function image() {
  return await gulp.src(imgPath)
    .pipe(Tiny())
    .pipe(md5(6, output + '/static/css/*.css', {
      connector: '.' // 文件名和hash的连接符
    }))
    .pipe(gulp.dest(output + '/static/image'));
}

// deploy
async function deploy() {
  return await gulp.src(output + '/*')
    .pipe(sftp({
      host: 'website.com',
      port: 22,
      remotePath: '/', // 远程目录
      user: 'johndoe',
      pass: '1234'
    }));
}

// clean dir
async function clean() {
  // 不设置allowEmpty: true会报File not found with singular glob
  return await gulp.src(output, { allowEmpty: true }).pipe(Clean());
}

module.exports = {
  html,
  css,
  js,
  image,
  clean,
  deploy
}
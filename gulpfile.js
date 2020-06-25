const gulp = require('gulp');
const devConfig = require('./build/gulp.dev');
const prodConfig = require('./build/gulp.prod');
const config = require('./build/config');
const { lessPath, jsPath, htmlPath, imgPath } = config;

// dev
gulp.task('devHtml', devConfig.html); // 打包html
gulp.task('devJs', devConfig.js); // 打包js
gulp.task('devCss', devConfig.css); // 打包css
gulp.task('devImage', devConfig.image); // 打包image
gulp.task('server', devConfig.server); // 本地服务
gulp.task('devSources', gulp.series('devHtml', gulp.parallel('devJs', 'devCss', 'devImage')));
// 监听文件变化
gulp.task('watch', async () => {
  gulp.watch(htmlPath, gulp.series('devHtml')); // 监听HTML变化
  gulp.watch(jsPath, gulp.series('devJs')); // 监听js变化
  gulp.watch(lessPath, gulp.series('devCss')); // 监听css变化
  gulp.watch(imgPath, gulp.series('devImage')); // 监听image变化
});
gulp.task('dev', gulp.series('devSources', 'server', 'watch'));

// build
gulp.task('html', prodConfig.html); // 打包html
gulp.task('js', prodConfig.js); // 打包js
gulp.task('css', prodConfig.css); // 打包css
gulp.task('image', prodConfig.image); // 打包image
gulp.task('server', prodConfig.server); // 本地服务
gulp.task('clean', prodConfig.clean); // 清理目录
gulp.task('sources', gulp.series('image', 'js', 'css'));
gulp.task('build', gulp.series('sources'));
// build
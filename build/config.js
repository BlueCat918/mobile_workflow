const root = 'demo'
const entry = 'src/view/' + root
module.exports = {
  lessPath: entry + '/static/less/*.less',
  jsPath: entry + '/static/js/*.js',
  htmlPath: entry + '/*.html',
  imgPath: entry + '/static/image/*',
  output: 'dist/' + root
}
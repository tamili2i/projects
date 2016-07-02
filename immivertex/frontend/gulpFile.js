var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var connect = require('gulp-connect');
var basicAuth = require('basic-auth');
var eslint = require('gulp-eslint');
var inject = require('gulp-inject');
var fs = require('fs');
var assets = JSON.parse(fs.readFileSync('./assets.json'));

var auth = function(req, res, next){
    var user = basicAuth(req);
    if(user && user.name == "admin" && user.pass == "admin")
        return next();
    else{
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }
}


gulp.task('less', function () {
  return gulp.src('./less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./assets/css/'))
});



/*gulp.task('livereload', ['watch'], function () {
  return gulp.src('./index.html')
    .pipe(server({
      port : 3000,
      livereload: true,
      directoryListing: false,
      open: true,
      defaultFile: './index.html'
    }));
});*/

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less', 'livereload']);
});

gulp.task('livereload', function () {
  gulp.src('./index.html')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  var server = connect.server({
    root: './',
    livereload: true,
    //middleware: auth
  });


});

gulp.task('lint', function () {
    return gulp.src(['app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('inject', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(assets);
  return target.pipe(inject(sources))
  .pipe(gulp.dest("./"));
});

gulp.task('default', ['watch', 'less', 'connect','lint','inject']);





/*gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});
*/

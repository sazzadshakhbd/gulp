const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const htmlPartial = require("gulp-html-partial");

var options = {};

const htmlFile = ["src/*.html"];

function html() {
  return gulp
    .src(htmlFile)
    .pipe(
      htmlPartial({
        basePath: "src/assets/partials/",
      })
    )
    .pipe(gulp.dest("public"));
}

function css() {
  return gulp
    .src("src/assets/sass/style.scss")
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(cssmin())
    .pipe(gulp.dest("public/assets/css/"));
}

function js() {
  return gulp
    .src("src/assets/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("public/assets/js"));
}

function img() {
  return gulp
    .src("src/assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/assets/img/"));
}

function serve() {
  browserSync.init({
    open: true,
    notify: false,
    server: "./public",
  });
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch("src/**/*.html", gulp.series(html, browserSyncReload));
  gulp.watch("src/assets/**/*.scss", gulp.series(css, browserSyncReload));
  gulp.watch("src/assets/**/*.js", gulp.series(js, browserSyncReload));
  gulp.watch("src/assets/img/**/*.*", gulp.series(img));

  return;
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.serve = gulp.parallel(html, css, js, img, watchFiles, serve);
exports.default = gulp.series(html, css, js, img);

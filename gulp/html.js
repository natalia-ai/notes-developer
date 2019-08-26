var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    pug = require("gulp-pug"),
    notify = require("gulp-notify");

gulp.task("html", function () {
  return gulp.src("src/pug/*.pug")
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: "Pug",
          message: err.message
        }
      })
    }))
    .pipe(pug())
    .pipe(gulp.dest("build/"));
});
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function browser_sync(done) {
    browserSync.init({
        proxy: "http://localhost/portafolio/landing-itau/"
    });
    gulp.watch("./src/sass/**/*.scss", css);
    gulp.watch("./**/*.html").on('change', browserSync.reload);

    done();
}

function css(done) {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            processImport: true,
            inline: ['none']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());

    done();
};

gulp.task("css", css);
gulp.task("browser_sync", browser_sync);
gulp.task("default",  gulp.parallel(css, browser_sync));
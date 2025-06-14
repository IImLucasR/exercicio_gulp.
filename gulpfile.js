import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import obfuscate from 'gulp-obfuscate';
import imagemin from 'gulp-imagemin';

const compileSass = gulpSass(sass);

function compilaSass() {
    return gulp.src('./source/*.scss')
        .pipe(sourcemaps.init())
        .pipe(compileSass({ outputStyle: 'compressed' }).on('error', compileSass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build'));
}

function comprimeJavaScript() {
    return gulp.src('./source/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build'));
}

function comprimeImagens() {
    return gulp.src('./source/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/'));
}

function observarArquivos() {
    gulp.watch('./source/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
}

export default gulp.series(observarArquivos);

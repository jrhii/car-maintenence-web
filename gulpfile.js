var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

function swallow(error) {
    console.error(error.toString());

    this.emit('end');
}

const SOURCE_FILES_JS = ['src/**/*.js'];
const SOURCE_FILES_OTHER = ['src/**/*.{html,tag}'];


gulp.task('lint', () => {
    return gulp.src(SOURCE_FILES_JS)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('babel', ['other'], () => {
    return gulp.src(SOURCE_FILES_JS)
        .pipe(babel())
        .on('error', swallow)
        .pipe(gulp.dest('dist'));
});

gulp.task('other', () => {
    gulp.src(SOURCE_FILES_OTHER)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['babel'], () => {
    gulp.watch('src/**/*', ['babel']);
});

gulp.task('default', ['babel']);

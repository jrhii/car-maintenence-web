var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

function swallow(error) {
    console.error(error.toString());

    this.emit('end');
}

const SOURCE_FILES = ['src/**/*.js'];

gulp.task('lint', () => {
    return gulp.src(SOURCE_FILES)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('gulp', ['lint'], () => {
    return gulp.src(SOURCE_FILES)
        .pipe(babel())
        .on('error', swallow)
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['gulp']);

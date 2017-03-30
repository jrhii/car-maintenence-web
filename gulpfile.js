var gulp = require('gulp');
var babel = require('gulp-babel');

function swallow(error) {
    console.error(error.toString());

    this.emit('end');
}

const SOURCE_FILES_JS = ['server/src/**/*.{js,jsx}'];
const SOURCE_FILES_OTHER = ['server/src/**/*.{html,tag}'];
const TEST_FILES_JS = ['test/src/**/*.js'];

gulp.task('babel', ['other'], () => {
    return gulp.src(SOURCE_FILES_JS)
        .pipe(babel())
        .on('error', swallow)
        .pipe(gulp.dest('server/dist'));
});

gulp.task('other', () => {
    gulp.src(SOURCE_FILES_OTHER)
        .pipe(gulp.dest('server/dist'));
});

gulp.task('watch', ['babel'], () => {
    gulp.watch('server/src/**/*', ['babel']);
});

gulp.task('test', () => {
    return gulp.src(TEST_FILES_JS)
        .pipe(babel())
        .on('error', swallow)
        .pipe(gulp.dest('test'));
});

gulp.task('default', ['babel']);

// Imports section
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const merge = require('merge-stream');
// End imports section

// Configuration section
const dir = {
    src: './public/',
    build: './public/'
}

const css = [
    {
        name: 'app',
        src: dir.src + 'scss/main.scss',
        watch: dir.src + 'scss/**/*',
        build: dir.build + 'css/',
    },
]
// End configuration section

// Function section
function stylesProcessor()
{
    const streams = [];
    for (style of css)
    {
        const pipe = gulp.src(style.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat(`${style.name}.css`))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCss({level: 2}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(style.build));

        streams.push(pipe);
    }

    return merge(streams);
}

function watch()
{
    const listWatch = [];
    css.map(style => listWatch.push(style.watch));

    gulp.watch(listWatch, {usePolling: true}, stylesProcessor);
}

// End function section

// Tasks section
gulp.task("default", gulp.series(stylesProcessor, watch));

gulp.task("build", gulp.series(stylesProcessor));
// End tasks section
var gulp = require('gulp'),
    browserSync = require('browser-sync');
    sass = require('gulp-sass');

var config = {
    path: {
        app: 'src/',
        source: {
            html: 'src/**/*.html',
            sass: 'src/scss/**/*.scss',
            css: 'src/css/**/*.css'
        },
        dest: {
            css: 'src/css'
        }
    }
};

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.path.app
        }
    });
    gulp.watch(config.path.source.html, browserSync.reload)
        .on('change', function(event) { 
            console.log('HTML file ' + event.path + ' was ' + event.type);
        });

    gulp.watch(config.path.source.css, function() {
        gulp.src(config.path.source.css)
            .pipe(browserSync.stream());
    });

    gulp.watch(config.path.source.sass, ['sass']);
});

gulp.task('sass', function() {
    return gulp.src(config.path.source.sass)
        .pipe(sass())
        .pipe(gulp.dest(config.path.dest.css))
        .pipe(browserSync.stream());
});
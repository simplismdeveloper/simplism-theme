var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var bower = require('gulp-bower');
var pump = require('pump');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

var path = require('path');

var srcDir = path.join(__dirname, '/src');
var destDir = path.join(__dirname, '/dist');

var paths = {
    bower: {
        font: path.join(__dirname, 'bower_components/font-awesome/fonts/*.*')
    },
    src: {
        "js": [
            path.join(srcDir, '/js/module.js'),
            path.join(srcDir, '/js/**/*.js')
        ],
        "less": [
            path.join(srcDir, '/less/simplism.less'),
            path.join(srcDir, '/less/**/*.less')
        ],
        "public": path.join(srcDir, '/public/**/*')
    },
    dest: {
        "font": path.join(destDir, '/fonts'),
        "js": path.join(destDir, '/js'),
        "css": path.join(destDir, '/css'),
        "public": destDir
    },
    output:{
        'js': 'simplism.min.js',
        'css': 'simplism.min.css'
    }
};

gulp.task('bower_install', function(){
    return bower('bower_components');
});


gulp.task('bower_copy', ['bower_install'], function(){
    return gulp.src(paths.bower.font, { nodir: true })
        .pipe(gulp.dest(paths.dest.font));
});

gulp.task('uglify', ['bower_install'], function(cb){
    pump([
        gulp.src(mainBowerFiles({
            "overrides": {
                "angular-i18n": {
                    main: "angular-locale_ko-kr.js"
                },
                "font-awesome": {
                    ignore: true
                },
                "highlightjs": {
                    main: "highlight.pack.js"
                }
            }
        }).concat(paths.src.js)),
        sourcemaps.init(),
        concat(paths.output.js),
        ngAnnotate(),
        process.env['NODE_ENV'] == 'development' ? uglify({compress: false, mangle: false}) : uglify(),
        sourcemaps.write(),
        gulp.dest(paths.dest.js)
    ], cb);
});

gulp.task('public', ['bower_install'], function(cb){
    pump([
        gulp.src(paths.src.public),
        gulp.dest(paths.dest.public)
    ], cb);
});

gulp.task('less', ['bower_install'], function(cb){
    pump([
        gulp.src(paths.src.less[0]),
        sourcemaps.init(),
        less(),
        rename(paths.output.css),
        cssnano(),
        sourcemaps.write(),
        gulp.dest(paths.dest.css)
    ], cb);
});

gulp.task('default', ['bower_install', 'bower_copy', 'public', 'less', 'uglify']);

module.exports = gulp;
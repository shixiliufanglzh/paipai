var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    base64 = require('gulp-base64'),
    uglify = require('gulp-uglify');

gulp.task('sync', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8181
    });

    gulp.watch('./src/style/*.scss', ['sassfile']).on('change',reload);
    gulp.watch('./src/style/**/*.scss', ['sassfile']).on('change',reload);
    gulp.watch('./src/*.html', ['html']).on('change',reload);
    gulp.watch('./src/**/*.html', ['html']).on('change',reload);
    gulp.watch('./src/imgs/*.*', ['imgs']).on('change',reload);
    gulp.watch('./src/script/*.js', ['uglify']).on('change',reload);
});

gulp.task('sassfile',function(){
    gulp.src('./src/style/*.scss')
        .pipe(sass())
        .pipe(base64({
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/style'));
})

gulp.task('uglify', function(){
    gulp.src('./src/script/*.js')
        //.pipe(uglify({
        //    //mangle: true,//类型：Boolean 默认：true 是否修改变量名
        //    mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        //}))
        .pipe(gulp.dest('./public/script'))
})

gulp.task('html', function(){
    gulp.src(['./src/*.html','./src/**/*.html'])
        .pipe(gulp.dest('./public'))
})

gulp.task('imgs', function(){
    gulp.src('./src/imgs/*.*')
        .pipe(gulp.dest('./public/imgs'))
})
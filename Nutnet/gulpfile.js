var gulp = require('gulp')
var rename = require('gulp-rename') // чтобы минифицирвоать файл
var sass = require('gulp-sass') // для конвертации в sass
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')

var brw = require('browser-sync').create() //чтобы перезагружать браузер, она так же дает адреса 

function css_style (done) {
  gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init()) // инициализация переменной включаем его
    .pipe(sass({  // конвертируем sass файл в css
      errorLogToConsole: true, // отлов ошибок в консоль
      outputStyle: 'compressed' // убирает лишние пробелы
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({ suffix: '.min' })) //добавляем в имя .min
    .pipe(sourcemaps.write()) // записываем все настрйоки в sourcemaps
    .pipe(gulp.dest('./css/')) // куда будет скинут этот файл 
    .pipe(brw.stream());  // чтобы отслеживать изменения и показывать их на сайте
    done();
} 

function sync(done){
    brw.init({
        server: {
            baseDir: "./"     //отслеживаются файйлы директории
        },
        port: 3000
    }); 
    done();
}

function browserReload(done) { //перезагрузка будет даже от html элементов
  brw.reload();
  done();
}


function watchFiles() { // автоматически проверяет изменения файлов
  gulp.watch('./scss/**/*', css_style);
  gulp.watch('./**/*.html', browserReload);
  gulp.watch('./**/*.js', browserReload);
}

gulp
gulp.task('default', gulp.parallel(watchFiles, sync));
gulp.task(sync);

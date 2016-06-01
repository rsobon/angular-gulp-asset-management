var gulp = require('gulp');

gulp.task('default', ['installFonts'], function () {

    var bowerFiles = require('main-bower-files'),
        inject = require('gulp-inject'),
        angularFilesort = require('gulp-angular-filesort'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        cleanCss = require('gulp-clean-css'),
        argv = require('yargs').argv,
        rename = require('gulp-rename'),
        gulpif = require('gulp-if')
        ;
    
    var buildDirectory = './app/assets/build';
    var vendorDirectory = './app/assets/vendors';

    var bowerStreamJS = gulp.src(bowerFiles('**/*.js'));
    var bowerStreamCSS = gulp.src(bowerFiles('**/*.css'));
    var appStreamJS = gulp.src(['./app/src/**/*.js'])
        .pipe(angularFilesort());
    var appStreamCSS = gulp.src(['./app/src/app.css']);
    
    // run this action if gulp is run with --production argument
    if (argv.production) {
        // Concatenate and minify bower scripts
        bowerStreamJS = bowerStreamJS
            .pipe(concat('vendors.js'))
            .pipe(uglify())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify bower css
        bowerStreamCSS = bowerStreamCSS
            .pipe(concat('vendors.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify app scripts
        appStreamJS = appStreamJS
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest(buildDirectory));

        // Concatenate and minify app css
        appStreamCSS = gulp.src('app/*.css')
            .pipe(concat('app.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest(buildDirectory));

    }
    // default gulp action
    else {
        bowerStreamJS = bowerStreamJS
            .pipe(gulp.dest(vendorDirectory));
        bowerStreamCSS = bowerStreamCSS
            .pipe(gulp.dest(vendorDirectory));
    }

    // choose source index.html to inject
    gulp.src('./app/index.html')
        // send bower bower scripts
        .pipe(
            inject(bowerStreamJS, {relative: true, name: 'bower'})
        )
        // send bower bower css
        .pipe(
            inject(bowerStreamCSS, {relative: true, name: 'bower'})
        )
        // send app scripts
        .pipe(
            inject(appStreamJS, {relative: true})
        )
        // send app css
        .pipe(
            inject(appStreamCSS, {relative: true})
        )
        // create index.min.html if run with --production argument
        .pipe(
            gulpif(argv.production, rename('index.min.html'))
        )
        // save the file
        .pipe(
            gulp.dest('app')
        );

});


gulp.task('installFonts', function () {
    var bowerFiles = require('main-bower-files');

    return gulp.src(bowerFiles('**/fonts/*'))
        .pipe(gulp.dest('./app/assets/fonts'));

});
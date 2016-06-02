## Angular Gulp Asset Management

This is an example app based on [angular-seed](https://github.com/angular/angular-seed) with clean front-end asset management using Gulp.

I wanted to have two HTML layout files - one for development with separate assets and one for production with concatenated, minified assets.

Also I don't checkout `bower_components` into version control, so I need to build sources into another directory `app/assets/build`. That's where Gulp comes in handy.

Used resources
* gulp, bower
* [gulp-main-bower-files](https://www.npmjs.com/package/gulp-main-bower-files/)
* [gulp-inject](https://www.npmjs.com/package/gulp-inject/)
* [gulp-angular-filesort](https://www.npmjs.com/package/gulp-angular-filesort/)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat/)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css/)
* [yargs](https://www.npmjs.com/package/yargs)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename/)
* [gulp-if](https://www.npmjs.com/package/gulp-if/)

### Installation

```bash
$ git clone git@github.com:rsobon/angular-gulp-asset-management.git
$ cd angular-gulp-asset-management
$ npm install
```

### Inject assets into index.html:

```bash
$ gulp
```

### Combine, minify and inject assets index.prod.html:

```bash
$ gulp --production
```

### Run HTTP Server:

```bash
$ npm start
```

You can access the app on http://localhost:8000

You can access the production version of index on http://localhost:8000/index.prod.html

Note: this is only for tutorial purposes - in real situation you would probably like to have production HTML file `index.prod.html` renamed into `index.html`, and maybe keep development version of the file as `index.dev.html` or something like that.  
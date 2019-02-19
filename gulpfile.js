// 必要プラグインの読み込み (var gulp = ~ でも可)
let gulp = require("gulp");
let webpackStream = require("webpack-stream");
let webpack = require("webpack");
let WebpackBuildNotifierPlugin = require('webpack-build-notifier');

let pug = require('gulp-pug');
let plumber = require("gulp-plumber");
let sass = require('gulp-sass');
let sassVariables = require('gulp-sass-variables');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let notify = require("gulp-notify");
let browserSync = require("browser-sync");
let runSequence = require('run-sequence');
let watch = require('gulp-watch');

let minimist = require('minimist');
let del = require('del');

// webpackの設定ファイルの読み込み
let config = require("./config");


let argv = minimist(process.argv.slice(2));
let targettype = argv.env;


let DIST = '';
if (targettype == "stage") {
  DIST = './stage/';
  console.log("🐥", targettype, "🐥");

} else if (targettype == "production") {
  DIST = './prod/';
  console.log("🐓", targettype, "🐓");

} else {
  DIST = './dist/';
  console.log("🥚", targettype, "🥚");

}


// Default
gulp.task("default", () => {
  if (targettype == "development") {
    runSequence('pug', 'copy', 'images', 'sass', 'js', 'watch', 'browser-sync');
  } else {
    runSequence('clean', 'pug', 'copy', 'images', 'sass', 'js', 'watch', 'browser-sync');
  }
});


// Watchs
gulp.task('watch', function() {
  // gulp.watch(SRC_JS + "**/*.js", ['js']); // webpackStream プラグインのなかで watch している。ここで監視するとエラー発生時に止まってしまう。
  watch(SRC_SCSS + '**/*.scss', function() {
    gulp.start('sass');
  });
  watch([SRC_PUG + '**/*.pug', '!' + SRC_PUG + '**/_*.pug'], function() {
    gulp.start('pug');
  });
  // gulp.watch([SRC_PUG + '**/*.pug', '!' + SRC_PUG + '**/_*.pug'], ['pug']);
  watch(SRC_IMAGES + '**/*', function() {
    gulp.start('images');
  });
  watch(SRC_COPYFILE + '**/*', function() {
    gulp.start('copy');
  });
  watch(SRC + "**/*", function() {
    gulp.start('browserSyncSuppressOverReload');
  });
});


gulp.task('images', function() {
  gulp.src(SRC_IMAGES + '**/*')
    .pipe(gulp.dest(DIST + DIST_IMAGES));
});


// Copy
gulp.task('copy', function() {
  gulp.src('./src/copy/**/*')
    .pipe(gulp.dest(DIST + DIST_COPYFILE));
});

// Clean
gulp.task('clean', function(cb) {
  return del(DIST + '*', cb);
});


// Js
gulp.task("js", () => {
  var MODE = "development";
  if (targettype == "production") {
    MODE = "production";
  }
  var webpackOption = {
    watch: true,
    mode: MODE,
    entry: WEBPACK_ENTRY,
    output: {
      filename: "[name].js"
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {
                'modules': false
              }]
            ]
          }
        }]
      }]
    },
    plugins: [
      new WebpackBuildNotifierPlugin({
        title: "My Project Webpack Build",
        // logo: path.resolve("./img/favicon.png"),
        suppressSuccess: 'true'
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery"
      }),
    ]
  }
  gulp.src('')
    .pipe(webpackStream(webpackOption, webpack))
    .pipe(plumber())
    .pipe(gulp.dest(DIST));
});


// Sass
gulp.task('sass', function() {
  if (targettype == "production") {
    return gulp.src(SRC_SCSS + '**/*.scss')
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sassVariables({
        $IMAGES_PATH: IMAGES_PATH_PROD
      }))
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .pipe(autoprefixer())
      .pipe(gulp.dest(DIST + DIST_CSS))
  } else if (targettype == "stage") {
    return gulp.src(SRC_SCSS + '**/*.scss')
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sourcemaps.init())
      .pipe(sassVariables({
        $IMAGES_PATH: IMAGES_PATH_STAG
      }))
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST + DIST_CSS))
  } else {
    return gulp.src(SRC_SCSS + '**/*.scss')
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sourcemaps.init())
      .pipe(sassVariables({
        $IMAGES_PATH: IMAGES_PATH
      }))
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST + DIST_CSS))
  }
});


// Pug
gulp.task('pug', () => {
  return gulp.src([SRC_PUG + '**/*.pug', '!' + SRC_PUG + '**/_*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(DIST + DIST_HTML));
});

jsPathSet = () => {
  if (targettype == "stage") {
    return JS_PATH_STAG;
  } else if (targettype == "production") {
    return JS_PATH_PROD;
  } else {
    return JS_PATH;
  }
}

cssPathSet = () => {
  if (targettype == "stage") {
    return CSS_PATH_STAG;
  } else if (targettype == "production") {
    return CSS_PATH_PROD;
  } else {
    return CSS_PATH;
  }
}

const pugOptions = {
  pretty: PUG_PRETTY,
  locals: {
    SITE_NAME: SITE_NAME,
    SITE_URL: targettype == "prod" ? SITE_OGP_URL : targettype == "stage" ? STAGE_SITE_URL : DIST_SITE_URL,
    SITE_DESCRIPTION: SITE_DESCRIPTION,
    SITE_KEYWORDS: SITE_KEYWORDS,
    SITE_OGP_URL: targettype == "prod" ? SITE_OGP_URL : targettype == "stage" ? STAGE_SITE_URL : DIST_SITE_URL,
    SITE_OGP_TITLE: SITE_OGP_TITLE,
    SITE_OGP_DESCRIPTION: SITE_OGP_DESCRIPTION,
    SITE_OGP_IMAGE: (targettype == "prod" ? SITE_OGP_URL : targettype == "stage" ? STAGE_SITE_URL : DIST_SITE_URL) + SITE_OGP_IMAGE,
    SITE_OGP_SITE_NAME: SITE_OGP_SITE_NAME,
    SITE_OGP_TYPE: SITE_OGP_TYPE,
    SITE_OGP_LOCALE: SITE_OGP_LOCALE,
    SITE_OGP_APP_ID: SITE_OGP_APP_ID,
    GA_ID: GA_ID,

    LANG: LANG,

    IMAGES_PATH: IMAGES_PATH,

    JS_PATH: jsPathSet(),
    CSS_PATH: cssPathSet(),

    TARGETTYPE: targettype
  }
}



//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: DIST
    },
    reloadThrottle: 1800
  });
});

var timeoutidBs;
gulp.task('browserSyncSuppressOverReload', () => {
  clearTimeout(timeoutidBs);
  timeoutidBs = setTimeout(function() {
    browserSync.reload();
    if (targettype == "stage") {
      console.log("🐥 " + targettype + " 🐥");
    } else if (targettype == "production") {
      console.log("🐓 " + targettype + " 🐓");
    } else {
      console.log("🥚 " + targettype + " 🥚");
    }
  }, 500);
});

// http://bit.ly/2DgGXLI
// http://bit.ly/2lKAcJs
// http://bit.ly/2ItoUlN
// http://bit.ly/2KsBCDk
// http://bit.ly/2MxrkCD
// http://bit.ly/2MtrZol
// http://bit.ly/2Ko5QHy
// http://bit.ly/2Mp2hkS
// http://bit.ly/2Ks92lk
// http://bit.ly/2Mra8hW
// http://bit.ly/2Km8Zrj
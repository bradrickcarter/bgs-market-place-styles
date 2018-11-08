// --------------------------------------------------------
// Dependencies
// --------------------------------------------------------

// Fractal
const fractal = require('./fractal.js');
const logger = fractal.cli.console;

// Utilities
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const del = require('del');

// CSS
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const svg = require('postcss-svg');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// --------------------------------------------------------
// Configuration
// --------------------------------------------------------

// Paths
const paths = {
  src: `${__dirname}/src`,              // Source files
  build: `${__dirname}/build`,          // 
  static: `${__dirname}/static`,        // For housing temporary asset files while the dev server is running
}

const modules = [
  `${paths.src}/components/**/*.js`,
  `!${paths.src}/components/**/*.config.js`,
  `${paths.src}/docs/**/*.js`
]

// --------------------------------------------------------
// Tasks
// --------------------------------------------------------

// Clean Assets Directory
// 
// Clears out the assets directory from our static folder
function clean() {
  return del(`${paths.static}/assets/`)
}

// Build Static Site
// 
// Builds a static version of the Fractal site into the /dist/ directory which
// gets it ready for distribution

function build() {
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));

  return builder.build().then(() => {
    logger.success('👊  Connect Style build completed!');
  });
}

// Build Styles
// 
// Compiles our Sass

function styles() {
  return gulp.src(`${paths.src}/assets/styles/*.scss`)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))   // Displays error messages using native OS notificaitons
    .pipe(sourcemaps.init())                  // Build source maps
    .pipe(sass().on('errr', sass.logError))
    .pipe(postcss([svg, autoprefixer()]))     // Use PostCSS to insert SVGs and run Autoprefixer
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.static}/assets/styles`))
}

// Copy Images
// 
// Copies any images over to our static assets directory
function images() {
  return gulp.src(`${paths.src}/assets/images/**/*`)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(gulp.dest(`${paths.static}/assets/images`))
}


// Run our Development Web Server
// 
// Starts up Fractal and our dev server
function serve() {
  const server = fractal.web.server({
    sync: true
  })

  server.on('error', err => logger.error(err.message));

  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

// Watch Files for Changes
// 
// Watches our various files for changes and re-runs tasks
function watch() {
  serve()
  gulp.watch(`${paths.src}/**/*.scss`, styles)      // Watch Styles and rebuild
  // gulp.watch(`${paths.src}/**/*.js`, scripts)       // Watch Scripts and rebuild
  gulp.watch(`${paths.src}/assets/images`, images)  // Watch images and re-copy to static assets
  // gulp.watch(`${paths.src}/assets/icons`, gulp.series(icons, styles))   // Watch icons and rebuild
}

// --------------------------------------------------------
// Task Series
// --------------------------------------------------------

const compile = gulp.series(clean, gulp.parallel(styles))

gulp.task('default', gulp.series(compile, watch));
gulp.task('build', gulp.series(compile, build));
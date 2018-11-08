'use strict';

/*
* Require the path module
*/
const path = require('path');

const paths = {
  src: `${__dirname}/src`,
  build: `${__dirname}/dist`,
  static: `${__dirname}/static`
}

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Slalom Fractal Accelerator');

/*
 * Tell Fractal where to look for components.
 */
 fractal.components.set('path', `${paths.src}/components`);

/*
 * Tell Fractal where to look for documentation pages.
 */
 fractal.docs.set('path', `${paths.src}/docs`);

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
 fractal.web.set('static.path', paths.static);
 fractal.web.set('builder.dest', paths.build);

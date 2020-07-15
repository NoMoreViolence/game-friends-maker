const path = require('path');
const { src, series, watch, dest, parallel } = require('gulp');
const clean = require('gulp-clean');

/**
 * absolute paths
 */
const PACKAGE = path.join(__dirname, '..');
const SOURCES = path.join(PACKAGE, 'src/**/*');
const EXTERNAL_SOURCES_LIST = [
  path.join(PACKAGE, '..', 'maker-backend/src/common-server'),
  path.join(PACKAGE, '..', 'backend-query/src/common-server'),
];

/**
 * job: clean
 */
function cleanSourcesAt(sourcePath) {
  return function cleanSources() {
    return src(sourcePath, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
  };
}
const cleanSources = parallel(...EXTERNAL_SOURCES_LIST.map((sourcesPath) => cleanSourcesAt(sourcesPath)));

/**
 * job: copySrc
 */
function copySources() {
  let copyPipe = src(SOURCES);
  for (const externalSources of EXTERNAL_SOURCES_LIST) {
    copyPipe = copyPipe.pipe(dest(externalSources));
  }
  return copyPipe;
}

/**
 * job: recopySources
 */
// const recopySources = series(cleanSources, copySources);
const recopySources = series(cleanSources, copySources);

/**
 * job: watch -> cleanSources -> copySrc
 */
function watchAndRecopy() {
  return watch(SOURCES, recopySources);
}

exports.clean = cleanSources;
exports.dev = series(recopySources, watchAndRecopy);
exports.build = recopySources;

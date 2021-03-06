'use strict';

/**
 * Kalabox download utility module.
 * @module kbox.util.download
 */

// Npm modules
var Promise = require('bluebird');

/**
 * Downloads a bunch of files and extracts those as appropriate
 * @arg {array} urls - Array of URLs to download.
 * @arg {error} dest - Where we want the downloads to end up
 * @arg {vinyl} callback.files - Array of vinyl objects
 * @example
 * kbox.util.download.downloadFiles()
 *
 * .then(function(files) {
 * });
 */
exports.downloadFiles = function(urls, dest) {

  // Moved these to inside the function so they will lazy load.
  var Download = require('download');
  var progress = require('download-status');
  var download = new Download({extract: true});

  // Set each URL
  urls.forEach(function(url) {
    download.get(url);
  });

  // Set the destination and use the download progress
  // middleware
  download.dest(dest).use(progress());

  // Promisify our download run
  return Promise.fromNode(function(callback) {
    download.run(callback);
  });

};

'use strict';

/**
 * @ngdoc service
 * @name terrometerApp.tweet
 * @description
 * # tweet
 * Service in the terrometerApp.
 */
angular.module('terrometerApp')
  .service('tweet', function () {
    return Restangular.all('tweet');
  });

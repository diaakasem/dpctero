'use strict';

/**
 * @ngdoc service
 * @name terrometerApp.tweet
 * @description
 * # tweet
 * Service in the terrometerApp.
 */
angular.module('terrometerApp')
  .service('Tweet', function (Restangular) {
    return Restangular.all('tweet');
  });

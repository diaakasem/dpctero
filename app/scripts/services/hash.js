'use strict';

/**
 * @ngdoc service
 * @name terrometerApp.hash
 * @description
 * # hash
 * Service in the terrometerApp.
 */
angular.module('terrometerApp')
  .service('hash', function (Restangular) {
    return Restangular.all('hash');
  });

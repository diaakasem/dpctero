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
    var service = Restangular.all('tweet');
    service.addRestangularMethod('getTweets', 'post', 'gettweets');
    return service;
  });

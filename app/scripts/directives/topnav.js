'use strict';

/**
 * @ngdoc directive
 * @name terrometerApp.directive:topnav
 * @description
 * # topnav
 */
angular.module('terrometerApp')
  .directive('topnav', function () {
    return {
      templateUrl: 'views/directives/topnav.html',
      restrict: 'E',
      controller: function controller($scope, Tweet) {

          $scope.getTweets = function() {
              Tweet.getTweets().then(function() {
                  console.log("Done loading tweets");
              });
          };
      }
    };
  });

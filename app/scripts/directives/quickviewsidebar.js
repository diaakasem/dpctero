'use strict';

/**
 * @ngdoc directive
 * @name terrometerApp.directive:quickviewsidebar
 * @description
 * # quickviewsidebar
 */
angular.module('terrometerApp')
  .directive('quickviewsidebar', function () {
    return {
      templateUrl: 'views/directives/quickviewsidebar.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });

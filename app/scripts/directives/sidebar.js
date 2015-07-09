'use strict';

/**
 * @ngdoc directive
 * @name terrometerApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('terrometerApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'views/directives/sidebar.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });

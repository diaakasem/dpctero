'use strict';

/**
 * @ngdoc directive
 * @name terrometerApp.directive:builder
 * @description
 * # builder
 */
angular.module('terrometerApp')
  .directive('builder', function () {
    return {
      templateUrl: 'views/directives/builder.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });

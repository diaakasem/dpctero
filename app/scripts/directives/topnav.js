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
      link: function postLink(scope, element, attrs) {
      }
    };
  });

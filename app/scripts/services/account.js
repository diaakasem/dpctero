'use strict';

/**
 * @ngdoc service
 * @name terrometerApp.account
 * @description
 * # account
 * Service in the terrometerApp.
 */
angular.module('terrometerApp')
.service('account', function (Restangular) {
    return Restangular.all('account');
});

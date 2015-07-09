'use strict';

/**
 * @ngdoc service
 * @name terrometerApp.account
 * @description
 * # account
 * Service in the terrometerApp.
 */
angular.module('terrometerApp')
.service('account', function () {
    return Restangular.all('account');
});

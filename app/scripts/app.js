'use strict';

/**
 * @ngdoc overview
 * @name terrometerApp
 * @description
 * # terrometerApp
 *
 * Main module of the application.
 */
var app = angular.module('terrometerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'restangular'
]);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl',
      controllerAs: 'contact'
    })
    .when('/terms', {
      templateUrl: 'views/terms.html',
      controller: 'TermsCtrl',
      controllerAs: 'terms'
    })
    .otherwise({
        redirectTo: '/'
    });
});
app.run(function(Restangular) {
    Restangular.setBaseUrl('/api/v1/');

    function cleanRestangular(element) {

        _.each(element, function(v, k) {
            if(_.isString(k) && k.match(/\_promise/)){
                delete element[k];
            }
            if (_.isObject(v)) {
                if (v.resource_uri) {
                    element[k] = v.resource_uri;
                    // For Course Element update
                } else if (k === 'children') {
                    _.each(element.children, cleanRestangular);
                } else if(_.isArray(v)) {
                    cleanRestangular(v);
                } else {
                    delete v.parentResource;
                    delete v.reqParams;
                    delete v.fromServer;
                    delete v.route;
                    delete v.restangularCollection;

                }

            }

        });
    }
    // add a request intereceptor
    Restangular.addRequestInterceptor(function(element, operation, what, url) {
        cleanRestangular(element);
        return element;
    });

    // add a response intereceptor
    // add custom calls that needed to be paginable here

    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData = data;
        if (operation === "getList" && data.meta && !_.isArray(data)) {
            extractedData = data.objects || [];
            extractedData.meta = data.meta;
        }
        // Don't move this inside the above if statement
        // because data might be altered in cache service Interceptors
        if (['profile', 'notification'].indexOf(what) < 0 &&
                extractedData.meta &&
                [0, 1, 1000].indexOf(extractedData.meta.limit) < 0) {
            Common.pagination = data.meta;
            root.$broadcast('list_response');
        }
        return extractedData;
    });
});

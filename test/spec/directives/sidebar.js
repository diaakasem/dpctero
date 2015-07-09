'use strict';

describe('Directive: sidebar', function () {

  // load the directive's module
  beforeEach(module('terrometerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sidebar></sidebar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sidebar directive');
  }));
});

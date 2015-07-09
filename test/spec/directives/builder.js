'use strict';

describe('Directive: builder', function () {

  // load the directive's module
  beforeEach(module('terrometerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<builder></builder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the builder directive');
  }));
});

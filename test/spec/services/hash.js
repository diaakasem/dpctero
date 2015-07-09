'use strict';

describe('Service: hash', function () {

  // load the service's module
  beforeEach(module('terrometerApp'));

  // instantiate service
  var hash;
  beforeEach(inject(function (_hash_) {
    hash = _hash_;
  }));

  it('should do something', function () {
    expect(!!hash).toBe(true);
  });

});

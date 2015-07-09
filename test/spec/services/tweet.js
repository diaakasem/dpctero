'use strict';

describe('Service: tweet', function () {

  // load the service's module
  beforeEach(module('terrometerApp'));

  // instantiate service
  var tweet;
  beforeEach(inject(function (_tweet_) {
    tweet = _tweet_;
  }));

  it('should do something', function () {
    expect(!!tweet).toBe(true);
  });

});

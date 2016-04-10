import {expect, should }  from 'chai';
import assert from 'assert';
import DCube from '../src/index';

let sampleCube;

describe('Properties', function() {
  beforeEach(function(done) {
    sampleCube = DCube();
    done();
  });

  describe('DCube.dimensions() Get and Set', function () {
    it('Should return the supplied dimension array when no parameter is present', function (done) {
      sampleCube.dimensions(['a', 'b', 'c']);

      let result = sampleCube.dimensions();
      expect(result).to.eql(['a', 'b', 'c']);
      done();
    });
  });

  describe('DCube.facts() Get and Set', function () {
    it('Should return the supplied dimension array when no parameter is present', function (done) {
      sampleCube.facts(['a', 'b', 'c']);

      let result = sampleCube.facts();
      expect(result).to.eql(['a', 'b', 'c']);
      done();
    });
  });
});

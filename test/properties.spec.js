import {expect, should }  from 'chai';
import assert from 'assert';
import DTree from '../src/index';

let sampleTree;

describe('Properties', function() {
  beforeEach(function(done) {
    sampleTree = DTree();
    done();
  });

  describe('DTree.dimensions() Get and Set', function () {
    it('Should return the supplied dimension array when no parameter is present', function (done) {
      sampleTree.dimensions(['a', 'b', 'c']);

      let result = sampleTree.dimensions();
      expect(result).to.eql(['a', 'b', 'c']);
      done();
    });
  });

  describe('DTree.facts() Get and Set', function () {
    it('Should return the supplied dimension array when no parameter is present', function (done) {
      sampleTree.facts(['a', 'b', 'c']);

      let result = sampleTree.facts();
      expect(result).to.eql(['a', 'b', 'c']);
      done();
    });
  });
});

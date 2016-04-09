import {expect, should }  from 'chai';
import assert from 'assert';
import DTree from '../src/index';

let sampleTree;

describe('Empty Tree Contruction', function() {
  beforeEach(function(done) {
    sampleTree = DTree();

    sampleTree.dimensions(['a']);
    sampleTree.data([]);

    done();
  });

  describe('DTree.data([])', function () {
    it('Should not crash on empty array', function (done) {
      sampleTree.data([]);

      expect(sampleTree()).to.eql([]);
      done();
    });
  });
});

describe('Basic Tree Contruction', function() {
  beforeEach(function(done) {
    sampleTree = DTree();
    sampleTree.dimensions(['a']);
    sampleTree.data([{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }]);

    done();
  });

  describe('DTree.data(...)', function () {
    it('Should return 4 distinct groups', function (done) {
      expect(sampleTree().map( x=>x.key )).to.eql([1, 2, 3]);
      done();
    });

    it('Should return empty array children', function (done) {
      expect(sampleTree().map( x=>x.children )).to.eql([[], [], []]);
      done();
    });

    it('Should return empty object facts', function (done) {
      expect(sampleTree().map( x=>x.facts )).to.eql([{}, {}, {}]);
      done();
    });

  });
});

describe('Construction with callbacks', function() {
  beforeEach(function(done) {
    sampleTree = DTree();
    sampleTree.dimensions([function(d) {
      if(d.a%2) return 'odd';
      return 'even';
    }]);

    sampleTree.data([{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }]);

    done();
  });

  describe('DTree.data(...)', function () {
    it('Should return 2 distinct groups - odd and even', function (done) {
      expect(sampleTree().map( x=>x.key )).to.eql(['odd', 'even']);
      done();
    });
  });
});

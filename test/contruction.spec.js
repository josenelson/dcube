import {expect, should }  from 'chai';
import assert from 'assert';
import DTree from '../src/index';

let sampleTree,
    sampleData1 = [
      { 'a': 1 },
      { 'a': 2 },
      { 'a': 3 },
    ],
    sampleData2 = [
      { 'a': 1 , 'b': 'value1' , c: 0.1 },
      { 'a': 2 , 'b': 'value3' , c: 0.1 },
      { 'a': 1 , 'b': 'value1' , c: 0.2 },
      { 'a': 1 , 'b': 'value4' , c: 0.3 },
      { 'a': 3 , 'b': 'value1' , c: 0.4 },
      { 'a': 3 , 'b': 'value2' , c: 0.5 },
    ];

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

    sampleTree = DTree().
        dimensions(['a']).
        data(sampleData1)
        ;

    done();
  });

  describe('DTree.data(...)', function () {
    it('Should return 3 distinct groups', function (done) {
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

    it('Group values should corresponde to the appropriate element in the array', function(done){
      let tree = sampleTree();

      tree.map((item) => {
        expect(item.values).to.eql(sampleData1.filter((d) => { return d['a'] === item.key }));
      });

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

describe('Multilevel tree contruction', function() {
  beforeEach(function(done) {
    sampleTree = DTree().
        dimensions(['a', 'b']).
        data(sampleData2)
        ;

    done();
  });

  describe('DTree.data([...]) with 2 levels', function () {
    it('Should not crash on empty array', function (done) {
      let tree = sampleTree();
      console.log(tree);
      done();
    });
  });
});

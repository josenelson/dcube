import {expect, should }  from 'chai';
import assert from 'assert';
import DCube from '../src/index';

let sampleCube,
    sampleData = [
      { 'a': 1 },
      { 'a': 2 },
      { 'a': 3 },
    ];

describe('Empty Cube Contruction', function() {
  beforeEach(function(done) {
    sampleCube = DCube();
    sampleCube.dimensions(['a']);
    sampleCube.facts([
      { name: 'f1_sum' }
    ]);
    sampleCube.data([]);
    done();
  });

  describe('DCube.data([])', function () {
    it('Should not crash on empty array', function (done) {
      sampleCube.data([]);
      expect(sampleCube()).to.eql([]);
      done();
    });
  });
});

describe('Basic Cube Contruction', function() {
  beforeEach(function(done) {
    sampleCube = DCube();
    sampleCube.dimensions(['a']);
    sampleCube.data(sampleData);

    done();
  });

  describe('DCube.data(...)', function () {
    it('Should return 3 distinct groups', function (done) {
      expect(sampleCube().map( x=>x.key )).to.eql([1, 2, 3]);

      done();
    });

    it('Should return empty array children', function (done) {
      expect(sampleCube().map( x=>x.children )).to.eql([[], [], []]);

      done();
    });

    it('Should return empty object facts', function (done) {
      expect(sampleCube().map( x=>x.facts )).to.eql([{}, {}, {}]);

      done();
    });

    it('Group values should corresponde to the appropriate element in the array', function(done){
      let cube = sampleCube();

      cube.map((item) => {
        expect(item.values).to.eql(sampleData.filter((d) => { return d['a'] === item.key }));
      });

      done();
    });
  });
});

describe('Construction with callbacks', function() {

  beforeEach(function(done) {
    sampleCube = DCube();
    sampleCube.dimensions([function(d) {
      if(d.a%2) return 'odd';
      return 'even';
    }]);

    sampleCube.data([{ 'a': 1 }, { 'a': 2 }, { 'a': 3 }]);
    done();
  });

  describe('DCube.data(...)', function () {
    it('Should return 2 distinct groups - odd and even', function (done) {
      expect(sampleCube().map( x=>x.key )).to.eql(['odd', 'even']);
      done();
    });
  });
});

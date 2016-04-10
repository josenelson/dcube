import {expect, should }  from 'chai';
import assert from 'assert';
import d3 from 'd3';

import DTree from '../src/index';
import { avgFunc } from '../test/utilities';

let sampleTree,
    sampleData = [
      { 'a': 1, 'f1': 12 },
      { 'a': 2, 'f1': 6 },
      { 'a': 3, 'f1': 3 },
      { 'a': 3, 'f1': 12 },
      { 'a': 2, 'f1': 6 },
      { 'a': 4, 'f1': 3 },
    ];

describe('Contruction with facts', function() {
  beforeEach(function(done) {
    sampleTree = DTree().
      dimensions(['a']).
      facts([
        { name: 'f1_sum', reduce: d3.sum, map: x=>x.f1 },
        { name: 'f1_avg', reduce: avgFunc('f1') },
      ]).
      data(sampleData);

    done();
  });

  describe('DTree.data([])', function () {
    it('Should not crash on empty array', function (done) {
      let tree = sampleTree();

      const expectedResults = {
        1: { f1_sum: 12, f1_avg: 12  },
        2: { f1_sum: 12, f1_avg: 6   },
        3: { f1_sum: 15, f1_avg: 7.5 },
        4: { f1_sum: 3,  f1_avg: 3   }
      }

      tree.map((node) => {
        let result = expectedResults[node.key];

        expect(result).to.not.be.null;
        expect(node.facts.f1_sum).to.equal(result.f1_sum);
        expect(node.facts.f1_avg).to.equal(result.f1_avg);
      });

      done();
    });
  });
});

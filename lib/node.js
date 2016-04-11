'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var computeFacts = function computeFacts(childNode, data, facts) {
  var fact = null,
      childData = childNode.values;
  //a fact will have, name, reduce, [map]

  for (var i = 0; i < facts.length; i++) {
    fact = facts[i];

    if (fact.map) {
      childNode.facts[fact.name] = fact.reduce(childData.map(fact.map));
    } else {
      childNode.facts[fact.name] = fact.reduce(childData);
    }
  }
};

var Node = function Node(dimensions, data, facts) {
  var _groups = [],
      _dimension = dimensions[0];

  var build = function build() {
    var d = null,
        key = null,
        keyValues = {},
        rmDimensions = dimensions.splice(1),
        getter = typeof _dimension === 'function' ? _dimension : function (x) {
      return x[_dimension];
    };

    for (var i = 0; i < data.length; i++) {
      d = data[i];
      key = getter(d);

      if (keyValues[key] !== undefined) {
        keyValues[key].values.push(d);
      } else {
        keyValues[key] = {
          key: key,
          facts: {},
          values: [d]
        };

        _groups.push(keyValues[key]);
      }

      if (rmDimensions.length > 0) keyValues[key].children = Node(rmDimensions, keyValues[key].values, facts);

      computeFacts(keyValues[key], data, facts);
    }
  };

  var ret = function ret() {
    /*
      right now it make a copy to the original node,
      placeholder in case the internal node structure change
      to improve performance
    */
    return _groups.map(function (x) {
      return {
        key: x.key,
        facts: x.facts,
        children: x.children ? x.children() : [],
        values: x.values.map(function (d) {
          return d;
        })
      };
    });
  };

  build();
  return ret;
};

exports.default = Node;
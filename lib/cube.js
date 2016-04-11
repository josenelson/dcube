'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DTree = function DTree() {
  var _dimensions = [],
      _facts = [],
      _data = [],
      _rootNode = null;

  var buildTree = function buildTree() {
    if (_dimensions.length == 0) return;
    _rootNode = (0, _node2.default)(_dimensions, _data, _facts);
  };

  var ret = function ret() {
    var result = _rootNode();
    return result;
  };

  ret.dimensions = function (_) {
    if (arguments.length === 0) return _dimensions;
    _dimensions = _;
    return ret;
  };

  ret.facts = function (_) {
    if (arguments.length === 0) return _facts;
    _facts = _;
    return ret;
  };

  ret.data = function (_) {
    if (arguments.length === 0) return _data;
    _data = _;

    buildTree();

    return ret;
  };

  return ret;
};

exports.default = DTree;
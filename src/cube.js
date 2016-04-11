import Slice from './slice';

const DCube = function(){
  let _dimensions = [],
      _facts = [],
      _data = [],
      _rootNode = null;

  let buildTree = function() {
    if(_dimensions.length == 0) return;
    _rootNode = Slice(_dimensions, _data, _facts);
  }

  const ret = function() {
    let result = _rootNode();
    return result;
  }

  ret.dimensions = function(_) {
    if(arguments.length === 0) return _dimensions;
    _dimensions = _;
    return ret;
  }

  ret.facts = function(_) {
    if(arguments.length === 0) return _facts;
    _facts = _;
    return ret;
  }

  ret.data = function(_) {
    if(arguments.length === 0) return _data;
    _data = _;

    buildTree();

    return ret;
  }

  return ret;
};

export { DCube as default };

const computeFacts = (childNode, data, facts) => {
  let fact = null,
      childData = childNode.values.map(function(i){ return data[i]; })
      ;
      //a fact will have, name, reduce, [initalValue], [map]

  for(let i = 0; i < facts.length; i++){
    fact = facts[i];

    if(fact.map) {
      childNode[fact.name] = fact.reduce(childData.map(fact.map));
    } else {
      childNode[fact.name] = fact.reduce(childData);
    }
  }
}

const Node = (dimensions, data, facts) => {
  let _groups = [],
      _dimension = dimensions[0];

  let build = function() {
    let d = null,
        key = null,
        keyValues = {},
        getter = typeof _dimension === 'function'
                  ? _dimension
                  : function(x) { return x[_dimension]; }
        ;

    for(let i = 0; i < data.length; i++){
      d = data[i];
      key = getter(d);

      if(keyValues[key] !== undefined) {
        keyValues[key].children.push(i);
      } else {
        keyValues[key] = {
          key: key,
          facts: {},
          children: [],
          values: [i]
        };

        _groups.push(keyValues[key]);
      }

      //TODO: recursion
      computeFacts(keyValues[key], data, facts);
    }
  }

  let ret = function() {
    return _groups.map((x) => {
      return {
        key: x.key,
        facts: x.facts,
        children: x.children,
        values: x.values.map((i) => { return data[i]; })
      }
    })
  }

  build();
  return ret;
}

const DTree = function(){
  let _dimensions = [],
      _facts = [],
      _data = [],
      _rootNode = null;

  let buildTree = function() {
    if(_dimensions.length == 0) return;
    _rootNode = Node(_dimensions, _data, _facts);
  }

  const ret = function() {
    return _rootNode();
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

export { DTree as default };

const computeFacts = (childNode, data, facts) => {
  let fact = null,
      childData = childNode.values
      ;
      //a fact will have, name, reduce, [map]

  for(let i = 0; i < facts.length; i++){
    fact = facts[i];

    if(fact.map) {
      childNode.facts[fact.name] = fact.reduce(childData.map(fact.map));
    } else {
      childNode.facts[fact.name] = fact.reduce(childData);
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
        rmDimensions = dimensions.splice(1),
        getter = typeof _dimension === 'function'
                  ? _dimension
                  : function(x) { return x[_dimension]; }
        ;

    for(let i = 0; i < data.length; i++){
      d = data[i];
      key = getter(d);

      if(keyValues[key] !== undefined) {
        keyValues[key].values.push(d);
      } else {
        keyValues[key] = {
          key: key,
          facts: {},
          children: [],
          values: [d]
        };

        _groups.push(keyValues[key]);
      }

      //TODO: recursion
      if(rmDimensions.length > 0)
        keyValues[key].children.push(Node(rmDimensions, keyValues[key].values, facts));

      computeFacts(keyValues[key], data, facts);
    }
  }

  let ret = function() {
    /*
      right now it make a copy to the original node,
      placeholder in case the internal node structure change
      to improve performance
    */
    return _groups.map((x) => {
      return {
        key: x.key,
        facts: x.facts,
        children: x.children.map( child=>child() ), //map here
        values: x.values.map( (d)=>{ return d; } )
      }
    });
  }

  build();
  return ret;
}

export { Node as default };

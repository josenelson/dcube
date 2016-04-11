/**
 * Computes the fact values for the data slice
 *
 * @param {object} childNode - The current dataslice.
 * @param {array} data - The data from the facts will be calculated from.
 * @param {object} facts - Resulting object where the facts will the added.
 */
const computeFacts = (childNode, data, facts) => {
  let fact = null,
      childData = childNode.values
      ;

  for(let i = 0; i < facts.length; i++){
    fact = facts[i];

    if(fact.map) {
      childNode.facts[fact.name] = fact.reduce(childData.map(fact.map));
    } else {
      childNode.facts[fact.name] = fact.reduce(childData);
    }
  }
}

/**
 * Represents a Slice of data associated with an dimension.
 * @constructor
 */
const Slice = (dimensions, data, facts) => {
  let _groups = [],
      _dimension = dimensions[0];

  /**
   * Builds the data slice computing the distinct values for the given dimension.
   *
   */
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
          values: [d]
        };

        _groups.push(keyValues[key]);
      }

      if(rmDimensions.length > 0)
        keyValues[key].children = Slice(rmDimensions, keyValues[key].values, facts);

      computeFacts(keyValues[key], data, facts);
    }
  }

  /**
   * Creates the object tree of the data with the following structure.
   *  - [slice]
   *    - key: the distinct fact value
   *    - facts: object with the computer fact values
   *    - children: array of child slices
   *    - values: the data associated with this slice
   */
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
        children: x.children ? x.children() : [],
        values: x.values.map( (d)=>{ return d; } )
      }
    });
  }

  build();
  return ret;
}

export { Slice as default };

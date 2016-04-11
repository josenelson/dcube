import Slice from './slice';

/**
 * Represents a Cube.
 * @constructor
 */
const DCube = function(){
  let _dimensions = [],
      _facts = [],
      _data = [],
      _rootNode = null;

  /**
   * Generates a object model of the cube containing:
   *       Slice1      Slice2      Slice3      ...
   *      - facts     - facts     - facts
   *      - values    - values    - values
   *      - children  - children  - children
   *
   * Each children is an array of slices
   */
  let buildTree = function() {
    if(_dimensions.length == 0) return;
    _rootNode = Slice(_dimensions, _data, _facts);
  }

  /**
   * Returns the result of the buildTree method.
   *
   */
  const ret = function() {
    let result = _rootNode();
    return result;
  }

  /**
   * Gets or sets an array of dimensions
   * each dimension can be represented by a string
   * or a callback function that returns and value
   * that can be compared using ====
   *
   * @param {Array} - the array of dimensions
   */
  ret.dimensions = function(_) {
    if(arguments.length === 0) return _dimensions;
    _dimensions = _;
    return ret;
  }

  /**
   * Gets or sets an array of facts
   * each fact is represented by and object
   * with the following properties:
   *  - name: a string representation of the fact, this will map to the facts object on the slice
   *  - reduce: a callback (f([data])) with will compute the value of the fact given an array of data
   *  - map: optionally a nap call back to transform the data being passed on the reduce function
   *
   * @param {Array} - the array of dimensions
   */
  ret.facts = function(_) {
    if(arguments.length === 0) return _facts;
    _facts = _;
    return ret;
  }

  /**
  * The data which the tree will be generated from
  *
  */
  ret.data = function(_) {
    if(arguments.length === 0) return _data;
    _data = _;

    buildTree();

    return ret;
  }

  /**
  * Makes this method a closure.
  *
  */
  return ret;
};

export { DCube as default };

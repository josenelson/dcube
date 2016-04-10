export function avgFunc(property) {
  return (values) => {
  //  console.log(values);
    let sum = 0,
        i = values.length-1
        ;

    for(; i>=0 ; i--)
      sum += values[i][property];

    return sum / values.length;
  };
}

exports.addOrRemoveFromArray = (array, value) => {
  let newArray;

  //check if value already exists in array
  if (array.includes(value)){

    // remove from array
    newArray = array.filter((arrayElement) => {
      return arrayElement != value;
    });

  } else{

     //add to array
    newArray = [...array, value];
  }

  return newArray
}

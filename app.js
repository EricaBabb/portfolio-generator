//const creates constant reference to js element.
//process is a global object that represents everything going on with this particular app
//argv is a property of process; an array that holds what is typed into the command line to capture and use it in the app
const profileDataArgs = process.argv.slice(2, process.argv.length);
//the array method .slice() returns a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array), and ending with the final index.
console.log(profileDataArgs);


// Notice the lack of parentheses around the `profileDataArr` parameter?
const printProfileData = profileDataArr => {
    for (let i = 0; i < profileDataArr.length; i++) {
      console.log(profileDataArr[i]);
    }
  };
  
  printProfileData(profileDataArgs);
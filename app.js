//Must include this statement with the built in require in order to use FS module functions
const fs = require('fs');
//We want to use generatePage function from the page-template/js so we must use REQUIRE it here
//Note here that the variable name is arbitrary; however, the relative path to include the file must be exact.
const generatePage = require('./src/page-template.js');

//const creates constant reference to js element.
//process is a global object that represents everything going on with this particular app
//argv is a property of process; an array that holds what is typed into the command line to capture and use it in the app
const profileDataArgs = process.argv.slice(2, process.argv.length);
//the array method .slice() returns a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array), and ending with the final index.

//We'll want to extract those arguments and store them into distinct variables:
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// refractored version of the above two const:
const [name, github] = profileDataArgs;




  fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });
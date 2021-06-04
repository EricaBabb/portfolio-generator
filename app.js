//Adding the inquier npm package
const inquirer = require('inquirer');

//This inquires about the user
const promptUser = () => {
    return inquirer.prompt([
      {
          //Type: input will allow text; name acts as the key to the actual input value; the message is what comes up as the actual prompt for users
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
  };
  
//This inquires about actual projects
  const promptProject = (portfolioData) => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
// If there's no 'projects' array property, create one
if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {//Type: checkbox allows users to check true or false of the choices array
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {//Type:confirm is a boolean that is true or false
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        //Using push to populate the portfolioData array, which holds the project(s)
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            //If the user confirms they have more projects to add, this will be true and the function promptProject will loop again. portfolioData must be included in the argument or else a new array will be made and previous project will be lost
          return promptProject(portfolioData);
        } else {
            //If the user declines to add another project, the statement will be false and the array portfolioData will be returned
          return portfolioData;
        }
      });
    
  };
//This calls the user prompt function and chains the answers from it together with the answers from the project prompt function
promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});

// //Must include this statement with the built in require in order to use FS module functions
// const fs = require('fs');
// //We want to use generatePage function from the page-template/js so we must use REQUIRE it here
// //Note here that the variable name is arbitrary; however, the relative path to include the file must be exact.
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);



// //the array method .slice() returns a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array), and ending with the final index.

// //We'll want to extract those arguments and store them into distinct variables:
// // const name = profileDataArgs[0];
// // const github = profileDataArgs[1];
// // refractored version of the above two const:
// const [name, github] = profileDataArgs;




//   fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });


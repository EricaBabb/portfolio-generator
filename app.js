
// const generateSite = require('./utils/generate-site.js');
//restructure:
const { writeFile, copyFile } = require('./utils/generate-site.js');


//We want to use generatePage function from the page-template/js so we must use REQUIRE it here
//Note here that the variable name is arbitrary; however, the relative path to include the file must be exact.
const generatePage = require('./src/page-template.js');

//Adding the inquier npm package
const inquirer = require('inquirer');

//This inquires about the user
const promptUser = () => {
    return inquirer.prompt([
      {
          //Type: input will allow text; name acts as the key to the actual input value; the message is what comes up as the actual prompt for users
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        //validate is a Boolean
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
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
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
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
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
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
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });


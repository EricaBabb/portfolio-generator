// create the about section
const generateAbout = aboutText => {
    if (!aboutText) {
      return '';
    }
  
    return `
      <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
        <p>${aboutText}</p>
      </section>
    `;
  };

// get array of just featured projects
        

        const generateProjects = projectsArr => {
            return `
              <section class="my-3" id="portfolio">
                <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
                <div class="flex-row justify-space-between">
                ${projectsArr
                  .filter(({ feature }) => feature)
                  .map(({ name, description, languages, link }) => {
    //Using the .filter() array method, we created two new arrays of project data based on whether their feature property was true or false. Once we separated the array data, we created two sets of HTML data and got them into the <section> element.
    //.map() takes the array of project data and we create a new array from it, called projectHtmlArr. Then we take that array and interpolate it into the returning project <section> element template literal.
    //Both methods are chained together                   
                    return `
                    <div class="col-12 mb-2 bg-dark text-light p-3">
                      <h3 class="portfolio-item-title text-light">${name}</h3>
                      <h5 class="portfolio-languages">
                        Built With:
                        ${languages.join(', ')}
                      </h5>
                      <p>${description}</p>
                      <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                    </div>
                  `;
                  })
                  .join('')}
          
                ${projectsArr
                  .filter(({ feature }) => !feature)
                  .map(({ name, description, languages, link }) => {
                    return `
                    <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                      <h3 class="portfolio-item-title text-light">${name}</h3>
                      <h5 class="portfolio-languages">
                        Built With:
                        ${languages.join(', ')}
                      </h5>
                      <p>${description}</p>
                      <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                    </div>
                  `;
                  })
                  .join('')}
                </div>
              </section>
            `;
          };
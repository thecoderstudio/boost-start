import {Generator} from 'yeoman-generator';

class ReactGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "project_name",
        message: "Your project name"
      },
      {
        type: "input",
        name: "project_description",
        message: "Your project description"
      },
      {
        type: "list",
        name: "bundler",
        message: "Choose a bundler",
        choices: ["Parcel", "Webpack"],
        default: 0,
      }
    ]).then((answers) => {

    });
  }
}

export default ReactGenerator

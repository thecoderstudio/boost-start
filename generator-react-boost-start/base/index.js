const Generator = require('yeoman-generator');
var rename = require("gulp-rename");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Your project name"
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Your project description"
      },
      {
        type: "input",
        name: "title",
        message: "Your project title"
      },
      {
        type: "input",
        name: "author",
        message: "Author"
      },
      {
        type: "list",
        name: "bundler",
        message: "Choose a bundler",
        choices: ["Parcel", "Webpack"],
        default: 0,
      }
    ]).then((answers) => {
      this.userInput = answers
    });
  }

  writing() {
    this.registerTransformStream(rename(function(path) {
        path.basename = path.basename.replace(/(_package)/g, 'package');
        path.dirname = path.dirname.replace(/(_package)/g, 'package');
    }));
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath(this.userInput.projectName),
      {
        name: this.userInput.projectName,
        description: this.userInput.projectDescription,
        title: this.userInput.title,
        author: this.userInput.author
      }
    );
  }
}

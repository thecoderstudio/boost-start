const Generator = require('yeoman-generator');
const rename = require("gulp-rename");

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.destinationPath(this.options.projectName));

    if (this.options.bundler == 'Parcel') {
      this.composeWith(require.resolve('../parcel'), {
        title: this.options.title,
        destinationRoot: this.destinationRoot
      });
    }
  }

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
      this.options = answers
    });
  }

  writing() {
    this.registerTransformStream(rename(function(path) {
        path.basename = path.basename.replace(/(_package)/g, 'package');
        path.dirname = path.dirname.replace(/(_package)/g, 'package');
    }));
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('.'),
      {
        name: this.options.projectName,
        description: this.options.projectDescription,
        title: this.options.title,
        author: this.options.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('./.*'),
      this.destinationRoot()
    );
  }
}

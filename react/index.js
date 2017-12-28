import {Generator} from 'yeoman-generator';

class ReactGenerator extends Generator {
  val userInput;

  constructor(args, opts) {
    super(args, opts);
    this.sourceRoot('./templates/base');
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
      userInput = answers
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: userInput.projectName,
        description: userInput.projectDescription,
        author: userInput.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      {
        title: userInput.title
      }
    );
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destionationPath('.')
    );
  }
}

export default ReactGenerator

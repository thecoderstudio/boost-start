const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
  }

  writing() {
    this._writeTemplateFiles();
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot(),
      {
        projectName: this.options.projectName
      }
    );

  }
}

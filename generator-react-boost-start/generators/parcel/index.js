const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot)
  }

  writing() {
    this._writePackageJSON()
    this._writeTemplateFiles()
  }

  _writePackageJSON() {
    this.yarnInstall([
      'parcel-bundler',
      'babel-preset-react',
      'babel-preset-env'
    ]);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('.'),
      {
        title: this.options.title
      }
    );
  }
}

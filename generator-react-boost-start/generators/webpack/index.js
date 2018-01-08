const Generator = require('yeoman-generator');
const rename = require("gulp-rename");

module.exports = class extends Generator {

  _writePackageJson() {
    this.yarnInstall([
      'html-webpack-plugin',
      'babel-loader',
      'webpack',
      'webpack-dev-server',
      'path'
    ]);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );

  }
}

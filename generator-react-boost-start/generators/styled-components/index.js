const Generator = require('yeoman-generator');
const cheerio = require('cheerio');
const esprima = require('esprima');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
  }

  writing() {
    this._writePackageJSON();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'styled-components'
    ]);
  }

  _writeTemplateFiles() {

  }
}

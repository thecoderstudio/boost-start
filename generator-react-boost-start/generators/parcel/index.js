const Generator = require('yeoman-generator');
const extend = require('deep-extend');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot)
  }

  writing() {
    this._writePackageJSON()
    this._writeTemplateFiles()
  }

  _writePackageJSON() {
    const basePkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    extend(basePkg, {
      dependencies: {
        'parcel-bundler': '^1.3.1'
      }
    });
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

const Generator = require('yeoman-generator');
const babylon = require("babylon");
const esformatter = require("esformatter");
const transform = require("transform-ast");

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
    esformatter.register(require('esformatter-jsx'));
  }

  writing() {
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'styled-components'
    ]);
  }

  _writeTemplateFiles() {
    var app = this.fs.read(this.destinationPath('src/App.jsx'));
    var changedApp = this._includeThemeProvider(app);
    this.fs.write(this.destinationPath('src/App.jsx'),
      esformatter.format(changedApp.toString())
    );
  }

  _includeThemeProvider(code) {
    return transform(code,
      {
        parser: babylon,
        sourceType: "module",
        plugins: ["jsx"]
      },
      function(node) {
        if (node.type === "JSXElement") {
          if (node.parent.type === "ReturnStatement"){
            node.prepend("<div>\n<ThemeProvider theme={theme}>\n");
            node.append("\n</ThemeProvider>\n</div>");
          }
        }
        if (node.type === "ClassDeclaration") {
          node.prepend("var theme = {};\n\n");
        }
        if (node.type === "Program") {
          var lastImportOccurence = 0;
          for (const i in node.body) {
            const component = node.body[i];
            if (component.type === "ImportDeclaration") {
              lastImportOccurence = component;
            }
          }

          lastImportOccurence.append("\nimport { ThemeProvider } from 'styled-components';\n");
        }
      }
    );
  }
}

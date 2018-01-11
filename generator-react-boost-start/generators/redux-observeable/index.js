const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
    esformatter.register(require('esformatter-jsx'));
  }

  prompting() {
    return this.prompt([
      {
        type: "confirm",
        name: "redux-observable",
        message: "You've selected both RxJS and Redux, would you like redux-observable to be included?"
      }
    ]).then((answers) => {
      this.options = answers;
    });
  }

  writing() {
    if (!this.options["redux-observable"]) {
      return;
    }
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'redux-observable'
    ]);
  }

  _writeTemplateFiles() {
    // Write new template files
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );

    // Mutate store to include redux-observable middleware
    var store = this.fs.read(this.destinationPath('src/store/index.jsx'));
    var changedStore = this._includeReduxObservable(store);
    this.fs.write(this.destinationPath('src/store/index.jsx'),
      esformatter.format(changedApp.toString())
    );
  }

  _includeReduxObservable() {
    return transform(unparsedCode,
      {
        parser: babylon,
        sourceType: "module",
        plugins: ["jsx"]
      },
      function(node) {
        if (node.type === "FunctionDeclaration") {
          node.prepend("const epicMiddleware = createEpicMiddleware(epic);\n\n");
          console.log(node.body.body[0].source())
        }
        if (node.type === "VariableDeclaration" && node.source().includes("createStore")) {
          node.update(
          "const store = createStore(\n\
            reducer,\n\
            applyMiddleware(epicMiddleware)\n\
           );\n"
          );
        }
        if (node.type === "Program") {
          this._injectImports(node);
        }
      }
    );
  }

  _injectImports(program) {
    const lastImportOccurence = this._getLastImportOccurence(program.body);
    var reduxImport;
    
    reduxImport.update("import { createStore, applyMiddleware } from 'redux';\n");
    reduxImport.append("import { createEpicMiddleware } from 'redux-observable';");
    lastImportOccurence.append("\nimport epic from './epics';\n");
  }

  _getLastImportOccurence(programBody) {
    var lastImportOccurence;

    for (const i in programBody) {
      const component = node.body[i];
      if (component.type === "ImportDeclaration") {
        lastImportOccurence = component;
        if (component.source.extra.rawValue) {
          reduxImport = component;
        };
      }
    }

    return lastImportOccurence;
  }
}
